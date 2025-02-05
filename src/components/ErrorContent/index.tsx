import style from './style.module.scss';

import { HOME_LINK } from '@/helpers/links';

import AnchorUnderline from '../Anchor/AnchorUnderline';
import Button from '../Button';

function ErrorContent({ reset }: { reset: () => void }) {
  return (
    <div className={style['container']}>
      <h2 className={style['title']}>Something went wrong!</h2>
      <Button onClick={() => reset()}>Try again</Button>
      <AnchorUnderline href={HOME_LINK}>Return home</AnchorUnderline>
    </div>
  );
}

export default ErrorContent;
