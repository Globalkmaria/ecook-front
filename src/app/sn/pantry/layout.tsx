import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pantry | E-COOK',
  description: 'Pantry page for E-COOK',
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
