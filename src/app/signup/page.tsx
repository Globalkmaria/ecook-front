import style from './style.module.scss';

import SignupContainer from './SignupContainer';

function page() {
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <SignupContainer />
      </div>
    </div>
  );
}

export default page;
