import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Barbecue from './Barbecue';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Grilly</h1>
        </header>
        <Barbecue />
      </div>
    );
  }
}

export default App;
