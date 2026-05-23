// textNode.js

import BaseNode from './BaseNode';
import { Position } from 'reactflow';

export const TextNode = ({ id, data }) => {
  const fields = [
    {
      type: 'text',
      name: 'text',
      label: 'Text',
      defaultValue: data?.text || '{{input}}'
    }
  ];

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
      fields={fields}
      handles={handles}
    />
  );
};
