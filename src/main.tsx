import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { Provider as ReduxProvider } from 'react-redux'
import { store } from './redux/store.ts'
import { RouterProvider } from 'react-router'
import { router } from './routes/router.tsx'
import { Toaster } from './components/ui/sonner.tsx'
import { ThemeProvider } from './components/provider/theme-provider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <ThemeProvider defaultTheme='light' storageKey="vite-ui-theme">

    <RouterProvider router={router} />
    <Toaster position='top-center'/>
      </ThemeProvider>
    </ReduxProvider>
  </StrictMode>,
)
