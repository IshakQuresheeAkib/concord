import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './Routes/Routes.jsx'
import AuthProvider from './provicer/AuthProvider.jsx'
import { ParallaxProvider } from 'react-scroll-parallax'
import Loader from './Components/Loader/Loader.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ParallaxProvider>
        <Suspense fallback={<Loader />}>
          <RouterProvider router={router} />
        </Suspense>
      </ParallaxProvider>
    </AuthProvider>
  </React.StrictMode>,
)
