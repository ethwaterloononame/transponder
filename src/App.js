import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Squawk from './Squawk.js';
import Squawks from './Squawks.js';

import './App.css';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <section>
          <AppBar
            title="Transponder"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
          />

          <main>
            <Squawk />
            <Squawks />
          </main>
        </section>
      </MuiThemeProvider>
    );
  }
}

export default App
