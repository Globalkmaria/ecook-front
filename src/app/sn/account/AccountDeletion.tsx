'use client';

import { useState } from 'react';

import { useDeleteAccountMutation } from '@/queries/hooks';

import useModal from '@/hooks/useModal';

import Button from '@/components/Button';
import { Input } from '@/components/Input';
import { Modal } from '@/components/Modal';
import { ModalMessage } from '@/components/Modal/Modal';

import style from './style.module.scss';

function AccountDeletion() {
  const warningModal = useModal();
  const confirmModal = useModal();
  const [password, setPassword] = useState('');
  const { mutate: deleteAccount, isPending } = useDeleteAccountMutation();

  const handleInitialDelete = () => {
    warningModal.onOpen();
  };

  const handleProceedToConfirm = () => {
    warningModal.onClose();
    confirmModal.onOpen();
  };

  const handleConfirmDelete = () => {
    if (!password.trim()) {
      alert('Please enter your password to confirm account deletion.');
      return;
    }

    deleteAccount();
    confirmModal.onClose();
    setPassword('');
  };

  const handleCancel = () => {
    confirmModal.onClose();
    setPassword('');
  };

  return (
    <section className={style.dangerSection}>
      <div className={style.dangerHeader}>
        <p className={style.dangerDescription}>
          Once you delete your account, there is no going back. Please be
          certain.
          <br />
          Recipes and some data will be remain available to other users.
          <br />
          If, you want to delete data, please check the data you want to delete
          and delete them.
        </p>
      </div>

      <div className={style.dangerActions}>
        <Button
          variant='danger'
          onClick={handleInitialDelete}
          disabled={isPending}
          aria-label='Delete account'
        >
          Delete Account
        </Button>
      </div>

      {/* Warning Modal */}
      {warningModal.isOpen && (
        <Modal
          onClose={warningModal.onClose}
          title='Delete Account'
          backgroundType='light'
        >
          <div className={style.modalContent}>
            <ModalMessage>
              <strong>This action cannot be undone.</strong>
              This will permanently delete your account.
            </ModalMessage>

            <div className={style.modalActions}>
              <Button variant='secondary' onClick={warningModal.onClose}>
                Cancel
              </Button>
              <Button variant='danger' onClick={handleProceedToConfirm}>
                I understand, continue
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Password Confirmation Modal */}
      {confirmModal.isOpen && (
        <Modal
          onClose={handleCancel}
          title='Confirm Account Deletion'
          backgroundType='light'
        >
          <div className={style.modalContent}>
            <ModalMessage>
              To confirm account deletion, please enter your password below:
            </ModalMessage>

            <div className={style.passwordSection}>
              <Input
                type='password'
                placeholder='Enter your password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete='current-password'
                aria-label='Password confirmation'
                disabled={isPending}
              />
            </div>

            <div className={style.modalActions}>
              <Button
                variant='secondary'
                onClick={handleCancel}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button
                variant='danger'
                onClick={handleConfirmDelete}
                disabled={isPending || !password.trim()}
                aria-label='Confirm delete account'
              >
                {isPending ? 'Deleting Account...' : 'Delete My Account'}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
}

export default AccountDeletion;
