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
              <h2>SPRINT 0</h2>
              <a href="/liste-oeuvres">Liens vers "Liste des oeuvre (appel API GET /media)"</a><br/>
              <h2>SPRINT 1</h2>
              <a href="/decrire-oeuvre">Liens vers "SPRINT 1 - Décrire mon oeuvre"</a><br/>
              <h2>SPRINT 2</h2>
              <a href="/approuver-split/1">Liens vers "SPRINT 2 - Approuver un split (droits d'auteur et droits voisins)"</a><br/>
              <a href="/approuver-split/2">Liens vers "SPRINT 2 - Approuver un split (droits d'auteur seulement)"</a><br/>
              <a href="/approuver-split/3">Liens vers "SPRINT 2 - Approuver un split (droits d'auteur, un seul collaborateur seulement)"</a><br/>
            </p>
        </div>
        }
      </Translation>
    )
  }
}

export default App;
