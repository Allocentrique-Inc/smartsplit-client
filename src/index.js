import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/app/app'
import 'semantic-ui-css/semantic.min.css'
import './index.css'

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

const browserHistory = createBrowserHistory()

const renderRoutes = () => (
  <I18nextProvider i18n={i18n}>
    <Router history={browserHistory}>
      <Switch>
        <Route exact path="/" component={App}/>
        <Route exact path="/decrire-oeuvre" component={AssistantOeuvre}/>
        <Route exact path="/liste-oeuvres" component={ListeOeuvres} />
        <Route exact path="/approuver-split/:mediaId" component={ApprouverSplit} />
        <Route exact path="/split/voter/:jeton" component={VoterSplit} />
        <Route exact path="/split/confirmer-courriel" component={ConfirmerCourriel} />
      </Switch>
    </Router>
  </I18nextProvider>  
)

function ConfirmerCourriel() {
  return (
    <div>
      <h1>Un courriel va arriver sous peu afin que tu puisses voter</h1>
    </div>
  )
}

function VoterSplit(match) {

  let jeton
  
  if(match.match.params) {
    jeton = match.match.params.jeton
  }

  return (
    <VotationSplit jeton={jeton} />
  )

}

function ApprouverSplit({match}) {
  let mediaId = match.params.mediaId

  // Cursus de test
  let split = require(`./assets/tests/${mediaId}`)

  return (
    <ValiderSplit split={split} />
  )
}

// Configuration des alertes utilisateur
toast.configure({
  autoClose: 8000,
  draggable: true
})

ReactDOM.render( renderRoutes(), document.getElementById('root') )