// helper.js

import { useStore } from '../store';
import { MarkerType } from 'reactflow';

const getSourceHandleId = (node) => {
  const idLower = node.id.toLowerCase();
  if (idLower.startsWith('custominput')) return `${node.id}-value`;
  if (idLower.startsWith('condition') || idLower.startsWith('filter')) return `${node.id}-true`;
  if (idLower.startsWith('apiresponse')) return `${node.id}-success`;
  if (idLower.startsWith('email')) return `${node.id}-sent`;
  if (idLower.startsWith('db') || idLower.startsWith('text') || idLower.startsWith('prompttemplate') || idLower.startsWith('logger')) return `${node.id}-output`;
  return `${node.id}-response`;
};

const getTargetHandleId = (node, varName) => 
  node.id.toLowerCase().startsWith('customoutput') ? `${node.id}-value` : `${node.id}-${varName}`;

const getDefaultNodeName = (node) => {
  let name = node.id;
  if (name.startsWith('customInput-')) name = name.replace('customInput-', 'input_');
  else if (name.startsWith('customOutput-')) name = name.replace('customOutput-', 'output_');
  return name.replace(/-/g, '_');
};

export const getNodeNames = () => useStore.getState().nodes.map(n => n.data?.name || getDefaultNodeName(n));

let isSyncing = false;
const alertedInvalidNodes = new Set();

useStore.subscribe(({ nodes, edges }) => {
  if (isSyncing) return;

  const nameToNode = {};
  nodes.forEach(n => nameToNode[n.data?.name || getDefaultNodeName(n)] = n);

  const activeConns = new Set();
  
  nodes.forEach(node => {
    Object.values(node.data || {}).forEach(val => {
      if (typeof val === 'string') {
        [...val.matchAll(/\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g)].forEach(match => {
          const varName = match[1];
          const srcNode = nameToNode[varName];
          
          if (srcNode && srcNode.id !== node.id) {
            if (srcNode.id.toLowerCase().startsWith('customoutput')) {
              if (!alertedInvalidNodes.has(varName)) {
                alert(`Cannot use Output node "${varName}" as a variable. Output nodes do not have an output handle.`);
                alertedInvalidNodes.add(varName);
              }
              return;
            }
            activeConns.add(`${srcNode.id}|${getSourceHandleId(srcNode)}|${node.id}|${getTargetHandleId(node, varName)}`);
          }
        });
      }
    });
  });

  const manualEdges = edges.filter(e => !e.id?.startsWith('auto-'));
  const autoEdges = [...activeConns].map(connStr => {
    const [srcId, srcHandle, tgtId, tgtHandle] = connStr.split('|');
    return {
      id: `auto-${srcId}-${srcHandle}-${tgtId}-${tgtHandle}`,
      source: srcId,
      sourceHandle: srcHandle,
      target: tgtId,
      targetHandle: tgtHandle,
      type: 'smoothstep',
      animated: true,
      markerEnd: { type: MarkerType.Arrow, height: '20px', width: '20px' }
    };
  });

  const currentAutoKeys = edges.filter(e => e.id?.startsWith('auto-')).map(e => e.id).sort().join(',');
  const newAutoKeys = autoEdges.map(e => e.id).sort().join(',');

  if (currentAutoKeys !== newAutoKeys) {
    isSyncing = true;
    useStore.setState({ edges: [...manualEdges, ...autoEdges] });
    isSyncing = false;
  }
});
