import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// electron======================================================
// import electron from '@electron/remote'
setTimeout(() => {
  let electron = require('@electron/remote')
  window.electron = electron
})
