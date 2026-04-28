import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import PwaInstallPrompt from './components/PwaInstallPrompt.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <PwaInstallPrompt />
  </StrictMode>,
)

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/sw.js');
  });
}
