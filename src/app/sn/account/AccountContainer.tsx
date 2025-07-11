'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { LOGIN_LINK } from '@/helpers/links';

import { useClientStore } from '@/providers/client-store-provider';

import AccountDeletion from './AccountDeletion';
import style from './style.module.scss';

function AccountContainer() {
  const user = useClientStore((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    const deletionToken = sessionStorage.getItem('account_deleted');
    if (!user.isLoggedIn && !deletionToken) {
      router.push(LOGIN_LINK);
    }
  }, [user.isLoggedIn, router]);

  if (!user.isLoggedIn) {
    return null;
  }

  return (
    <div className={style.container}>
      <section className={style.section}>
        <h3 className={style.sectionTitle}>Account Information</h3>
        <p className={style.sectionDescription}>
          Logged in as: <strong>{user.username}</strong>
        </p>
      </section>

      <section className={`${style.section}`}>
        <h3 className={style.sectionTitle}>Danger Zone</h3>
        <p className={style.sectionDescription}>
          Permanently delete your account.
          <br />
          This action cannot be undone.
        </p>
        <AccountDeletion />
      </section>
    </div>
  );
}

export default AccountContainer;
