import { createRoot } from 'react-dom/client';
import { registerSW } from 'virtual:pwa-register';
import App from './App.tsx';
import './index.css';

if ('serviceWorker' in navigator) {
  registerSW({
    immediate: true,
    onRegisterError() {
      // Skipped silently if blocked by embedded preview sandbox
    },
  });
}

createRoot(document.getElementById('root')!).render(<App />);
