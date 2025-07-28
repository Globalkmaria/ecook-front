import userEvent from '@testing-library/user-event';

import Button from '@/components/Button';

import { render, screen } from '../test-utils';

describe('Button Component', () => {
  it('should render button with text', () => {
    render(<Button>Click me</Button>);

    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
  });

  it('should have correct default props', () => {
    render(<Button>Default Button</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'button');
    expect(button).not.toBeDisabled();
  });

  describe('variants', () => {
    it('should apply primary variant by default', () => {
      render(<Button>Primary</Button>);

      const button = screen.getByRole('button');

      expect(button).toHaveClass('button-contained--primary');
    });

    it('should apply different variants', () => {
      const { rerender } = render(
        <Button variant='secondary'>Secondary</Button>,
      );
      expect(screen.getByRole('button')).toHaveClass(
        'button-contained--secondary',
      );

      rerender(<Button variant='success'>Success</Button>);
      expect(screen.getByRole('button')).toHaveClass(
        'button-contained--success',
      );

      rerender(<Button variant='danger'>Danger</Button>);
      expect(screen.getByRole('button')).toHaveClass(
        'button-contained--danger',
      );
    });
  });

  describe('user interactions', () => {
    it('should call onClick when clicked', async () => {
      const handleClick = jest.fn();
      const user = userEvent.setup();

      render(<Button onClick={handleClick}>Clickable</Button>);

      await user.click(screen.getByRole('button'));

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should not call onClick when disabled', async () => {
      const handleClick = jest.fn();
      const user = userEvent.setup();

      render(
        <Button onClick={handleClick} disabled>
          Disabled
        </Button>,
      );

      await user.click(screen.getByRole('button'));

      expect(handleClick).not.toHaveBeenCalled();
    });

    it('should be keyboard accessible', async () => {
      const handleClick = jest.fn();
      const user = userEvent.setup();

      render(<Button onClick={handleClick}>Keyboard</Button>);

      const button = screen.getByRole('button');
      button.focus();

      await user.keyboard('{Enter}');

      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('disabled state', () => {
    it('should be disabled when disabled prop is true', () => {
      render(<Button disabled>Disabled Button</Button>);

      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });

    it('should not be disabled by default', () => {
      render(<Button>Enabled Button</Button>);

      const button = screen.getByRole('button');
      expect(button).toBeEnabled();
    });
  });

  describe('custom props', () => {
    it('should accept custom className', () => {
      render(<Button className='custom-class'>Custom</Button>);

      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-class');
      expect(button).toHaveClass('button');
    });

    it('should pass through HTML attributes', () => {
      render(
        <Button id='test-button' data-testid='custom-button'>
          Test
        </Button>,
      );

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('id', 'test-button');
      expect(button).toHaveAttribute('data-testid', 'custom-button');
    });
  });
});
