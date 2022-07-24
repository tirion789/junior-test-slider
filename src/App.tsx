import React from 'react';
import './scss/app.scss';
import Home from './page/index';

const App = () => {
  return (
    <div className="wrapper">
      <div className="content">
        <Home />
      </div>
    </div>
  );
};

export default App;
