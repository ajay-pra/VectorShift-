import React from "react";
import BaseNode from "./BaseNode";
import { Position } from "reactflow";

const APIResponseNode = ({ id, data }) => {
  const fields = [
    {
  type: "select",
  name: "statusCode",
  label: "Status Code",
  defaultValue: 200,
  options: [
    { label: "200 OK", value: 200 },
    { label: "403 Forbidden", value: 403 },
    { label: "404 Not Found", value: 404 },
    { label: "500 Internal Server Error", value: 500 },
  ],
},
    {
      type: "text",
      name: "contentType",
      label: "Content Type",
      defaultValue: "application/json",
    },
    {
      type: "textarea",
      name: "headers",
      label: "Headers",
      defaultValue: `{
  "Content-Type": "application/json",
  "Authorization": "..."
}`,
    },
    {
      type: "textarea",
      name: "body",
      label: "Response Body",
      defaultValue: `{
  "success": true,
  "data": []
}`,
    },
    {
      type: "text",
      name: "responseTime",
      label: "Response Time",
      defaultValue: "120ms",
    },
  ];

  const handles = [
    {
      type: "target",
      position: Position.Left,
      id: `${id}-input`,
    },
    {
      type: "source",
      position: Position.Right,
      id: `${id}-success`,
      style: { top: "35%" },
    },
    {
      type: "source",
      position: Position.Right,
      id: `${id}-error`,
      style: { top: "70%" },
    },
  ];
  return (
    <BaseNode
      id={id}
      data={data}
      title="API Response"
      fields={fields}
      handles={handles}
    />
  );
};

export default APIResponseNode;
