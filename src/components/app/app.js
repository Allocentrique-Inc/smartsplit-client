import React, { Component } from 'react'
import logo from '../../assets/images/logo.svg'
import './app.css'

import { Translation } from 'react-i18next'

class App extends Component {    

  render() {    

    return (
      <Translation>
        {
          (t) => 
          <div className="App">
            <div className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h2>{t('titre.principal')}</h2>
              <br/>
            </div>
            <p className="App-intro">
              <code>{t('titre.accueil')}</code>
            </p>
            <p>
              <a href="/nouvelle-oeuvre">Liens vers "Nouvelle oeuvre" (embarquement étape 1)</a><br/>
              <a href="/decrire-oeuvre">Liens vers "Décrire mon oeuvre (description d'un oeuvre créée, suite étape 1 + étape 3)"</a><br/>
              <a href="/liste-oeuvres">Liens vers "Liste des oeuvre (appel API GET /media)"</a><br/>
            </p>
        </div>
        }
      </Translation>
    )
  }
}

export default App;
