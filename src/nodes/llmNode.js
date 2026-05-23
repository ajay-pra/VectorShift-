// llmNode.js

import BaseNode from './BaseNode';
import { Position } from 'reactflow';

export const LLMNode = ({ id, data }) => {
  const handles = [
    {
      type: 'target',
      position: Position.Left,
      id: `${id}-system`,
      style: { top: `${100/3}%` }
    },
    {
      type: 'target',
      position: Position.Left,
      id: `${id}-prompt`,
      style: { top: `${200/3}%` }
    },
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-response`
    }
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="LLM"
      handles={handles}
    >
      <div style={{ padding: '4px 0' }}>
        <span>This is a LLM.</span>
      </div>
    </BaseNode>
  );
};
