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
  const [deleteReason, setDeleteReason] = useState('');
  const { mutate: deleteAccount, isPending } = useDeleteAccountMutation();

  const handleInitialDelete = () => {
    warningModal.onOpen();
  };

  const handleProceedToConfirm = () => {
    warningModal.onClose();
    confirmModal.onOpen();
  };

  const handleConfirmDelete = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!password.trim()) {
      alert('Please enter your password to confirm account deletion.');
      return;
    }

    deleteAccount({
      password: password.trim(),
      reason: deleteReason.trim(),
    });
    confirmModal.onClose();
  };

  const handleCancel = () => {
    setPassword('');
    setDeleteReason('');
    confirmModal.onClose();
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
          <form onSubmit={handleConfirmDelete}>
            <div className={style.modalContent}>
              <div className={style.passwordSection}>
                <p>
                  To confirm account deletion, please enter your password below:
                </p>
                <Input
                  type='password'
                  placeholder='Optional: Enter your password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete='current-password'
                  aria-label='Password confirmation'
                  disabled={isPending}
                />
              </div>

              <div className={style.deleteReasonSection}>
                <p>Please enter the reason for deleting your account.</p>
                <Input
                  type='text'
                  placeholder='Enter the reason'
                  value={deleteReason}
                  onChange={(e) => setDeleteReason(e.target.value)}
                  aria-label='Delete reason'
                  disabled={isPending}
                />
              </div>
              <div className={style.modalActions}>
                <Button
                  type='button'
                  variant='secondary'
                  onClick={handleCancel}
                  disabled={isPending}
                >
                  Cancel
                </Button>
                <Button
                  type='submit'
                  variant='danger'
                  disabled={isPending || !password.trim()}
                  aria-label='Confirm delete account'
                >
                  {isPending ? 'Deleting Account...' : 'Delete My Account'}
                </Button>
              </div>
            </div>
          </form>
        </Modal>
      )}
    </section>
  );
}

export default AccountDeletion;
