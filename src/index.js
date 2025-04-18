import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { NotificationProvider } from './context/NotificationContext.js';
import { UserProvider } from './context/UserContext';

const buildProvidersTree = (providers) => {
  return ({ children }) =>
    providers.reduce((acc, [Provider, props = {}]) => {
      return <Provider {...props}>{acc}</Provider>;
    }, children);
};

const ProvidersTree = buildProvidersTree([
  [BrowserRouter],
  [UserProvider],
  [NotificationProvider],
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ProvidersTree>
      <App />
    </ProvidersTree>
  </React.StrictMode>
);

reportWebVitals();
