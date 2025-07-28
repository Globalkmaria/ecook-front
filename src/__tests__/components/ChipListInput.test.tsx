import { useState } from 'react';

import userEvent from '@testing-library/user-event';

import ChipListInput from '@/components/Input/ChipListInput';

import { render, screen } from '../test-utils';

const ChipListInputWrapper = ({
  initialItems = [],
  ...props
}: {
  initialItems?: string[];
} & Partial<React.ComponentProps<typeof ChipListInput>>) => {
  const [items, setItems] = useState(initialItems);

  return (
    <ChipListInput
      items={items}
      setItems={setItems}
      placeholder='Add item...'
      {...props}
    />
  );
};

describe('ChipListInput', () => {
  describe('Rendering', () => {
    it('should render with empty items list', () => {
      render(<ChipListInput items={[]} setItems={() => {}} />);

      const chipList = screen.getByRole('button');
      expect(chipList).toBeInTheDocument();

      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();

      // Should have no chips initially
      const chips = chipList.querySelectorAll('.chip');
      expect(chips).toHaveLength(0);
    });

    it('should render with initial items', () => {
      render(
        <ChipListInput
          items={['apple', 'banana', 'cherry']}
          setItems={() => {}}
        />,
      );

      expect(screen.getByText('apple')).toBeInTheDocument();
      expect(screen.getByText('banana')).toBeInTheDocument();
      expect(screen.getByText('cherry')).toBeInTheDocument();
    });

    it('should render with custom placeholder', () => {
      render(
        <ChipListInput
          items={[]}
          setItems={() => {}}
          placeholder='Enter tags...'
        />,
      );

      const input = screen.getByPlaceholderText('Enter tags...');
      expect(input).toBeInTheDocument();
    });

    it('should apply custom className', () => {
      render(
        <ChipListInput
          items={[]}
          setItems={() => {}}
          className='custom-class'
        />,
      );

      const chipList = screen.getByRole('button');
      expect(chipList).toHaveClass('custom-class');
    });
  });

  describe('User Interactions', () => {
    it('should focus input when container is clicked', async () => {
      const user = userEvent.setup();
      render(<ChipListInputWrapper />);

      const chipList = screen.getByRole('button');
      const input = screen.getByRole('textbox');

      expect(input).not.toHaveFocus();

      await user.click(chipList);
      expect(input).toHaveFocus();
    });

    it('should add item when Enter is pressed', async () => {
      const user = userEvent.setup();
      render(<ChipListInputWrapper />);

      const input = screen.getByRole('textbox');

      await user.type(input, 'newitem');
      await user.keyboard('{Enter}');

      expect(screen.getByText('newitem')).toBeInTheDocument();
      expect(input).toHaveValue('');
    });

    it('should add item when space is pressed', async () => {
      const user = userEvent.setup();
      render(<ChipListInputWrapper />);

      const input = screen.getByRole('textbox');

      await user.type(input, 'spaceitem');
      await user.keyboard(' ');

      expect(screen.getByText('spaceitem')).toBeInTheDocument();
      expect(input).toHaveValue('');
    });

    it('should add multiple items when typing with spaces', async () => {
      const user = userEvent.setup();
      render(<ChipListInputWrapper />);

      const input = screen.getByRole('textbox');

      await user.type(input, 'first ');

      await user.type(input, 'second');
      await user.keyboard('{Enter}');

      expect(screen.getByText('first')).toBeInTheDocument();
      expect(screen.getByText('second')).toBeInTheDocument();
      expect(input).toHaveValue('');
    });

    it('should not add empty items', async () => {
      const user = userEvent.setup();
      render(<ChipListInputWrapper />);

      const input = screen.getByRole('textbox');

      await user.type(input, '   ');
      await user.keyboard('{Enter}');

      const chipList = screen.getByRole('button');
      const chips = chipList.querySelectorAll('.chip');
      expect(chips).toHaveLength(0);
    });

    it('should trim whitespace from items', async () => {
      const user = userEvent.setup();
      render(<ChipListInputWrapper />);

      const input = screen.getByRole('textbox');

      await user.type(input, '  spaceditem  ');
      await user.keyboard('{Enter}');

      expect(screen.getByText('spaceditem')).toBeInTheDocument();
    });

    it('should not add duplicate items', async () => {
      const user = userEvent.setup();
      render(<ChipListInputWrapper initialItems={['existing']} />);

      const input = screen.getByRole('textbox');

      await user.type(input, 'existing');
      await user.keyboard('{Enter}');

      const existingElements = screen.getAllByText('existing');
      expect(existingElements).toHaveLength(1);
      expect(input).toHaveValue('');
    });

    it('should remove item when close button is clicked', async () => {
      const user = userEvent.setup();
      render(<ChipListInputWrapper initialItems={['apple', 'banana']} />);

      expect(screen.getByText('apple')).toBeInTheDocument();
      expect(screen.getByText('banana')).toBeInTheDocument();

      const appleElement = screen.getByText('apple');
      const closeButton = appleElement.parentElement?.querySelector('button');
      expect(closeButton).toBeInTheDocument();

      await user.click(closeButton!);

      expect(screen.queryByText('apple')).not.toBeInTheDocument();
      expect(screen.getByText('banana')).toBeInTheDocument();
    });

    it('should remove last item when Backspace is pressed on empty input', async () => {
      const user = userEvent.setup();
      render(
        <ChipListInputWrapper initialItems={['apple', 'banana', 'cherry']} />,
      );

      const input = screen.getByRole('textbox');

      await user.click(input);
      await user.keyboard('{Backspace}');

      expect(screen.getByText('apple')).toBeInTheDocument();
      expect(screen.getByText('banana')).toBeInTheDocument();
      expect(screen.queryByText('cherry')).not.toBeInTheDocument();
    });

    it('should not remove items when Backspace is pressed on non-empty input', async () => {
      const user = userEvent.setup();
      render(<ChipListInputWrapper initialItems={['apple', 'banana']} />);

      const input = screen.getByRole('textbox');

      await user.type(input, 'text');
      await user.keyboard('{Backspace}');

      expect(screen.getByText('apple')).toBeInTheDocument();
      expect(screen.getByText('banana')).toBeInTheDocument();
      expect(input).toHaveValue('tex');
    });
  });

  describe('Limits and Validation', () => {
    it('should enforce item limit', async () => {
      const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});

      const user = userEvent.setup();
      render(
        <ChipListInputWrapper
          initialItems={['item1', 'item2']}
          limit={2}
          limitReachedMessage='Cannot add more than 2 items'
        />,
      );

      const input = screen.getByRole('textbox');

      await user.type(input, 'item3');
      await user.keyboard('{Enter}');

      expect(alertSpy).toHaveBeenCalledWith('Cannot add more than 2 items');

      expect(screen.getByText('item1')).toBeInTheDocument();
      expect(screen.getByText('item2')).toBeInTheDocument();
      expect(screen.queryByText('item3')).not.toBeInTheDocument();

      alertSpy.mockRestore();
    });

    it('should use default limit message when custom message not provided', async () => {
      const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});

      const user = userEvent.setup();
      render(
        <ChipListInputWrapper initialItems={['item1', 'item2']} limit={2} />,
      );

      const input = screen.getByRole('textbox');

      await user.type(input, 'item3');
      await user.keyboard('{Enter}');

      expect(alertSpy).toHaveBeenCalledWith('Tag limit reached');

      alertSpy.mockRestore();
    });

    it('should enforce text length limit', async () => {
      const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});

      const user = userEvent.setup();
      render(<ChipListInputWrapper limitTextLength={5} />);

      const input = screen.getByRole('textbox');

      await user.type(input, 'short');
      expect(input).toHaveValue('short');

      await user.type(input, 'x');
      expect(alertSpy).toHaveBeenCalledWith('Text limit reached: 5');

      expect(input).toHaveValue('short');

      alertSpy.mockRestore();
    });

    it('should allow text within length limit', async () => {
      const user = userEvent.setup();
      render(<ChipListInputWrapper limitTextLength={10} />);

      const input = screen.getByRole('textbox');

      await user.type(input, 'short');

      expect(input).toHaveValue('short');
    });
  });

  describe('Keyboard Navigation', () => {
    it('should handle multiple keyboard interactions correctly', async () => {
      const user = userEvent.setup();
      render(<ChipListInputWrapper />);

      const input = screen.getByRole('textbox');

      await user.type(input, 'first');
      await user.keyboard('{Enter}');

      await user.type(input, 'second');
      await user.keyboard(' ');

      await user.keyboard('{Backspace}');

      expect(screen.getByText('first')).toBeInTheDocument();
      expect(screen.queryByText('second')).not.toBeInTheDocument();
    });

    it('should not trigger actions on other keys', async () => {
      const user = userEvent.setup();
      render(<ChipListInputWrapper />);

      const input = screen.getByRole('textbox');

      await user.type(input, 'test');
      await user.keyboard('{Tab}');
      await user.keyboard('{Escape}');
      await user.keyboard('{ArrowUp}');

      expect(input).toHaveValue('test');
      const chipList = screen.getByRole('button');
      const chips = chipList.querySelectorAll('.chip');
      expect(chips).toHaveLength(0);
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA labels', () => {
      render(<ChipListInput items={['test']} setItems={() => {}} />);

      const chipList = screen.getByLabelText('chip list input');
      expect(chipList).toHaveAttribute('aria-label', 'chip list input');
    });

    it('should maintain focus management', async () => {
      const user = userEvent.setup();
      render(<ChipListInputWrapper initialItems={['test']} />);

      const input = screen.getByRole('textbox');
      const chipList = screen.getByLabelText('chip list input');

      await user.click(chipList);
      expect(input).toHaveFocus();

      await user.type(input, 'new');
      expect(input).toHaveFocus();

      await user.keyboard('{Enter}');
      expect(input).toHaveFocus();
    });
  });

  describe('Edge Cases', () => {
    it('should handle rapid input changes', async () => {
      const user = userEvent.setup();
      render(<ChipListInputWrapper />);

      const input = screen.getByRole('textbox');

      await user.type(input, 'rapid');
      await user.clear(input);
      await user.type(input, 'change');
      await user.keyboard('{Enter}');

      expect(screen.getByText('change')).toBeInTheDocument();
    });

    it('should handle empty string input gracefully', async () => {
      const user = userEvent.setup();
      render(<ChipListInputWrapper />);

      await user.keyboard('{Enter}');
      await user.keyboard(' ');

      const chipList = screen.getByRole('button');
      const chips = chipList.querySelectorAll('.chip');
      expect(chips).toHaveLength(0);
    });

    it('should handle removing items from empty list', async () => {
      const user = userEvent.setup();
      render(<ChipListInputWrapper />);

      const input = screen.getByRole('textbox');

      await user.click(input);
      await user.keyboard('{Backspace}');

      const chipList = screen.getByRole('button');
      const chips = chipList.querySelectorAll('.chip');
      expect(chips).toHaveLength(0);
    });
  });
});
