import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bookmarked Recipes | E-COOK',
  description: 'Check out your bookmarked recipes on E-COOK.',
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
