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
  errorMessage,
}: {
  errorMessage?: string;
  error: Error;
  resetErrorBoundary: () => void;
}) {
  const message = errorMessage || error.message;
  return (
    <div className={style['error']}>
      <p className={style['error-message']}>{message}</p>
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
  errorMessage?: string;
  errorFallback?: React.ComponentType<{
    error: TError;
    resetErrorBoundary: () => void;
    errorMessage?: string;
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
  errorMessage,

  ...queryOptions
}: SuspenseQueryProps<TData, TError>) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          FallbackComponent={(props) => (
            <ErrorFallback errorMessage={errorMessage} {...props} />
          )}
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
