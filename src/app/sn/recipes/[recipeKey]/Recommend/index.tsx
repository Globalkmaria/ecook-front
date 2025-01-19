import style from './style.module.scss';

import List from './List';

function Recommend() {
  return (
    <section className={style['recommend']}>
      <h2 className={style['title']}>Explore more recipes</h2>
      <List />
    </section>
  );
}

export default Recommend;
