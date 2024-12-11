'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import style from './Cards.module.scss';

import { RecipeSimple } from '@/service/recipes/type';
import { deleteRecipe } from '@/service/recipes';

import useModal from '@/hooks/useModal';
import useHandleAuthResponse from '@/hooks/useHandleAuthResponse';

import { checkLoginStatus } from '@/helpers/auth';

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
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useModal();
  const params = useParams();
  const { handleAuthResponse } = useHandleAuthResponse();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsClient(true);
    }
  }, []);

  if (!isClient) return null;

  if (!checkLoginStatus(params)) return null;

  const onDelete = async () => {
    handleAuthResponse({
      request: deleteRecipe(recipeKey),
      options: { onSuccess: () => router.refresh() },
    });
  };

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
