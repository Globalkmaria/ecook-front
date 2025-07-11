import Link from 'next/link';

import { getUserLink } from '@/helpers/links';

import { RecipeDetail } from '@/services/requests/recipe/type';

import style from './style.module.scss';
import Avatar from '../Avatar';

interface AvatarLinkProps {
  user: RecipeDetail['user'];
}

export default function AvatarLink({ user }: AvatarLinkProps) {
  const Component = user.isDeleted ? NoLink : Link;
  const userLink = getUserLink(user.username);

  return (
    <Component href={userLink} className={style['avatar']}>
      <Avatar user={user} />
    </Component>
  );
}

function NoLink({ children }: { children: React.ReactNode }) {
  return <div className={style['not-acting-link']}>{children}</div>;
}
