import style from './style.module.scss';

function HomeHeader() {
  return (
    <header className={style.header}>
      <h1 className={style.title}>Discover the joy of cooking</h1>
      <p className={style.description}>
        Explore a world of delicious recipes, from timeless classics to modern
        creations, crafted to inspire your next culinary adventure
      </p>
    </header>
  );
}

export default HomeHeader;
