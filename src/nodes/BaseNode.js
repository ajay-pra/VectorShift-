import React from "react";
import { Handle } from "reactflow";
import { useStore } from "../store";
import "../style/BaseNode.css";
const BaseNode = ({ id, data, title, fields = [], handles = [], children,style }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const deleteNode = useStore((state) => state.deleteNode);

  return (
    <div className="custom-node" style={{ display: style?.height ? 'flex' : 'block', flexDirection: 'column', ...style }}>
      <div style={{ height: style?.height ? '100%' : 'auto', display: style?.height ? 'flex' : 'block', flexDirection: 'column', flexGrow: 1 }}>
       <div className="node-header">
          <span className="node-title">{title}</span>
          <button
            onClick={() => deleteNode(id)}
            className="node-delete-btn"
            title="Delete Node"
          >
            &times;
          </button>
        </div>

        <div className="node-body">
          {" "}
          <div className="node-field">
            <label className="node-label">Name</label>
            <input
              type="text"
              value={data?.name !== undefined ? data.name : (id.startsWith('customInput-') ? id.replace('customInput-', 'input_') : (id.startsWith('customOutput-') ? id.replace('customOutput-', 'output_') : id)).replace(/-/g, '_')}
              onChange={(e) => updateNodeField(id, 'name', e.target.value)}
              className="node-input"
            />
          </div>

          {fields.map((field) => {
            const value =
              data?.[field.name] !== undefined
                ? data[field.name]
                : (field.defaultValue ?? "");

            const onChange = (e) => {
              const val =
                field.type === "checkbox" ? e.target.checked : e.target.value;
              updateNodeField(id, field.name, val);
              if (field.onChange) {
                field.onChange(e);
              }
            };

            return (
              <div key={field.name} className="node-field">
                <label className="node-label">
                  <span style={{ fontSize: "10px", color: "#666" }}>
                    {field.label}
                  </span>
                  {field.type === "select" ? (
                    <select
                      value={value}
                      onChange={onChange}
                      className="node-select"
                    >
                      {field.options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  ) : field.type === "textarea" ? (
                    <textarea
                      value={value}
                      onChange={onChange}
                      rows={field.rows || 2}
                      className="node-textarea"
                    />
                  ) : field.type === "checkbox" ? (
                    <input
                      type="checkbox"
                      checked={!!value}
                      onChange={onChange}
                    />
                  ) : (
                    <input
                      type={field.type || "text"}
                      value={value}
                      onChange={onChange}
                      min={field.min}
                      max={field.max}
                      step={field.step}
                      style={{ fontSize: "11px" }}
                      className="node-input"
                    />
                  )}
                </label>
              </div>
            );
          })}
        </div>

        {children}
      </div>

      {handles.map((handle) => {
        return (
          <Handle
            key={handle.id}
            type={handle.type}
            position={handle.position}
            id={handle.id}
            style={handle.style}
          />
        );
      })}
    </div>
  );
};

export default BaseNode;
