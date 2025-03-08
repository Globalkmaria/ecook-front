import { HOME_LINK } from '@/helpers/links';

import AnchorUnderline from '@/components/Anchor/AnchorUnderline';

import style from './notFound.module.scss';

export default async function NotFound() {
  return (
    <div className={style['not-found']}>
      <h2>{`Product not found 🥹`}</h2>
      <p>{`Sorry, the product you're looking for doesn't exist.`}</p>
      <AnchorUnderline href={HOME_LINK}>Return to home</AnchorUnderline>
    </div>
  );
}
