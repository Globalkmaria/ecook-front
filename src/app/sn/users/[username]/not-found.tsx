import { HOME_LINK } from '@/helpers/links';
import style from './notFound.module.scss';

import AnchorUnderline from '@/components/Anchor/AnchorUnderline';

export default async function NotFound() {
  return (
    <div className={style['not-found']}>
      <h2>{`User not found 🥹`}</h2>
      <p>{`Sorry, the user you're looking for doesn't exist.`}</p>
      <AnchorUnderline href={HOME_LINK}>Return to home</AnchorUnderline>
    </div>
  );
}
