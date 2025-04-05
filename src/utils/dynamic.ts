import dynamic from 'next/dynamic'
import type { ComponentType } from 'react'
import type { DynamicOptions } from 'next/dynamic'

export const dynamicImport = <T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  options: Partial<Pick<DynamicOptions, 'loading' | 'ssr'>> = {}
) => {
  const dynamicOptions: DynamicOptions = {
    ...options,
    ssr: options.ssr ?? false,
  }
  return dynamic(importFn, dynamicOptions)
}

// Tạo các dynamic components
export const DynamicComponents = {
  Console: dynamicImport(() => import('@/app/console/page'), {
    ssr: false,
  }),
  // Thêm các components khác ở đây
}