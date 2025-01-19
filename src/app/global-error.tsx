'use client';

import { HOME_LINK } from '@/helpers/link';

import AnchorUnderline from '@/components/Anchor/AnchorUnderline';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.error('Error:', error);
  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <button onClick={() => reset()}>Try again</button>
        <AnchorUnderline href={HOME_LINK}>Return home</AnchorUnderline>
      </body>
    </html>
  );
}
