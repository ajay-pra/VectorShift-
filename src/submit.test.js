import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SubmitButton } from './submit';

describe('SubmitButton', () => {
    it('renders the submit button and text', () => {
        render(<SubmitButton />);
        expect(screen.getByText('Submit')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
    });
});
