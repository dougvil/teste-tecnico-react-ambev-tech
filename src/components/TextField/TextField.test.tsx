import { render } from '@/test/test-utils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import TextField from './TextField';

describe('TextField Component', () => {
  it('should render text field with label', () => {
    render(<TextField label='Username' />);

    const input = screen.getByLabelText(/username/i);
    expect(input).toBeInTheDocument();
  });

  it('should update value when user types', async () => {
    const user = userEvent.setup();

    render(<TextField label='Username' />);
    const someText = 'testuser';
    const input = screen.getByLabelText(/username/i) as HTMLInputElement;
    await user.type(input, someText);

    expect(input.value).toBe(someText);
  });

  it('should trigger onChange when user types', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(
      <TextField
        label='Username'
        onChange={handleChange}
      />,
    );
    const input = screen.getByLabelText(/username/i) as HTMLInputElement;
    const someText = 'abcde';
    await user.type(input, someText);

    expect(handleChange).toHaveBeenCalledTimes(5);
    expect(input.value).toBe(someText);
  });

  it('should show error message when error prop is provided', () => {
    const errorMessage = 'This field is required';

    render(
      <TextField
        label='Username'
        error
        helperText={errorMessage}
      />,
    );

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('should be disabled when disabled prop is true', () => {
    render(
      <TextField
        label='Username'
        disabled
      />,
    );

    const input = screen.getByLabelText(/username/i);
    expect(input).toBeDisabled();
  });
});
