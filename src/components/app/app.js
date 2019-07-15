import React, { Component } from 'react'
import logo from '../../assets/images/logo.svg'
import './app.css'
import { Auth } from 'aws-amplify';


import { Translation } from 'react-i18next'

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
      if (error !== 'No current user') {
        console.log(error);
      }
    }
  
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
              <a href="/approuver-split/1">Approuver un split - droits d'auteur et droits voisins</a><br/>
              <a href="/approuver-split/2">Approuver un split - droits d'auteur seulement</a><br/>
              <a href="/approuver-split/3">Approuver un split - droits d'auteur, un seul collaborateur seulement</a><br/>
              <a href="/approuver-split/4">Approuver un split - droits d'auteur et droits voisins (avec Georges)</a><br/>
              <p/>
              <h3>Connexion et création de compte</h3>
              <a href="/login">Login</a><br/>
              <a href="/register">Register</a><br/>
              <a href="/signup">SignUp</a><br/>
              <a href="/forgot-password">Forgot Password</a><br/>
              <a href="/forgot-password-verification">Password Verification</a><br/>
              <a href="/welcome">Welcome</a><br/>
              <h2>SPRINT 3</h2>
              <a href="/accueil">Tableau de bord</a><br/>
            </div>            
        </div>
        }
      </Translation>
    )
  }
}

export default App;
