import React from "react";
import { Handle } from "reactflow";
import { useStore } from "../store";
import "../style/BaseNode.css";
const BaseNode = ({ id, data, title, fields = [], handles = [], children }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const deleteNode = useStore((state) => state.deleteNode);

  return (
    <div className="custom-node">
      <div>
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
