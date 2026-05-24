import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PipelineToolbar } from './toolbar';

describe('PipelineToolbar', () => {
    it('renders all pipeline nodes correctly', () => {
        render(<PipelineToolbar />);
        
        expect(screen.getByText('Input')).toBeInTheDocument();
        expect(screen.getByText('LLM')).toBeInTheDocument();
        expect(screen.getByText('Output')).toBeInTheDocument();
        expect(screen.getByText('Text')).toBeInTheDocument();
        expect(screen.getByText('APIResponse')).toBeInTheDocument();
        expect(screen.getByText('APIRequest')).toBeInTheDocument();
        expect(screen.getByText('DBNode')).toBeInTheDocument();
        expect(screen.getByText('FilterNode')).toBeInTheDocument();
        expect(screen.getByText('EmailNode')).toBeInTheDocument();
    });
});
