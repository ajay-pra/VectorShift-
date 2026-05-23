// textNode.js

import BaseNode from './BaseNode';
import { Position } from 'reactflow';
import { useStore } from '../store';


export const TextNode = ({ id, data }) => {
  const fields = [
    {
      type: 'text',
      name: 'text',
      label: 'Text',
      defaultValue: data?.text || '{{input}}'
    }
  ];

  const textValue = useStore((state) => {
    const node = state.nodes.find((n) => n.id === id);
    return node?.data?.text ?? '{{input}}';
  });

  const updateNodeField = useStore((state) => state.updateNodeField);

  // Dynamic calculations for height and width
  const lines = textValue.split('\n');
  const maxLineLength = Math.max(...lines.map(line => line.length), 1);
  const dynamicWidth = Math.min(400, Math.max(240, 100 + maxLineLength * 7));
  const charsPerLine = Math.floor((dynamicWidth - 40) / 7);
  const visualLines = lines.reduce((acc, line) => acc + Math.max(1, Math.ceil(line.length / charsPerLine)), 0);
  const dynamicHeight = Math.min(400, Math.max(100, 50 + visualLines * 18));

  const handles = [
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-output`
    }
  ];

  return (
     <BaseNode
      id={id}
      data={data}
      title="Text"
      fields={[]}
      handles={handles}
      style={{
        width: `${dynamicWidth}px`,
        height: `${dynamicHeight}px`
      }}
    >
      <div className="node-field" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <label className="node-label">Text</label>
        <textarea
          value={textValue}
          onChange={(e) => updateNodeField(id, 'text', e.target.value)}
          className="node-textarea"
          style={{
            flexGrow: 1,
            resize: 'none',
            minHeight: '40px',
            boxSizing: 'border-box'
          }}
        />
      </div>
    </BaseNode>
  );
};
