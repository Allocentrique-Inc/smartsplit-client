import React, { Component } from 'react'
import logo from '../../assets/images/logo.svg'
import './app.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>SmartSplit Alpha - Client</h2>
          <br/>
        </div>
        <p className="App-intro">
          <code>Accueil</code>          
        </p>
        <p>
          <a href="/nouvelle-oeuvre">Liens vers "Nouvelle oeuvre" (embarquement étape 1)</a><br/>
          <a href="/decrire-oeuvre">Liens vers "Décrire mon oeuvre (description d'un oeuvre créée, suite étape 1)"</a>
        </p>        
      </div>
    );
  }
}

export default App;
