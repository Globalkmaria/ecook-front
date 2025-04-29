'use client';

import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import {
  QueryErrorResetBoundary,
  type UseSuspenseQueryOptions,
  useSuspenseQuery,
} from '@tanstack/react-query';

import Button from '@/components/Button';

import style from './style.module.scss';

// -----------------
// Default fallbacks
// -----------------
function DefaultLoading() {
  return <p>Loading…</p>;
}

function DefaultErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  return (
    <div className={style['error']}>
      <p className={style['error-message']}>{error.message}</p>
      <Button onClick={resetErrorBoundary}>Retry</Button>
    </div>
  );
}

// --------------------------
// Public component signature
// --------------------------
export interface SuspenseQueryProps<TData, TError = Error>
  extends UseSuspenseQueryOptions<TData, TError> {
  children: (data: TData) => React.ReactNode;
  fallback?: React.ReactNode;
  errorFallback?: React.ComponentType<{
    error: TError;
    resetErrorBoundary: () => void;
  }>;
}

/**
 * @example
 * <SuspenseQuery
 *   queryKey={['todos']}
 *   queryFn={fetchTodos}
 *   fallback={<TodoSkeleton />}
 * >
 *   {(todos) => <TodoList items={todos} />}
 * </SuspenseQuery>
 */
export function SuspenseQuery<TData, TError extends Error = Error>({
  children,
  fallback = <DefaultLoading />,
  errorFallback: ErrorFallback = DefaultErrorFallback,
  ...queryOptions
}: SuspenseQueryProps<TData, TError>) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          FallbackComponent={(props) => <ErrorFallback {...props} />}
        >
          <Suspense fallback={fallback}>
            <InnerQuery {...queryOptions}>{children}</InnerQuery>
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}

function InnerQuery<TData, TError = Error>({
  children,
  ...queryOptions
}: {
  children: (data: TData) => React.ReactNode;
} & UseSuspenseQueryOptions<TData, TError>) {
  const { data } = useSuspenseQuery(queryOptions);
  return <>{children(data)}</>;
}
