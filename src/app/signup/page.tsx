import SignupContainer from './SignupContainer';
import style from './style.module.scss';

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
