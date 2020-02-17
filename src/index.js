import { journal, AyantsDroit } from './utils/application'
import "semantic-ui-css/semantic.min.css";
import "./index.css";
import "./assets/scss/_colors.scss"
import "./assets/scss/_typography.scss"
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import React, { Suspense } from "react"
import ReactDOM from "react-dom"
import i18n from "./utils/i18n"
import { I18nextProvider } from "react-i18next"
import { Route, Router, Switch } from "react-router"
import { createBrowserHistory } from "history"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "./components/app/app.css"
import AssistantOeuvre from "./components/oeuvre/assistant-oeuvre"
import ListeOeuvres from "./components/media/media-list"
import ValiderSplit from "./components/split/assistant-split"
import VotationSplit from "./components/split/votation-split"
import VotationPartTiers from "./components/partage/votation-part-tiers"
import AssistantPartage from "./components/partage/assistant-partage"
import TableauDeBord from "./components/tableaudebord/tableaudebord"
import Login from "./components/auth/Login"
import Register from "./components/auth/Register"
import ModifyUser from "./components/auth/ModifyUser"
import Socan from "./components/auth/Socan"
import Declaration from "./components/auth/Declaration"
import ForgotPassword from "./components/auth/ForgotPassword"
import ForgotPasswordVerification from "./components/auth/ForgotPasswordVerification"
import ChangePasswordVerification from "./components/auth/ChangePasswordVerification"
import ChoosePasswordVerification from "./components/auth/ChoosePasswordVerification"
import SignInFacebook from "./components/auth/SignInFacebook"
import SignInGoogle from "./components/auth/SignInGoogle"
import SommairePartages from "./components/partage/sommaire-partages"
import SommairePartage from "./components/partage/partage-sommaire"
import SommaireOeuvre from "./components/oeuvre/oeuvre-sommaire"
import AssistantPartageEditeur from "./components/partage/assistant-partage-editeur"
import OeuvreResume from "./components/oeuvre/oeuvre-resume"
import "moment/locale/fr"
import "moment/locale/en-ca"
import EditerOeuvre from "./components/oeuvre/editer-oeuvre"
import EditerPartage from './components/partage/editer-partage'
import queryString from 'query-string'

const NOM = "index.js"
const browserHistory = createBrowserHistory();

const renderRoutes = () => {
  let routage
  if (window.location.href.includes("pochette.info")) {  
    window.document.title = "Pochette.info"
    routage = (
      <I18nextProvider i18n={i18n}>
        <Router history={browserHistory}>
          <Switch>
            <Route exact path="/" component={AccueilPochette} />
            <Route exact path="/accueil" component={AccueilPochette} />
            <Route exact path="/documenter/:mediaId" component={DocumenterPochette} />
            <Route exact path="/editer/:mediaId/:pageNo" component={EditerPochette} />
            <Route exact path="/editer/:mediaId/:pageNo/:jeton" component={EditerPochetteAvecJeton} />
            <Route exact path="/oeuvre/:mediaId/resume" component={ResumePochette} />
            <Route exact path="/oeuvre/resume/:jeton" component={ResumePochetteAvecJeton} />
            <Route exact path="*" component={AccueilPochette} />            
          </Switch>
        </Router>
      </I18nextProvider>
    );
  } else {
    window.document.title = "Smartsplit"
    routage = (
      <I18nextProvider i18n={i18n}>
        <Router history={browserHistory}>
          <Switch>
            <Route exact path="/accueil" component={Accueil} />
            <Route exact path="/" component={Accueil} />
            <Route exact path="/documenter/:mediaId" component={Documenter} />
            <Route exact path="/editer-partage/:uuid/:pageNo" component={EditionPartage} />
            <Route exact path="/editer/:mediaId/:pageNo" component={Editer} />
            <Route exact path="/editer/:mediaId/:pageNo/:jeton" component={EditerAvecJeton} />
            <Route exact path="/decrire-oeuvre" component={AssistantOeuvre} />
            <Route exact path="/liste-oeuvres" component={ListeOeuvres} />
            <Route exact path="/login" component={renderLogin} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/modify-user" component={ModifyUser} />
            <Route exact path="/declaration" component={Declaration} />
            <Route exact path="/socan" component={Socan} />
            <Route exact path="/sign-in-facebook" component={SignInFacebook} />
            <Route exact path="/sign-in-google" component={SignInGoogle} />
            <Route exact path="/forgot-password" component={ForgotPassword} />
            <Route exact path="/choose-password" component={ChoosePasswordVerification} />
            <Route exact path="/forgot-password-verification" component={DefinitMotDePasse} />
            <Route exact path="/change-password-verification" component={ChangePasswordVerification} />            
            <Route exact path="/proposition/approuver/:propositionId" component={ApprouverSplit} />
            <Route exact path="/proposition/vote/:jeton" component={VoterSplit} />
            <Route exact path="/proposition/confirmer-courriel" component={ConfirmerCourriel} />
            <Route exact path="/proposition/sommaire/:uuid" component={SommaireProposition} />
            <Route exact path="/accueil" component={Accueil} />        
            <Route exact path="/partager/:mediaId" component={PartagesOeuvres} />
            <Route exact path="/partager/editeur/:mediaId" component={PartagesOeuvresEditeur} />
            <Route exact path="/partager/:mediaId/envoyer" component={PartagesOeuvresEnvoyer} />
            <Route exact path="/partager/nouveau/:mediaId" component={NouveauPartage} />
            <Route exact path="/partager/existant/:uuid" component={ContinuerProposition} />
            <Route exact path="/partage-editeur/:propositionId" component={PartageEditeur} />
            <Route exact path="/oeuvre/sommaire/:mediaId" component={sommaireOeuvre} />
            <Route exact path="/oeuvre/:mediaId/resume" component={Resume} />
            <Route exact path="/oeuvre/resume/:jeton" component={ResumeAvecJeton} />
            <Route exact path="/partage/editeur/vote/:jeton" component={VoterPartTiers} />          
          </Switch>
        </Router>
      </I18nextProvider>
    )
  }

  return (
    <Suspense fallback={<Loader
      type="Circles"
      color="#00BFFF"
      width={800}
      height={800}
    />}>
      {routage}
    </Suspense>
  )
}

const ResumeAvecJeton = match => {
  let jeton = match.match.params.jeton
  return (
    <OeuvreResume jeton={jeton} />
  )
}

const ResumePochetteAvecJeton = match => {
  let jeton = match.match.params.jeton
  return (
    <OeuvreResume jeton={jeton} pochette={true} />
  )
}

const EditerPochette = (match) => {
  let mediaId = match.match.params.mediaId
  let pageNo = match.match.params.pageNo
  return (
    <EditerOeuvre mediaId={mediaId} pochette={true} pageNo={pageNo} />
  )
}

const EditerPochetteAvecJeton = (match) => {
  let mediaId = match.match.params.mediaId
  let pageNo = match.match.params.pageNo
  let jeton = match.match.params.jeton
  return (
    <EditerOeuvre mediaId={mediaId} pochette={true} pageNo={pageNo} jeton={jeton} />
  )
}

const EditionPartage = (match) => {
  let uuid = match.match.params.uuid
  let pageNo = match.match.params.pageNo
  return (
    <EditerPartage uuid={uuid} pageNo={pageNo} />
  )
}

const Editer = (match) => {
  let mediaId = match.match.params.mediaId
  let pageNo = match.match.params.pageNo
  return (
    <EditerOeuvre mediaId={mediaId} pochette={false} pageNo={pageNo} />
  )
}

const EditerAvecJeton = (match) => {
  let mediaId = match.match.params.mediaId
  let pageNo = match.match.params.pageNo
  let jeton = match.match.params.jeton
  return (
    <EditerOeuvre mediaId={mediaId} pochette={false} pageNo={pageNo} jeton={jeton} />
  )
}

const Resume = (match) => {
  let mediaId = match.match.params.mediaId
  return (
    <OeuvreResume mediaId={mediaId} />
  )
}

const ResumePochette = (match) => {
  let mediaId = match.match.params.mediaId;
  return (
    <OeuvreResume mediaId={mediaId} pochette={true} />
  )
}

const DefinitMotDePasse = ({match, location}) => {
  
  let search = location.search

  let params = search.substring(1, search.length)
  let _p = params.split("&")

  let _params = {}

  _p.forEach(__p=>{
    let ___p = __p.split("=")
    _params[___p[0]] = ___p[1]
  })

  let code = _params['confirmation_code']
  let email = _params['email']

  return <ForgotPasswordVerification code={code} email={email} />
}

function AccueilPochette() {
  return <TableauDeBord pochette={true} />
}

function ContinuerProposition(match) {
  let uuid = match.match.params.uuid;
  return <AssistantPartage uuid={uuid} />;
}

function NouveauPartage(match) {
  let mediaId = match.match.params.mediaId;
  return <AssistantPartage mediaId={mediaId} />;
}

function PartageEditeur(match) {
  let propositionId = match.match.params.propositionId;
  return <AssistantPartageEditeur propositionId={propositionId} />;
}

function Documenter(match) {
  let mediaId = match.match.params.mediaId;
  return <AssistantOeuvre mediaId={mediaId} />;
}

function DocumenterPochette(match) {
  let mediaId = match.match.params.mediaId;
  return <AssistantOeuvre mediaId={mediaId} pochette={true} />;
}

function sommaireOeuvre(match) {
  let mediaId = match.match.params.mediaId;  
  let vals = queryString.parse(match.location.search)
  return <SommaireOeuvre mediaId={mediaId} invitations={vals && vals.i} />;
}

function SommaireProposition(match) {
  let uuid = match.match.params.uuid;
  return <SommairePartage uuid={uuid} />;
}

function PartagesOeuvres(match) {
  let mediaId = match.match.params.mediaId;
  return (
    <SommairePartages mediaId={mediaId} />
  )
}

function PartagesOeuvresEditeur(match) {
  let mediaId = match.match.params.mediaId;
  return (
    <SommairePartages mediaId={mediaId} editeur />
  )
}

function PartagesOeuvresEnvoyer(match) {
  let mediaId = match.match.params.mediaId;
  return (
    <SommairePartages mediaId={mediaId} envoyer={true} />
  )
}

function Accueil() {
  return <TableauDeBord />;
}

function ConfirmerCourriel() {
  setTimeout(() => {
    window.location.href = "/";
  }, 3000);

  return (
    <div>
      <h1>Un courriel va arriver sous peu afin que tu puisses voter</h1>
    </div>
  );
}

function renderLogin() {
  return <Login />;
}

function VoterPartTiers(match) {
  let jeton;

  if (match.match.params) {
    jeton = match.match.params.jeton;
  }

  return <VotationPartTiers jeton={jeton} />;
}

function VoterSplit(match) {
  let jeton;

  if (match.match.params) {
    jeton = match.match.params.jeton;
  }

  return <VotationSplit jeton={jeton} />;
}

function ApprouverSplit({ match }) {
  let propositionId = match.params.propositionId;

  return <ValiderSplit proposition={propositionId} />;
}

// Configuration des alertes utilisateur
toast.configure({
  autoClose: 3500,
  draggable: true,
  position: toast.POSITION.TOP_CENTER
});

// Affichage quand le chargement est complété
let cpt = 0
function renduLorsqueApplicationEstPrete() {  
  if(AyantsDroit.ayantsDroit) {
    cpt++
    journal.silly(NOM, `Application prête en ${cpt / 1000} secondes`)
    ReactDOM.render(renderRoutes(), document.getElementById("root"))
  } else {
    setTimeout( ()=>renduLorsqueApplicationEstPrete(), 10)
  }
}
renduLorsqueApplicationEstPrete()