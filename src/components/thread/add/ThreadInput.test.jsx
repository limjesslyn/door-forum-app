/**
 * test scenario
 *
 * - ThreadInput component
 *   - should handle title typing correctly
 *   - should handle category typing correctly
 *   - should handle content typing correctly
 *   - should call createThread function  when add button is clicked
 */

import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import {
  describe, it, expect, afterEach, vi,
} from 'vitest';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import ThreadInput from './ThreadInput';

expect.extend(matchers);

describe('Thread input component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle title typing correctly', async () => {
    // arrange
    render(<ThreadInput login={() => {}} />);
    const titleInput = await screen.getByPlaceholderText('title');

    // action
    await userEvent.type(titleInput, 'titleTester');

    // assert
    expect(titleInput).toHaveValue('titleTester');
  });

  it('should handle category typing correctly', async () => {
    // arrange
    render(<ThreadInput login={() => {}} />);
    const categoryInput = await screen.getByPlaceholderText('category');

    // action
    await userEvent.type(categoryInput, 'categoryTester');

    // assert
    expect(categoryInput).toHaveValue('categoryTester');
  });

  it('should handle content typing correctly', async () => {
    // arrange
    render(<ThreadInput login={() => {}} />);
    const contentInput = await screen.getByTestId('contentEditTest');

    // action
    await userEvent.click(contentInput);
    await userEvent.keyboard('contentTester');

    // assert
    expect(contentInput.textContent).toBe('contentTester');
  });

  it('should call login function when add button is clicked', async () => {
    // arrange
    const mockAdd = vi.fn();
    render(<ThreadInput addThread={mockAdd} />);

    const titleInput = await screen.getByPlaceholderText('title');
    await userEvent.type(titleInput, 'titleTester');

    const categoryInput = await screen.getByPlaceholderText('category');
    await userEvent.type(categoryInput, 'categoryTester');

    const contentInput = await screen.getByTestId('contentEditTest');
    await userEvent.click(contentInput);
    await userEvent.keyboard('contentTester');

    const addButton = await screen.getByRole('button', { name: 'Create' });

    // action
    await userEvent.click(addButton);

    // assert
    expect(mockAdd).toBeCalledWith({
      title: 'titleTester',
      category: 'categoryTester',
      body: 'contentTester',
    });
  });
});
