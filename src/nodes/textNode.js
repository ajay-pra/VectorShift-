// textNode.js

import React, { useState, useRef, useEffect } from 'react';
import BaseNode from './BaseNode';
import { Position } from 'reactflow';
import { useStore } from '../store';
import { getNodeNames } from './helper';

export const TextNode = ({ id, data }) => {
  const textValue = useStore((state) => state.nodes.find((n) => n.id === id)?.data?.text ?? '{{input}}');
  const linkValue = useStore((state) => state.nodes.find((n) => n.id === id)?.data?.link ?? '');
  const updateNodeField = useStore((state) => state.updateNodeField);

  // Parse template variables matching {{variable}}
  const scanText = `${textValue} ${linkValue}`;
  const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
  const vars = [];
  let match;
  while ((match = regex.exec(scanText)) !== null) {
    if (!vars.includes(match[1])) vars.push(match[1]);
  }

  // Create handles
  const dynamicHandles = vars.map((varName, idx) => ({
    type: 'target',
    position: Position.Left,
    id: `${id}-${varName}`,
    style: { top: `${(idx + 1) * (100 / (vars.length + 1))}%` }
  }));

  const handles = [...dynamicHandles, { type: 'source', position: Position.Right, id: `${id}-output` }];

  // Dynamic layout measurements
  const lines = textValue.split('\n');
  const maxLineLength = Math.max(...lines.map(line => line.length), linkValue.length, 1);
  const dynamicWidth = Math.min(600, Math.max(240, 200 + maxLineLength * 7));
  const charsPerLine = Math.floor((dynamicWidth - 40) / 7);
  const visualLines = lines.reduce((acc, line) => acc + Math.max(1, Math.ceil(line.length / charsPerLine)), 0);
  const dynamicHeight = Math.min(500, Math.max(170, 150 + visualLines * 18));

  // Dropdown Autocomplete & click-outside handling
  const dropdownRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleOutsideClick, true);
    return () => document.removeEventListener('mousedown', handleOutsideClick, true);
  }, []);

  const otherNames = getNodeNames().filter(name => name !== (data?.name || id.replace(/-/g, '_')));
  const searchQuery = linkValue.replace(/[{}]/g, '').trim().toLowerCase();
  const suggestions = otherNames.filter(name => name.toLowerCase().includes(searchQuery));

  return (
    <BaseNode
      id={id}
      data={data}
      title="Text"
      fields={[]}
      handles={handles}
      style={{
         width: `${dynamicWidth}px`,
         height: `${dynamicHeight}px`
        }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: 1, height: 'calc(100% - 70px)' }}>
        <div className="node-field">
          <label className="node-label">Link / Variable</label>
          <div className="custom-dropdown-container" ref={dropdownRef}>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <input
                type="text"
                value={linkValue}
                onChange={(e) => { updateNodeField(id, 'link', e.target.value); setIsOpen(true); }}
                onFocus={() => setIsOpen(true)}
                placeholder="e.g. {{input_1}}"
                className="node-input"
                style={{ paddingRight: '24px', width: '100%', boxSizing: 'border-box' }}
              />
              <span
                style={{ position: 'absolute', right: '8px', cursor: 'pointer', fontSize: '8px', color: '#6b7280', userSelect: 'none' }}
                onClick={() => setIsOpen(!isOpen)}
              >
                ▼
              </span>
            </div>
            {isOpen && suggestions.length > 0 && (
              <div className="custom-dropdown-list">
                {suggestions.map((name) => (
                  <div
                    key={name}
                    className="custom-dropdown-item"
                    onClick={() => { updateNodeField(id, 'link', `{{${name}}}`); setIsOpen(false); }}
                  >
                    {`{{${name}}}`}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="node-field" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label className="node-label">Text</label>
          <textarea
            value={textValue}
            onChange={(e) => updateNodeField(id, 'text', e.target.value)}
            className="node-textarea"
            style={{
              flexGrow: 1,
              resize: 'none',
              minHeight: '40px',
              boxSizing: 'border-box' 
            }}
          />
        </div>
      </div>
    </BaseNode>
  );
};
