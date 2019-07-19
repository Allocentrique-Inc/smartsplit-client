import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/app/app'
import 'semantic-ui-css/semantic.min.css'
import './index.css'

// Amplify + Auth
import Amplify from 'aws-amplify';

// Traduction
import i18n from './utils/i18n'
import { I18nextProvider } from "react-i18next"

// Routeur applicatif
import { Router, Route, Switch } from 'react-router'
import { createBrowserHistory } from 'history'

// Alertes utlisateur
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Composantes navigables
import AssistantOeuvre from './components/oeuvre/assistant-oeuvre'
import ListeOeuvres from './components/media/media-list'
import ValiderSplit from './components/split/assistant-split'
import VotationSplit from './components/split/votation-split'

// Tableau de bord
import TableauDeBord from './components/tableaudebord/tableaudebord'
import Beignet from './components/visualisation/partage/beignet';

// Composantes auth
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import ForgotPassword from './components/auth/ForgotPassword'
import ForgotPasswordVerification from './components/auth/ForgotPasswordVerification'
import Welcome from './components/auth/Welcome'

const REGION = 'us-east-2';

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: REGION,
    userPoolId: "us-east-2_ps232HgJK",
    userPoolWebClientId: "4lar9itoqvck6m8i4spn6kmceq"
  }
})

const browserHistory = createBrowserHistory()

let isAuthenticated = false
let user = ""

const auth = {  
  setAuthStatus: authenticated => {
    isAuthenticated = authenticated
  },
  setUser:  _u => {
    user = _u
  },
  getUser: () => {
    return user
  },
  isAuthenticated: () => {
    return isAuthenticated
  }
}

const renderRoutes = () => (
  <I18nextProvider i18n={i18n}>
    <Router history={browserHistory}>
      <Switch>
        <Route exact path="/" component={renderApp}/>
        <Route exact path="/decrire-oeuvre" component={AssistantOeuvre}/>
        <Route exact path="/liste-oeuvres" component={ListeOeuvres} />
        <Route exact path="/login" onRef={auth} component={renderLogin} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <Route exact path="/forgot-password-verification" component={ForgotPasswordVerification} />
        <Route exact path="/welcome" component={Welcome} />
        <Route exact path="/approuver-proposition/:propositionId" component={ApprouverSplit} />
        <Route exact path="/proposition/vote/:jeton" component={VoterSplit} />
        <Route exact path="/proposition/confirmer-courriel" component={ConfirmerCourriel} />
        <Route exact path="/accueil" component={Accueil} />
        <Route exact path="/visualisation/beignet" component={Beignet} />
        <Route exact path="/bonjournat" component={Bonjour} />
      </Switch>
    </Router>
  </I18nextProvider>  
)

function Bonjour(){return(<div><h1>Bonjour Nat</h1></div>)}

function Accueil() {
  return(
    <TableauDeBord />
  )
}

function ConfirmerCourriel() {

  setTimeout(()=>{
    window.location.href="/"
  },3000)

  return (
    <div>
      <h1>Un courriel va arriver sous peu afin que tu puisses voter</h1>
    </div>
  )
}

function renderApp() {
  return (<App auth={auth} />)
}

function renderLogin() {
  return (<Login auth={auth} />)
}

function VoterSplit(match) {

  let jeton
  
  if(match.match.params) {
    jeton = match.match.params.jeton
  }

  return (
    <VotationSplit auth={auth} jeton={jeton} />
  )

}

function ApprouverSplit({match}) {
  let propositionId = match.params.propositionId

  return (
    <ValiderSplit proposition={propositionId} />
  )
}

// Configuration des alertes utilisateur
toast.configure({
  autoClose: 8000,
  draggable: true
})

ReactDOM.render( renderRoutes(), document.getElementById('root') )