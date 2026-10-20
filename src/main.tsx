import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { initAnalytics } from './lib/analytics'
import './index.css'
import './styles/effects.css'
import './styles/widgets.css'
import './styles/sections.css'
import './styles/workshop.css'
import './styles/nav.css'

initAnalytics()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
