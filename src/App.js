import React, { Component } from 'react'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

import Squawk from './Squawk.js';
import Squawks from './Squawks.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">Truffle Box</a>
        </nav>

        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h1>Good to Go!</h1>
              <Squawk />
              <Squawks />
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App
