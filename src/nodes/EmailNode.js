import React from 'react';
import BaseNode from './BaseNode';
import { Position } from 'reactflow';

const EmailNode = ({ id, data }) => {

  const fields = [
    {
      type: 'text',
      name: 'to',
      label: 'To',
      defaultValue: 'example@email.com'
    },
    {
      type: 'text',
      name: 'subject',
      label: 'Subject',
      defaultValue: 'Welcome Email'
    },
    {
      type: 'textarea',
      name: 'body',
      label: 'Email Body',
      defaultValue: 'Hello,\nWelcome to our platform!'
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
      id: `${id}-sent`,
      style: { top: '35%' }
    },
    {
      type: 'source',
      position: Position.Right,
      id: `${id}-failed`,
      style: { top: '70%' }
    }
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Email"
      fields={fields}
      handles={handles}
    />
  );
};

export default EmailNode;