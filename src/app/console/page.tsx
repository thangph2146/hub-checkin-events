'use client'

import { ErrorBoundary } from 'react-error-boundary'
import { Suspense } from 'react'
import TableList from './components/TableList'
import LoadingFallback from './components/LoadingFallback'
import ErrorFallback from './components/ErrorFallback'


export default function Console() {
  return (
    <div className="container mx-auto p-4">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<LoadingFallback />}>
          <TableList />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
} 