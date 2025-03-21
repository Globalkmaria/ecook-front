'use client';

import { useParams } from 'next/navigation';

import { useDeleteRecipeMutation } from '@/queries/hooks';

import useModal from '@/hooks/useModal';

import { DropboxItem } from '@/components/Dropbox';
import Icon, { IconProps } from '@/components/Icon';
import { Modal2 } from '@/components/Modal';
import ModalContainer from '@/components/Modal/ModalContainer';
import { MoreButton } from '@/components/MoreButton';

import { useClientStore } from '@/providers/client-store-provider';
import { RecipeSimple } from '@/services/requests/recipe/type';

import RecipeEdit from './RecipeEdit';
import style from './style.module.scss';

interface Props {
  recipeKey: RecipeSimple['key'];
}

function CardMenu({ recipeKey }: Props) {
  const params = useParams();
  const editModal = useModal();
  const { mutate, isPending: disableDeleteButton } =
    useDeleteRecipeMutation(recipeKey);
  const loginUserUsername = useClientStore((state) => state.user.username);
  const isLoginUser = params.username === loginUserUsername;

  if (!isLoginUser) return null;

  const onDelete = () => {
    if (disableDeleteButton) return;
    mutate();
  };

  const buttons: {
    icon: IconProps['icon'];
    text: string;
    onClick: () => void;
    disabled?: boolean;
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
      disabled: disableDeleteButton,
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
