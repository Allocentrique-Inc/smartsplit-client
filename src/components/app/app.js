import React, { Component } from 'react'
import logo from '../../assets/images/logo.svg'
import './app.css'
import Navbar from './navbar';
// import Login from '../auth/LogIn';
// import Register from '../auth/Register';
// import ForgotPassword from '../auth/ForgotPassword';
// import ForgotPasswordVerification from '../auth/ForgotPasswordVerification';
// import Welcome from '../auth/Welcome';
import { Auth } from 'aws-amplify';


import { Translation } from 'react-i18next'

class App extends Component {   
  
  state = {
    isAuthenticated: false,
    isAuthenticating: true,
    user: null
  }

  setAuthStatus = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  setUser = user => {
    this.setState({ user: user });
  }

  async componentDidMount() {
    try {
      const session = await Auth.currentSession();
      this.setAuthStatus(true);
      console.log(session);
      const user = await Auth.currentAuthenticatedUser();
      this.setUser(user);
    } catch(error) {
      if (error !== 'No current user') {
        console.log(error);
      }
    }
  
    this.setState({ isAuthenticating: false });
  }

  render() {   
    const authProps = {
      isAuthenticated: this.state.isAuthenticated,
      user: this.state.user,
      setAuthStatus: this.setAuthStatus,
      setUser: this.setUser
    } 

    return (
      !this.state.isAuthenticating &&
      <Translation>
        {
          (t) => 
          <div className="App">
            <div className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h2>{t('titre.principal')}</h2>
              <br/>
            </div>
            <Navbar auth={authProps} />
            <p className="App-intro">
              <code>{t('titre.accueil')}</code>
            </p>
            <p>
              <h2>SPRINT 0</h2>
              <a href="/liste-oeuvres">Liste des oeuvres</a><br/>
              <h2>SPRINT 1</h2>
              <a href="/decrire-oeuvre">Décrire mon oeuvre</a><br/>
              <h2>SPRINT 2</h2>
              <a href="/approuver-split/1">Approuver un split - droits d'auteur et droits voisins</a><br/>
              <a href="/approuver-split/2">Approuver un split - droits d'auteur seulement</a><br/>
              <a href="/approuver-split/3">Approuver un split - droits d'auteur, un seul collaborateur seulement</a><br/>
              <a href="/approuver-split/4">Approuver un split - droits d'auteur et droits voisins (avec Georges)</a><br/>
              <a href="/login">Login</a><br/>
              <a href="/register">Register</a><br/>
              <a href="/forgot-password">Forgot Password</a><br/>
              <a href="/forgot-password-verification">Password Verification</a><br/>
              <a href="/welcome">Welcome</a><br/>
            </p>
        </div>
        }
      </Translation>
    )
  }
}

export default App;
