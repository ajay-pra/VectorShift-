import React from 'react'
import BaseNode from './BaseNode';
import { Position } from 'reactflow';

const APIRequestNode = ({ id, data }) => {
    const fields = [
    {
      type: 'select',
      name: 'method',
      label: 'Method',
      defaultValue: 'GET',
      options: [
        { value: 'GET', label: 'GET' },
        { value: 'POST', label: 'POST' },
        { value: 'PUT', label: 'PUT' },
        { value: 'DELETE', label: 'DELETE' }
      ]
    },
    {
      type: 'text',
      name: 'url',
      label: 'URL',
      defaultValue: 'https://api.ajayprajapati.com/data'
    },
    {
      type: 'textarea',
      name: 'headers',
      label: 'Headers (JSON)',
      defaultValue: '{\n  "Content-Type": "application/json"\n}'
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
      id: `${id}-response`,
      style: { top: '33%' }
    },
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-error`,
      style: { top: '67%' }
    }
  ];
  return (
    <BaseNode
      id={id}
      data={data}
      title="API Request"
      fields={fields}
      handles={handles}
    />
  )
}

export default APIRequestNode