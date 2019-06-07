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

// Composantes navigables
import AssistantOeuvreEmbarquement from './components/oeuvre/oeuvre-assistant-embarquement'
import AssistantOeuvreDescription from './components/oeuvre/oeuvre-assistant-description'
import TestCreerOeuvre from './components/media/media-create'
import ListeOeuvres from './components/media/media-list'

const browserHistory = createBrowserHistory()

const renderRoutes = () => (
  <I18nextProvider i18n={i18n}>
    <Router history={browserHistory}>
        <Switch>
          <Route exact path="/" component={App}/>
          <Route exact path="/nouvelle-oeuvre" component={AssistantOeuvreEmbarquement}/>
          <Route exact path="/decrire-oeuvre" component={AssistantOeuvreDescription}/>
          <Route exact path="/liste-oeuvres" component={ListeOeuvres} />
          <Route exact path="/test-ajout-oeuvre" component={TestCreerOeuvre} />
        </Switch>
      </Router>
  </I18nextProvider>  
)

ReactDOM.render( renderRoutes(), document.getElementById('root') )