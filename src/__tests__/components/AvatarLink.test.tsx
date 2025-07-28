import { getUserLink } from '@/helpers/links';

import AvatarLink from '@/components/Avatar/AvatarLink';

import { render, screen } from '../test-utils';

const userWithImage = {
  username: 'test',
  img: 'https://via.placeholder.com/150',
  isDeleted: false,
};

const userWithoutImage = {
  username: 'test',
  img: null,
  isDeleted: false,
};

const userDeleted = {
  username: 'test',
  img: 'https://via.placeholder.com/150',
  isDeleted: true,
};

describe('AvatarLink', () => {
  it('should render with username', () => {
    render(<AvatarLink user={userWithImage} />);

    const avatar = screen.getByText(userWithImage.username);
    expect(avatar).toBeInTheDocument();
  });

  it('when user has image, should render with image', () => {
    render(<AvatarLink user={userWithImage} />);

    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', userWithImage.img);
  });

  it('when user has no image, should show first letter of username in image box', () => {
    render(<AvatarLink user={userWithoutImage} />);

    const usernameImg = screen.getByText(userWithoutImage.username[0]);
    expect(usernameImg).toBeInTheDocument();

    const image = screen.queryByRole('img');
    expect(image).not.toBeInTheDocument();
  });

  it('should be link when user is not deleted', () => {
    render(<AvatarLink user={userWithImage} />);

    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
  });

  it('link should have correct href when user is not deleted', () => {
    render(<AvatarLink user={userWithImage} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', getUserLink(userWithImage.username));
  });

  it('should be div when user is deleted', () => {
    render(<AvatarLink user={userDeleted} />);

    const div = screen.getByText(userDeleted.username);
    expect(div).toBeInTheDocument();
    expect(div).not.toHaveAttribute('href');
  });
});
