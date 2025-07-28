import userEvent from '@testing-library/user-event';

import Icon from '@/components/Icon';
import { ICON_TITLES } from '@/components/Icon/const';

import { render, screen } from '../test-utils';

describe('Icon', () => {
  it('should render', () => {
    const iconName = 'info';
    render(<Icon icon={iconName} />);

    const icon = screen.getByLabelText(ICON_TITLES[iconName]);
    expect(icon).toBeInTheDocument();
  });

  it('should render with custom class', () => {
    render(<Icon icon='info' className='custom-class' />);
    const icon = screen.getByLabelText(ICON_TITLES['info']);

    expect(icon).toHaveClass('custom-class');
  });

  it('should not render with invalid icon name', () => {
    const iconName = 'invalid';
    // @ts-expect-error - invalid icon name
    render(<Icon icon={iconName} />);

    // @ts-expect-error - invalid icon name
    const icon = screen.queryByLabelText(ICON_TITLES[iconName]);
    expect(icon).not.toBeInTheDocument();
  });
});
