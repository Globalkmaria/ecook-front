import style from './style.module.scss';

import LoginContainer from './LoginContainer';

function LoginPage() {
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <LoginContainer />
      </div>
    </div>
  );
}

export default LoginPage;
