import React from 'react';
import BaseNode from './BaseNode';
import { Position } from 'reactflow';

const DBNode = ({ id, data }) => {

  const fields = [
    {
      type: 'select',
      name: 'dbType',
      label: 'Database Type',
      defaultValue: 'mongodb',
      options: [
        { value: 'mongodb', label: 'MongoDB' },
        { value: 'mysql', label: 'MySQL' },
        { value: 'postgresql', label: 'PostgreSQL' }
      ]
    },
    {
      type: 'text',
      name: 'host',
      label: 'Host',
      defaultValue: 'localhost'
    },
    {
      type: 'number',
      name: 'port',
      label: 'Port',
      defaultValue: 27017
    },
    {
      type: 'text',
      name: 'database',
      label: 'Database Name',
      defaultValue: 'my_database'
    }
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
      id: `${id}-output`
    }
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Database"
      fields={fields}
      handles={handles}
    />
  );
};

export default DBNode;