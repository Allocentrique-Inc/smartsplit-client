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

// Utilitaires
import GenerateurJeton from './utils/generateur-jetons'

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
      </Switch>
    </Router>
  </I18nextProvider>  
)

function VoterSplit(match) {
  let jeton = match.params.jeton

  // Récupérer le splitId et le rightHolderId associé au jeton
  // depuis le distributeur de jeton

  let generateurJeton = new GenerateurJeton()

  try {
    let capsule = generateurJeton.decoder(jeton)

    return (
      <VotationSplit splitId={capsule.splitId} rightHolder={capsule.rightHolderId} />
    )

  } catch (err) {
    return (
      <div>
        Oupppssse ! Erreur de jeton de sécurité ! 
        {JSON.stringify(err)}
      </div>
    )
  }  

}

function ApprouverSplit({match}) {
  let mediaId = match.params.mediaId
  let split = null

  // Cas de test
  if (mediaId === "1") {
    // Droits d'auteur, droit d'interprétation et droit d'enregistrement
    split = require('./assets/tests/1')
  } else if (mediaId === "2") {
    // Droit d'auteur seulement
    split = require('./assets/tests/2')
  }

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