import dynamic from 'next/dynamic'
import type { ComponentType, JSX } from 'react'
import type { DynamicOptions } from 'next/dynamic'

export const dynamicImport = <P extends Record<string, unknown>>(
  importFn: () => Promise<{ default: ComponentType<P> }>,
  options: Partial<Pick<DynamicOptions, 'loading' | 'ssr'>> = {}
): ComponentType<P> => {
  const dynamicOptions: DynamicOptions = {
    ...options,
    ssr: options.ssr ?? false,
  }
  // @ts-expect-error - Next.js dynamic import typing issue
  return dynamic(importFn, dynamicOptions)
}

// Tạo các dynamic components
export const DynamicComponents = {
  Console: dynamic(() => import('@/app/console/page'), {
    ssr: false,
  }),
  TableList: dynamic(() => import('@/app/console/components/TableList'), {
    ssr: false,
  })  
} // Thêm các components khác ở đây