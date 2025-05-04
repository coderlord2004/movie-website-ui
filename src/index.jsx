import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { NotificationProvider } from './context/NotificationContext.jsx';
import { AuthUserProvider } from './context/AuthUserContext.jsx';
import { PageTransitionProvider } from './context/PageTransitionContext.jsx';

const buildProvidersTree = (providers) => {
  return ({ children }) =>
    providers.reduce((acc, [Provider, props = {}]) => {
      return <Provider {...props}>{acc}</Provider>;
    }, children);
};

const ProvidersTree = buildProvidersTree([
  [BrowserRouter],
  [PageTransitionProvider],
  [AuthUserProvider],
  [NotificationProvider],
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ProvidersTree>
    <App />
  </ProvidersTree>
);

reportWebVitals();
