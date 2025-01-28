// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Auth0Provider } from "@auth0/auth0-react";


const rootElement = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(rootElement).render(
  <Auth0Provider
    domain={import.meta.env.VITE_REACT_APP_AUTH0_DOMAIN} 
    clientId={import.meta.env.VITE_REACT_APP_AUTH0_CLIENT_ID}
    authorizationParams={{
      connection: 'google-oauth2',
    }}

  >
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Auth0Provider>
);

