'use client';

import style from './Cards.module.scss';

import { RecipeSimple } from '@/service/recipes/type';

import Icon from '@/components/Icon';
import { DropboxItem } from '@/components/Dropbox';
import { MoreButton } from '@/components/MoreButton';
import { deleteRecipe } from '@/service/recipes';
import { useRouter } from 'next/navigation';

interface Props {
  recipeId: RecipeSimple['id'];
}

function CardMenu({ recipeId }: Props) {
  const router = useRouter();

  const onDelete = async () => {
    const result = await deleteRecipe(recipeId);
    if (result.ok) {
      router.refresh();
    } else {
      console.error(result.error);
    }
  };

  return (
    <div className={style['more-button']}>
      <MoreButton
        horizontal='right'
        className={style['more-button__container']}
      >
        <DropboxItem onClick={onDelete}>
          <Icon className={style.more} icon='trash' />
          Delete
        </DropboxItem>
      </MoreButton>
    </div>
  );
}

export default CardMenu;
