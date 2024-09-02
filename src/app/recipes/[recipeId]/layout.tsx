import style from './style.module.css';

function RecipeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <section className={style.layout}>{children}</section>;
}

export default RecipeLayout;
