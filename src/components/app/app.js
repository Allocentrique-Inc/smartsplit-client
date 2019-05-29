import React, { Component } from 'react'
import logo from '../../assets/images/logo.svg'
import './app.css'
import MediaCreate from '../media/media-create'
import MediaList from '../media/media-list'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>SmartSplit Client - Alpha</h2>
        </div>
        <p className="App-intro">
          <code>Création de média</code>          
        </p>
        <MediaList />
        <hr/>
        <MediaCreate />
      </div>
    );
  }
}

export default App;
