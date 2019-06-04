import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/app/app'
import 'semantic-ui-css/semantic.min.css'
import './index.css'

// Routeur applicatif
import { Router, Route, Switch } from 'react-router'
import { createBrowserHistory } from 'history'

// Composantes navigables
import AssistantOeuvreEmbarquement from './components/oeuvre/oeuvre-assistant-embarquement'
import AssistantOeuvreDescription from './components/oeuvre/oeuvre-assistant-description'

const browserHistory = createBrowserHistory()

const renderRoutes = () => (
  <Router history={browserHistory}>
    <Switch>
      <Route exact path="/" component={App}/>
      <Route exact path="/nouvelle-oeuvre" component={AssistantOeuvreEmbarquement}/>
      <Route exact path="/decrire-oeuvre" component={AssistantOeuvreDescription}/>
    </Switch>
  </Router>
);

ReactDOM.render( renderRoutes(), document.getElementById('root') )