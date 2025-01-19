import { HOME_LINK } from '@/helpers/link';
import style from './notFound.module.scss';

import AnchorUnderline from '@/components/Anchor/AnchorUnderline';

export default async function NotFound() {
  return (
    <div className={style['not-found']}>
      <h2>{`Recipe not found 🥹`}</h2>
      <p>{`Sorry, the recipe you're looking for doesn't exist.`}</p>
      <AnchorUnderline href={HOME_LINK}>View other posts</AnchorUnderline>
    </div>
  );
}
