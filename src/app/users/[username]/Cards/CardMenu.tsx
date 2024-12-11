'use client';

import { useParams, useRouter } from 'next/navigation';

import style from './Cards.module.scss';

import { RecipeSimple } from '@/service/recipes/type';
import { deleteRecipe } from '@/service/recipes';

import useModal from '@/hooks/useModal';

import Icon from '@/components/Icon';
import { DropboxItem } from '@/components/Dropbox';
import { MoreButton } from '@/components/MoreButton';
import { Modal2 } from '@/components/Modal';
import ModalContainer from '@/components/Modal/ModalContainer';

import { getUserInfo } from '@/helpers/auth';

import useHandleAuthResponse from '@/hooks/useHandleAuthResponse';

import RecipeEdit from '../RecipeEdit';

interface Props {
  recipeKey: RecipeSimple['key'];
}

function CardMenu({ recipeKey }: Props) {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useModal();
  const { username } = getUserInfo();
  const { username: paramUsername } = useParams();
  const { handleAuthResponse } = useHandleAuthResponse();

  if (!username || username !== paramUsername) return null;

  const onDelete = async () => {
    handleAuthResponse({
      request: deleteRecipe(recipeKey),
      options: { onSuccess: () => router.refresh() },
    });
  };

  return (
    <>
      <div className={style['more-button']}>
        <MoreButton
          horizontal='right'
          className={style['more-button__container']}
        >
          <DropboxItem onClick={onDelete}>
            <Icon className={style.more} icon='trash' />
            Delete
          </DropboxItem>
          <DropboxItem onClick={onOpen}>
            <Icon className={style.more} icon='edit' />
            Edit
          </DropboxItem>
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
