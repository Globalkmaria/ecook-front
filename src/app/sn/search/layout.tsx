import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Search Recipes | E-COOK',
  description:
    'Find the perfect recipe for any occasion. Search through a wide variety of delicious recipes shared by food enthusiasts worldwide.',
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
