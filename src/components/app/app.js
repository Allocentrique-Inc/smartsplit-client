import React, { Component } from 'react'
import logo from '../../assets/images/logo.svg'
import './app.css'
import { Auth } from 'aws-amplify';

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

    try {
      Auth.currentSession().then(
        session=>{
          this.props.auth.setAuthStatus(true)
          console.log(session)
          Auth.currentAuthenticatedUser().then(
            user=>{
              this.props.auth.setUser(user);
              this.setState({ isAuthenticating: false })
            }
          )
        }
      ).catch((err) => {
        console.log(`Auth err: ${err}`)
      })
                
    } catch(error) {
      if (error !== 'No current user.') {
        console.log(error);
      }
    }
  
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

  }

  render() {   
    const authProps = {
      isAuthenticated: this.state.isAuthenticated,
      user: this.state.user,
      setAuthStatus: this.setAuthStatus,
      setUser: this.setUser
    } 

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
              <h2>SPRINT 0</h2>
              <a href="/liste-oeuvres">Liste des oeuvres</a><br/>
              <h2>SPRINT 1</h2>
              <a href="/decrire-oeuvre">Décrire mon oeuvre</a><br/>
              <h2>SPRINT 2</h2>
              <a href="/approuver-proposition/12c4b4a0-a70f-11e9-b844-5df68dc2fde4">Soumettre au vote #1</a><br/>
              <a href="/approuver-proposition/3fa033e0-a657-11e9-a258-31a39dbe4719">Soumettre au vote #2</a><br/>
              <a href="/approuver-proposition/45745c60-7b1a-11e8-9c9c-2d42b21b1a3e">Soumettre au vote #3</a><br/>
              <a href="/approuver-proposition/7ca75f20-a657-11e9-a258-31a39dbe4719">Soumettre au vote #4</a><br/>
              <a href="/approuver-proposition/d8fd3d50-a709-11e9-aa93-97e5b25f771d">Soumettre au vote #5</a><br/>
              <p/>
              <h3>Connexion et création de compte</h3>
              <a href="/login">Login</a> <a href="/register">Register</a> <a href="/forgot-password">ForgotPassword</a> <a href="/forgot-password-verification">PasswordVerification</a>  <a href="/change-password-verification">ChangeVerification</a> <a href="/welcome">Welcome</a><br/>
              <h2>SPRINT 3</h2>
              <a href="/accueil">Tableau de bord</a><br/>
              <a href="/visualisation/troissplits">Trois splits</a><br/>              
              Partager les droits pour un média :
              <select id="select-media">
                {this.state.listeMedias}
              </select> <button onClick={()=>{
                let e = document.getElementById('select-media')
                window.location.href = `/partager/${e.options[e.selectedIndex].value}`
              }}>Partager les droits</button>
            </div>
        </div>
        }
      </Translation>
    )
  }
}

export default App;
