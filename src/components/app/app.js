import React, { Component } from 'react'
import logo from '../../assets/images/logo.svg'
import './app.css'

import { Translation } from 'react-i18next'
import axios from 'axios'

import { toast } from 'react-toastify'

class App extends Component {   
  
  state = {
    isAuthenticated: false,
    isAuthenticating: true,
    user: null
  }

  componentDidMount() {          
  
    axios.get('http://api.smartsplit.org:8080/v1/media')
    .then(res=>{
      let listeMedias = res.data.map((elem, idx)=>{
        return (
          <option key={`option_media_${idx}`} value={elem.mediaId}>{elem.title}</option>
        )
      })      
      this.setState({listeMedias: listeMedias})
    })
    .catch(err=>{
      toast.error(err)
    })

    axios.get('http://api.smartsplit.org:8080/v1/proposal')
    .then(res=>{
      let listePropositions = res.data.map((elem, idx)=>{
        return (
          <option key={`option_proposal_${idx}`} value={elem.uuid}>{elem.uuid} - {elem.initiator && elem.initiator.name}</option>
        )
      })      
      this.setState({listePropositions: listePropositions})
    })
    .catch(err=>{
      toast.error(err)
    })

  }

  render() {   

    return (
      //!this.state.isAuthenticating &&
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
            <div>
              <div class="heading2">Sprint 0</div>
              <a href="/liste-oeuvres">Liste des oeuvres</a><br/>
              <div class="heading2">Sprint 1</div>
              <a href="/decrire-oeuvre">Décrire mon oeuvre</a><br/>
              <div class="heading2">Sprint 2</div>
              <a href="/approuver-proposition/12c4b4a0-a70f-11e9-b844-5df68dc2fde4">Soumettre au vote #1</a><br/>
              <a href="/approuver-proposition/3fa033e0-a657-11e9-a258-31a39dbe4719">Soumettre au vote #2</a><br/>
              <a href="/approuver-proposition/45745c60-7b1a-11e8-9c9c-2d42b21b1a3e">Soumettre au vote #3</a><br/>
              <a href="/approuver-proposition/7ca75f20-a657-11e9-a258-31a39dbe4719">Soumettre au vote #4</a><br/>
              <a href="/approuver-proposition/d8fd3d50-a709-11e9-aa93-97e5b25f771d">Soumettre au vote #5</a><br/>
              <p/>
              <div class="heading3">Connexion et création de compte</div>
              <a href="/login">Login</a> <a href="/register">Register</a> <a href="/forgot-password">Forgot Password</a> <a href="/forgot-password-verification">Password Verification</a>  <a href="/change-password-verification">Change Verification</a> <a href="/welcome">Welcome</a><br/>
              <div class="heading2">Sprint 3</div>
              <a href="/accueil">Tableau de bord</a><br/>
              <a href="/visualisation/troissplits">Trois splits</a>
              <br/>              
              <div class="label">Partager les droits pour un média :</div>
              <select class="field-selector" id="select-media">
                {this.state.listeMedias}
              </select> 
              <button class="ui medium button" onClick={()=>{
                let e = document.getElementById('select-media')
                window.location.href = `/partager/${e.options[e.selectedIndex].value}`
              }}>Partager les droits</button>
              <br/><br/>

              Sommaire d'une proposition :
              <select id="select-proposition">
                {this.state.listePropositions}
              </select> <button onClick={()=>{
                let e = document.getElementById('select-proposition')
                window.location.href = `/proposition/sommaire/${e.options[e.selectedIndex].value}`
              }}>Afficher le sommaire</button><br/>
            </div>
        </div>
        }
      </Translation>
    )
  }
}

export default App;
