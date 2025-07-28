import '@testing-library/jest-dom';

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toBeDisabled(): R;
      toHaveClass(className: string): R;
      toHaveAttribute(attr: string, value?: string): R;
      toHaveTextContent(text: string): R;
      toBeVisible(): R;
      toBeChecked(): R;
      toBeInvalid(): R;
      toBeValid(): R;
      toHaveValue(value: string | number): R;
      toHaveDisplayValue(value: string | string[]): R;
      toBePartiallyChecked(): R;
      toHaveAccessibleDescription(description?: string): R;
      toHaveAccessibleName(name?: string): R;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      toHaveStyle(css: string | Record<string, any>): R;
    }
  }
}
