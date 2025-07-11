import AccountContainer from './AccountContainer';
import style from './style.module.scss';

function AccountPage() {
  return (
    <main className={style['page']}>
      <div className={style['page__container']}>
        <header className={style['header']}>
          <h2 className={style['title']}>Account Settings</h2>
          <p className={style['description']}>
            Manage your account preferences and data.
          </p>
        </header>
        <AccountContainer />
      </div>
    </main>
  );
}

export default AccountPage;
