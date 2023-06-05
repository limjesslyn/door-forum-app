/**
 * test scenario
 *
 * - ThreadCommentInput component
 *   - should handle comment typing correctly
 *   - should call addComment function  when add button is clicked
 */

import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import {
  describe, it, expect, afterEach, vi,
} from 'vitest';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import ThreadCommentInput from './ThreadCommentInput';

expect.extend(matchers);

describe('Comment input component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle comment typing correctly', async () => {
    // arrange
    render(<ThreadCommentInput addComment={() => {}} />);
    const commentInput = await screen.getByTestId('commentEditTest');

    // action
    await userEvent.click(commentInput);
    await userEvent.keyboard('commentTester');

    // assert
    expect(commentInput.textContent).toBe('commentTester');
  });

  it('should call addComment function  when add button is clicked', async () => {
    // arrange
    const mockAdd = vi.fn();
    render(<ThreadCommentInput addComment={mockAdd} />);

    const commentInput = await screen.getByTestId('commentEditTest');
    await userEvent.click(commentInput);
    await userEvent.keyboard('commentTester');

    const addButton = await screen.getByRole('button', { name: 'Send' });

    // action
    await userEvent.click(addButton);

    // assert
    expect(mockAdd).toBeCalledWith({
      content: 'commentTester',
    });
  });
});
