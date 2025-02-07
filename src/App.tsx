import React from 'react';
// import logo from './logo.svg';
import './App.css';
// import Approuter from '../src/components/layout/index.tsx';
import LayoutComponent from '../src/components/layout/index.tsx';
import { BrowserRouter } from 'react-router-dom';
// import { BrowserRouter, BrowserRouter as Router } from 'react-router-dom';
function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <React.Fragment>
     <BrowserRouter>
      <LayoutComponent/>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
