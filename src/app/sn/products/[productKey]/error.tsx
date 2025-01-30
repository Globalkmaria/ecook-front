'use client';

import ErrorContent from '@/components/ErrorContent';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.error('Error:', error);
  return <ErrorContent reset={reset} />;
}
