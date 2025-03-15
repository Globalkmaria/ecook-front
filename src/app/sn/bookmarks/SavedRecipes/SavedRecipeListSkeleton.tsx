import RecipeImgAndInfoCard from '@/app/components/common/RecipeImgAndInfoCard';

import style from './style.module.scss';
import Skeleton from '@/components/Skeleton';

function SavedRecipeListSkeleton() {
  const list = Array.from({ length: 4 });
  return (
    <div>
      <div className={style['skeleton__title']}>
        <Skeleton border />
      </div>
      <ul className={style['list']}>
        {list.map((_, index) => (
          <li key={index}>
            <RecipeImgAndInfoCard.Skeleton />
          </li>
        ))}
      </ul>
    </div>
  );
}
export default SavedRecipeListSkeleton;
