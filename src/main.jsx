import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import { ServerProvider } from './context/ServerContext';
import { ToastProvider } from './context/ToastContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <ServerProvider>
          <ToastProvider>
            <App />
          </ToastProvider>
        </ServerProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
