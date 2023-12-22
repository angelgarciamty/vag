import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RouterConfig from './RouterConfig.jsx'
import { ArchivosProvider } from './context/ArchivosContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ArchivosProvider>
    <RouterProvider router={RouterConfig}>
      <App />
    </RouterProvider>
  </ArchivosProvider>
)
