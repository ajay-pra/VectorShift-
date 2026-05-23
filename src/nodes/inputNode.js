// inputNode.js

import BaseNode from './BaseNode';
import { Position } from 'reactflow';

export const InputNode = ({ id, data }) => {
  const fields = [
    {
      type: 'text',
      name: 'inputName',
      label: 'Name',
      defaultValue: data?.inputName || id.replace('customInput-', 'input_')
    },
    {
      type: 'select',
      name: 'inputType',
      label: 'Type',
      defaultValue: data?.inputType || 'Text',
      options: [
        { value: 'Text', label: 'Text' },
        { value: 'File', label: 'File' }
      ]
    }
  ];

  const handles = [
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-value`
    }
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Input"
      fields={fields}
      handles={handles}
    />
  );
};
