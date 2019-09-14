import React from 'react'
import ReactDOM from 'react-dom'
import 'semantic-ui-css/semantic.min.css'
import './index.css'

// Amplify + Auth
import Amplify from 'aws-amplify';

// Traduction
import i18n from './utils/i18n' //Module React (dans dossier modules). npm install
import { I18nextProvider, Translation } from "react-i18next"

// Routeur applicatif
import { Router, Route, Switch } from 'react-router'
import { createBrowserHistory } from 'history'

// Alertes utlisateur
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Composantes navigables
import App from './components/app/app'
import AssistantOeuvre from './components/oeuvre/assistant-oeuvre'
import ListeOeuvres from './components/media/media-list'
import ValiderSplit from './components/split/assistant-split'
import VotationSplit from './components/split/votation-split'
import VotationPartTiers from './components/partage/votation-part-tiers'
import AssistantPartage from './components/partage/assistant-partage'

// Tableau de bord
import TableauDeBord from './components/tableaudebord/tableaudebord'
import Beignet from './components/visualisation/partage/beignet'
import Histogramme from './components/visualisation/partage/histogramme'
import Troissplits from './components/visualisation/partage/troissplits'

// Composantes auth
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Register2 from './components/auth/Register-2'
import Register3 from './components/auth/Register-3'
import ForgotPassword from './components/auth/ForgotPassword'
import ForgotPasswordVerification from './components/auth/ForgotPasswordVerification'
import ChangePasswordVerification from './components/auth/ChangePasswordVerification'
import Welcome from './components/auth/Welcome'
import SignInFacebook from './components/auth/SignInFacebook'
import SignInGoogle from './components/auth/SignInGoogle'

// Sommaires
import SommairePartages from './components/partage/sommaire-partages' // Plusieurs partages (liste de un partage)
import SommairePartage from './components/partage/partage-sommaire'  // Un partage
import SommaireOeuvre from './components/oeuvre/oeuvre-sommaire'
import AssistantPartageEditeur from './components/partage/assistant-partage-editeur';
import OeuvreResume from "./components/oeuvre/oeuvre-resume";

const REGION = 'us-east-2';

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: REGION,
    userPoolId: "us-east-2_tK9rNdAB1",
    userPoolWebClientId: "385f0k2qiibs5bq4od9uoeipvi"
  }
})

const browserHistory = createBrowserHistory()

const renderRoutes = () => {

  if(window.location.href.includes('pochette.info')) {
    return (
      <I18nextProvider i18n={i18n}>
        <Router history={browserHistory}>
          <Switch>
            <Route path="*" component={AccueilPochette}/>            
          </Switch>
        </Router>
      </I18nextProvider>  
    )
  } else {
    return (
      <I18nextProvider i18n={i18n}>
        <Router history={browserHistory}>
          <Switch>
            <Route exact path="/" component={Accueil}/>
            <Route exact path="/documenter/:titre" component={Documenter}/>
            <Route exact path="/decrire-oeuvre" component={AssistantOeuvre}/>
            <Route exact path="/liste-oeuvres" component={ListeOeuvres} />
            <Route exact path="/login" component={renderLogin} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/register-2" component={Register2} />
            <Route exact path="/register-3" component={Register3} />
            <Route exact path="/sign-in-facebook" component={SignInFacebook} />
            <Route exact path="/sign-in-google" component={SignInGoogle} />
            <Route exact path="/forgot-password" component={ForgotPassword} />
            <Route exact path="/forgot-password-verification" component={ForgotPasswordVerification} />
            <Route exact path="/change-password-verification" component={ChangePasswordVerification} />
            <Route exact path="/welcome" component={Welcome} />
            <Route exact path="/proposition/approuver/:propositionId" component={ApprouverSplit} />
            <Route exact path="/proposition/vote/:jeton" component={VoterSplit} />
            <Route exact path="/proposition/confirmer-courriel" component={ConfirmerCourriel} />
            <Route exact path="/proposition/sommaire/:uuid" component={SommaireProposition} />
            <Route exact path="/accueil" component={Accueil} />
            <Route exact path="/visualisation/beignet" component={Beignet} />
            <Route exact path="/visualisation/histogramme" component={Histogramme} />
            <Route exact path="/visualisation/troissplits" component={Troissplits} />
            <Route exact path="/partager/:mediaId" component={PartagesOeuvres} />
            <Route exact path="/partager/nouveau/:mediaId" component={NouveauPartage} />
            <Route exact path="/partager/existant/:uuid" component={ContinuerProposition} />
            <Route exact path="/partage-editeur/:propositionId" component={PartageEditeur} />
            <Route exact path="/oeuvre/sommaire/:mediaId" component={sommaireOeuvre} />
            <Route exact path="/oeuvre/resume" component={OeuvreResume} />
            <Route exact path="/partage/editeur/vote/:jeton" component={VoterPartTiers} />
          </Switch>
        </Router>
      </I18nextProvider>  
    )
  }
}

function AccueilPochette() {
  return (<AssistantOeuvre pochette={true} />)
}

function ContinuerProposition(match) {
  let uuid = match.match.params.uuid
  return (<AssistantPartage uuid={uuid} />)
}

function NouveauPartage(match) {
  let mediaId = match.match.params.mediaId  
  return (<AssistantPartage mediaId={mediaId} />)
}

function PartageEditeur(match) {
  let propositionId = match.match.params.propositionId
  return (<AssistantPartageEditeur propositionId={propositionId} />)
}

function Documenter(match) {
  let titre = match.match.params.titre
  return (<AssistantOeuvre titre={titre} />)
}

function sommaireOeuvre(match) {
  let mediaId = match.match.params.mediaId
  return (<SommaireOeuvre mediaId={mediaId} />)
}

function SommaireProposition(match) {
  let uuid = match.match.params.uuid
  return (<SommairePartage uuid={uuid} />)
}

function PartagesOeuvres(match) {
  let mediaId = match.match.params.mediaId
  return (
    <Translation>
      {
        (t, i18n) =>
          <SommairePartages i18n={i18n} mediaId={mediaId} />
      }
    </Translation>    
  )  
}

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

function renderLogin() {
  return (<Login />)
}

function VoterPartTiers (match) {
  let jeton
  
  if(match.match.params) {
    jeton = match.match.params.jeton
  }

  return (
    <VotationPartTiers jeton={jeton} />
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
  let propositionId = match.params.propositionId

  return (
    <ValiderSplit proposition={propositionId} />
  )
}

// Configuration des alertes utilisateur
toast.configure({
  autoClose: 8000,
  draggable: true,
})

ReactDOM.render( renderRoutes(), document.getElementById('root') )
