import style from './style.module.scss';

function RecipeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <section className={style.layout}>{children}</section>;
}

export default RecipeLayout;
