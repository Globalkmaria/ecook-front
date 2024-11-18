'use client';

import { useRouter } from 'next/navigation';

import style from './Cards.module.scss';

import { RecipeSimple } from '@/service/recipes/type';
import { deleteRecipe } from '@/service/recipes';

import useModal from '@/hooks/useModal';

import Icon from '@/components/Icon';
import { DropboxItem } from '@/components/Dropbox';
import { MoreButton } from '@/components/MoreButton';
import { Modal2 } from '@/components/Modal';
import ModalContainer from '@/components/Modal/ModalContainer';

import RecipeEdit from './RecipeEdit';

interface Props {
  recipeId: RecipeSimple['id'];
}

function CardMenu({ recipeId }: Props) {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useModal();

  const onDelete = async () => {
    const result = await deleteRecipe(recipeId);
    if (result.ok) {
      router.refresh();
    } else {
      console.error(result.error);
    }
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
            <RecipeEdit recipeId={recipeId} onCloseModal={onClose} />
          </ModalContainer>
        </Modal2>
      )}
    </>
  );
}

export default CardMenu;
