import App from 'app';
import { repoModel } from 'entities/repo';
import { userModel } from 'entities/user';
import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <userModel.UserProvider>
    <repoModel.RepoProvider>
      <App />
    </repoModel.RepoProvider>
  </userModel.UserProvider>
);

reportWebVitals();
