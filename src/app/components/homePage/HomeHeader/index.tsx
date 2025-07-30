import style from './style.module.scss';

function HomeHeader() {
  return (
    <header className={style.header}>
      <h1 className={style.title}>
        Discover the
        <br />
        Joy of Cooking
      </h1>
      <p className={style.description}>
        Explore a world of delicious recipes, <br /> from timeless classics to
        modern creations
      </p>
    </header>
  );
}

export default HomeHeader;
