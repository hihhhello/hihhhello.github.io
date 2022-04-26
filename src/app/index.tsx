import { Routing } from 'pages';
import React from 'react';
import './index.scss';
import { withProviders } from './providres';

function App() {
  return (
    <div className="app">
      <div className="container">
        <h1 className="title">GitHub Searcher</h1>
        <Routing />
      </div>
    </div>
  );
}

export default withProviders(App);
