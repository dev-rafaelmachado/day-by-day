'use client'

import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { PropsWithChildren, useState } from 'react'

// Options
const queryClientOptions = {
  defaultOptions: {
    // 5 * 1000
    queries: {
      staleTime: 60000,
    },
  },
}

const ReactQueryProvider: React.FC<PropsWithChildren> = ({ children }) => {
  // State
  const [queryClientStore] = useState(() => new QueryClient(queryClientOptions))
  // Return Provider
  return (
    <QueryClientProvider client={queryClientStore}>
      {children}
    </QueryClientProvider>
  )
}

export default ReactQueryProvider
