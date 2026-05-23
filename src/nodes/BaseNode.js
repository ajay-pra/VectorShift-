import React from "react";
import { Handle } from "reactflow";
import { useStore } from "../store";

const BaseNode = ({ id, data, title, fields = [], handles = [], children }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  return (
    <div
      style={{
        width: 200,
        minHeight: 80,
        border: "1px solid black",
        borderRadius: "3px",
        padding: "5px",
        background: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxSizing: "border-box",
        fontFamily: "sans-serif",
        fontSize: "12px",
      }}
    >
      <div>
        <div
          style={{
            fontWeight: "bold",
            borderBottom: "1px solid #ccc",
            paddingBottom: "3px",
            marginBottom: "5px",
          }}
        >
          {title}
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
            <div
              key={field.name}
              style={{
                display: "flex",
                flexDirection: "column",
                margin: "4px 0",
              }}
            >
              <label
                style={{ display: "flex", flexDirection: "column", gap: "2px" }}
              >
                <span style={{ fontSize: "10px", color: "#666" }}>
                  {field.label}
                  {field.type === "range" && ` (${value})`}:
                </span>
                {field.type === "select" ? (
                  <select
                    value={value}
                    onChange={onChange}
                    style={{ fontSize: "11px" }}
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
                    style={{ fontSize: "11px", resize: "vertical" }}
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
                  />
                )}
              </label>
            </div>
          );
        })}

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
