import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/app/app'
import 'semantic-ui-css/semantic.min.css'
import './index.css'
import Amplify from 'aws-amplify';
import awsParamStore from 'aws-param-store';
import AWS from 'aws-sdk';

// Traduction
import i18n from './utils/i18n'
import { I18nextProvider } from "react-i18next"

// Routeur applicatif
import { Router, Route, Switch } from 'react-router'
import { createBrowserHistory } from 'history'

// Composantes navigables
import AssistantOeuvreEmbarquement from './components/oeuvre/oeuvre-assistant-embarquement'
import AssistantOeuvre from './components/oeuvre/assistant-oeuvre'
import TestCreerOeuvre from './components/media/media-create'
import ListeOeuvres from './components/media/media-list'

// Composantes auth
import Navbar from './components/app/navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ForgotPassword from './components/auth/ForgotPassword';
import ForgotPasswordVerification from './components/auth/ForgotPasswordVerification';
import ChangePassword from './components/auth/ChangePassword';
import ChangePasswordConfirm from './components/auth/ChangePasswordConfirm';
import Welcome from './components/auth/Welcome';

// Get SSM Parametors
const REGION = 'us-east-2';
AWS.config.update({region: REGION})

awsParamStore.getParameters(['USER_POOL_ID', 'APP_CLIENT_ID'], { region: REGION } )
.then( (data) => {
  AWS.config.update({accessKeyId:process.env.REACT_APP_ACCESS_KEY, secretAccessKey:process.env.REACT_APP_SECRET_ACCESS_KEY, region: REGION})

  Amplify.configure({
    Auth: {
      mandatorySignIn: true,
      region: REGION,
      userPoolId: data.Parameters[1].Value,
      userPoolWebClientId: data.Parameters[0].Value
    }
  });
});

// const ssm = new AWS.SSM()

// function getParameterFromSSM(param, cb) {
    
//   let _p = {
//       Name: param,
//       WithDecryption: false
//   };
//   ssm.getParameter(_p, function(err, data) {
//       if (err) {
//           console.log(err, err.stack)
//       } else {
//           cb(data.Parameter.Value)
//       }        
//   });
// }

// getParameterFromSSM("ACCESS_KEY", (_accessKey)=>{
//   AWS.config.update({accessKeyId: _accessKey})
//   let accessKey = _accessKey;
//   getParameterFromSSM("SECRET_ACCESS_KEY", (_secretKey)=>{
//       AWS.config.update({secretAccessKey: _secretKey})

//       // awsParamStore.getParameters(['SECRET_ACCESS_KEY', 'ACCESS_KEY'], { region: REGION } )
//       // .then( (data) => {
//       //   let KEY = data.Parameters[0].Value;
//       //   let SECRET = data.Parameters[1].Value;
//       //   AWS.config.update({accessKeyId:KEY, secretAccessKey:SECRET, region: REGION})
//       // });

//       AWS.config.update({accessKeyId:process.env.ACCESS_KEY, secretAccessKey:process.env.SECRET_ACCESS_KEY, region: REGION})

//       awsParamStore.getParameters(['USER_POOL_ID', 'APP_CLIENT_ID'], { region: REGION } )
//       .then( (data) => {
//         Amplify.configure({
//           Auth: {
//             mandatorySignIn: true,
//             region: REGION,
//             userPoolId: data.Parameters[1].Value,
//             userPoolWebClientId: data.Parameters[0].Value
//           }
//         });
//       });

//   })
// })

const browserHistory = createBrowserHistory()

const renderRoutes = () => (
  <I18nextProvider i18n={i18n}>
    <Router history={browserHistory}>
        {/* <Navbar auth={authProps} /> */}
        <Switch>
          <Route exact path="/" component={App}/>
          <Route exact path="/nouvelle-oeuvre" component={AssistantOeuvreEmbarquement}/>
          <Route exact path="/decrire-oeuvre" component={AssistantOeuvre}/>
          <Route exact path="/liste-oeuvres" component={ListeOeuvres} />
          <Route exact path="/test-ajout-oeuvre" component={TestCreerOeuvre} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/forgot-password" component={ForgotPassword} />
          <Route exact path="/forgot-password-verification" component={ForgotPasswordVerification} />
          <Route exact path="/change-password" component={ChangePassword} />
          <Route exact path="/change-password-confirmation" component={ChangePasswordConfirm} />
          <Route exact path="/welcome" component={Welcome} />
        </Switch>
      </Router>
  </I18nextProvider>  
)

ReactDOM.render( renderRoutes(), document.getElementById('root') )