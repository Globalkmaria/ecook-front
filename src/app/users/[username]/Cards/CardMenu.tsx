'use client';

import { useParams } from 'next/navigation';

import style from './Cards.module.scss';

import { useUserStore } from '@/providers/user-store-provider';

import { RecipeSimple } from '@/service/recipes/type';

import useDeleteRecipe from '@/query/hook/useDeleteRecipeMutation';

import useModal from '@/hooks/useModal';

import Icon, { IconProps } from '@/components/Icon';
import { DropboxItem } from '@/components/Dropbox';
import { MoreButton } from '@/components/MoreButton';
import { Modal2 } from '@/components/Modal';
import ModalContainer from '@/components/Modal/ModalContainer';

import RecipeEdit from '../RecipeEdit';

interface Props {
  recipeKey: RecipeSimple['key'];
}

function CardMenu({ recipeKey }: Props) {
  const params = useParams();
  const { isOpen, onOpen, onClose } = useModal();
  const { mutate } = useDeleteRecipe();
  const username = useUserStore((state) => state.username);
  const isLoginUser = params.username === username;

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
      onClick: onOpen,
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

      {isOpen && (
        <Modal2 isOpen={isOpen} onClose={onClose}>
          <ModalContainer>
            <RecipeEdit recipeKey={recipeKey} onCloseModal={onClose} />
          </ModalContainer>
        </Modal2>
      )}
    </>
  );
}

export default CardMenu;
