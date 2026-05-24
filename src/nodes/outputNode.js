// outputNode.js

import  BaseNode  from './BaseNode';
import { Position } from 'reactflow';

export const OutputNode = ({ id, data }) => {
  const fields = [
    {
      type: 'select',
      name: 'outputType',
      label: 'Type',
      defaultValue: data?.outputType || 'Text',
      options: [
        { value: 'Text', label: 'Text' },
        { value: 'File', label: 'Image' }
      ]
    }
  ];

  const handles = [
    {
      type: 'target',
      position: Position.Left,
      id: `${id}-value`
    }
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Output"
      fields={fields}
      handles={handles}
    />
  );
};
