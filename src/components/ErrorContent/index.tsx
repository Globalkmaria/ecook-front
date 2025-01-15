import style from './style.module.scss';

import AnchorUnderline from '../Anchor/AnchorUnderline';
import Button from '../Button';

function ErrorContent({ reset }: { reset: () => void }) {
  return (
    <div className={style['container']}>
      <h2 className={style['title']}>Something went wrong!</h2>
      <Button onClick={() => reset()}>Try again</Button>
      <AnchorUnderline href='/'>Return home</AnchorUnderline>
    </div>
  );
}

export default ErrorContent;
