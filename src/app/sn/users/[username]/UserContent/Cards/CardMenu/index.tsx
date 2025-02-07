'use client';

import { useParams } from 'next/navigation';

import style from './style.module.scss';

import { useClientStore } from '@/providers/client-store-provider';

import { RecipeSimple } from '@/services/requests/recipe/type';

import { useDeleteRecipeMutation } from '@/queries/hooks';

import useModal from '@/hooks/useModal';

import Icon, { IconProps } from '@/components/Icon';
import { DropboxItem } from '@/components/Dropbox';
import { MoreButton } from '@/components/MoreButton';
import { Modal2 } from '@/components/Modal';
import ModalContainer from '@/components/Modal/ModalContainer';

import RecipeEdit from './RecipeEdit';

interface Props {
  recipeKey: RecipeSimple['key'];
}

function CardMenu({ recipeKey }: Props) {
  const params = useParams();
  const editModal = useModal();
  const { mutate } = useDeleteRecipeMutation();
  const loginUserUsername = useClientStore((state) => state.user.username);
  const isLoginUser = params.username === loginUserUsername;

  if (!isLoginUser) return null;

  const onDelete = () => mutate(recipeKey);

  const buttons: {
    icon: IconProps['icon'];
    text: string;
    onClick: () => void;
  }[] = [
    {
      icon: 'edit',
      text: 'Edit',
      onClick: editModal.onOpen,
    },
    {
      icon: 'trash',
      text: 'Delete',
      onClick: onDelete,
    },
  ];

  return (
    <>
      <div className={style['more-button']}>
        <MoreButton
          horizontal='right'
          className={style['more-button__container']}
        >
          {buttons.map(({ icon, text, onClick }) => (
            <DropboxItem key={text} onClick={onClick}>
              <Icon className={style.more} icon={icon} />
              {text}
            </DropboxItem>
          ))}
        </MoreButton>
      </div>

      {editModal.isOpen && (
        <Modal2 isOpen={editModal.isOpen} onClose={editModal.onClose}>
          <ModalContainer>
            <RecipeEdit
              recipeKey={recipeKey}
              onCloseModal={editModal.onClose}
            />
          </ModalContainer>
        </Modal2>
      )}
    </>
  );
}

export default CardMenu;
