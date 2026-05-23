import React from 'react';
import BaseNode from './BaseNode';
import { Position } from 'reactflow';

const FilterNode = ({ id, data }) => {

  const fields = [
    {
      type: 'select',
      name: 'operator',
      label: 'Operator',
      defaultValue: 'equals',
      options: [
        { value: 'equals', label: 'Equals' },
        { value: 'not_equals', label: 'Not Equals' },
        { value: 'greater_than', label: 'Greater Than' },
        { value: 'less_than', label: 'Less Than' }
      ]
    },
   
  ];

  const handles = [
    {
      type: 'target',
      position: Position.Left,
      id: `${id}-input`
    },
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-true`,
      style: { top: '35%' }
    },
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-false`,
      style: { top: '70%' }
    }
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Filter"
      fields={fields}
      handles={handles}
    />
  );
};

export default FilterNode;