'use client'

import dynamic from 'next/dynamic'
import { EditorSkeleton } from './BlogEditor'

export const DynamicBlogEditor = dynamic(
  () => import('./BlogEditor').then((mod) => mod.BlogEditor),
  {
    ssr: false,
    loading: () => <EditorSkeleton />,
  }
)
