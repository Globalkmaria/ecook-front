import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cart | E-COOK',
  description: 'Cart page for E-COOK',
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
