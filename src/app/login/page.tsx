import LoginContainer from './LoginContainer';
import style from './style.module.scss';

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
