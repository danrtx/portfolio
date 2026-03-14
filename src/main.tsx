import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import SettingsOnboarding from './components/SettingsOnboarding'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <SettingsOnboarding />
  </React.StrictMode>
)
