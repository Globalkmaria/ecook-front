'use client';

import { useEffect, useRef } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { HOME_LINK, SIGNUP_LINK } from '@/helpers/links';

import Button from '@/components/Button';
import Icon from '@/components/Icon';

import style from './style.module.scss';

function GoodbyePage() {
  const router = useRouter();
  const hasProcessedToken = useRef(false);

  useEffect(() => {
    if (hasProcessedToken.current) {
      return;
    }

    const deletionToken = sessionStorage.getItem('account_deleted');
    if (!deletionToken) {
      router.replace(HOME_LINK);
      return;
    }

    hasProcessedToken.current = true;
    sessionStorage.removeItem('account_deleted');
  }, []);

  return (
    <main className={style.page}>
      <div className={style.container}>
        <div className={style.content}>
          <header className={style.header}>
            <h1 className={style.title}>Account Successfully Deleted</h1>
            <div className={style.icon}>
              <Icon icon='handWave' />
            </div>
          </header>

          <section className={style.messageSection}>
            <h2 className={style.subtitle}>Sorry to see you go!</h2>
            <p className={style.description}>
              {`Your account has been permanently deleted. We're sad to see you
              leave our cooking community.`}
            </p>
          </section>

          <section className={style.actions}>
            <Link href={HOME_LINK}>
              <Button variant='primary'>Browse Recipes</Button>
            </Link>
            <Link href={SIGNUP_LINK}>
              <Button variant='secondary'>Join Again</Button>
            </Link>
          </section>

          <footer className={style.footer}>
            <p className={style.footerText}>
              Changed your mind? You can always{' '}
              <Link href={SIGNUP_LINK} className={style.link}>
                create a new account
              </Link>{' '}
              and rejoin our cooking community!
            </p>
          </footer>
        </div>
      </div>
    </main>
  );
}

export default GoodbyePage;
