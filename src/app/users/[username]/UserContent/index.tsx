import style from './style.module.scss';

import Icon from '@/components/Icon';

import RecipeList from './RecipeList';

function UserContent() {
  return (
    <section>
      <div className={style.tabs}>
        <span className={style.tab}>
          <Icon icon='grid' /> RECIPES
        </span>
      </div>
      <RecipeList />
    </section>
  );
}

export default UserContent;
