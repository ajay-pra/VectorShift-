// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <div style={{ padding: '10px' }}>
            <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                <DraggableNode type='APIResponse' label='APIResponse' />
                <DraggableNode type='APIRequest' label='APIRequest' />
                <DraggableNode type='DBNode' label='DBNode' />
                <DraggableNode type='FilterNode' label='FilterNode' />
                <DraggableNode type='EmailNode' label='EmailNode' />
            </div>
        </div>
    );
};
