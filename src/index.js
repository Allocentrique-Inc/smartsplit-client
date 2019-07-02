import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/app/app'
import 'semantic-ui-css/semantic.min.css'
import './index.css'

// Amplify + Auth
import Route53 from 'aws-sdk/clients/route53';
import Amplify, { Auth } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';
import awsParamStore from 'aws-param-store';
import AWS from 'aws-sdk';
import utils from './utils/utils';
import config from "./config";


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
import Welcome from './components/auth/Welcome';
import { ConsoleLogger } from '@aws-amplify/core';


// *******************************************************************************************************
// 1. UTILs method with Secrets Manager
// *******************************************************************************************************

// Get SSM Parametors
// const REGION = 'us-east-2';
// AWS.config.update({
//   region: REGION,
//   accessKeyId: utils.getParameter('ACCESS_KEY'),
//   secretAccessKey: utils.getParameter('SECRET_ACCESS_KEY')
// });

// // Load the AWS SDK
// let secretName = "smartsplit/cognito",
//     secret,
//     decodedBinarySecret;

// // Create a Secrets Manager client
// let client = new AWS.SecretsManager({
//     region: REGION
// });

// // 'GetSecretValue' API.
// client.getSecretValue({SecretId: secretName}, function(err, data) {
//     if (err) {
//         if (err.code === 'DecryptionFailureException')
//             // Secrets Manager can't decrypt the protected secret text using the provided KMS key.
//             throw err;
//         else if (err.code === 'InternalServiceErrorException')
//             // An error occurred on the server side.
//             throw err;
//         else if (err.code === 'InvalidParameterException')
//             // You provided an invalid value for a parameter.
//             throw err;
//         else if (err.code === 'InvalidRequestException')
//             // You provided a parameter value that is not valid for the current state of the resource.
//             throw err;
//         else if (err.code === 'ResourceNotFoundException')
//             // We can't find the resource that you asked for.
//             throw err;
//         else 
//             throw err;
//     }
//     else {
//         // Decrypts secret using the associated KMS CMK.
//         if ('SecretString' in data) {
//             secret = JSON.parse(data.SecretString);
//             AWS.config.update({region: REGION, accessKeyId: secret.ACCESS_KEY, secretAccessKey: secret.SECRET_ACCESS_KEY});
//             Amplify.configure({
//               Auth: {
//                 mandatorySignIn: true,
//                 region: REGION,
//                 userPoolId: secret.USER_POOL_ID,
//                 userPoolWebClientId: secret.APP_CLIENT_ID
//               }
//             });
//         } else {
//             let buff = new Buffer(data.SecretBinary, 'base64');
//             decodedBinarySecret = buff.toString('ascii');
//             console.log(decodedBinarySecret);
//         }
//     }  
// });
// *******************************************************************************************************



// *******************************************************************************************************
// 2. Callback SSM getParameters method with System Manager
// *******************************************************************************************************

// AWS.config.loadFromPath('./~aws/credentials'); 
// AWS_SDK_LOAD_CONFIG=1

// let REGION = 'us-east-2';
// AWS.config.update({region: REGION});

// const   ssm = new AWS.SSM()

// getParameterFromSSM("ACCESS_KEY", (_accessKey)=>{
//   console.log(`Une clé d'accès est récupérée`)
//   getParameterFromSSM("SECRET_ACCESS_KEY", (_secretKey)=>{
//       // if(_secretKey !== '') {
//       //     console.log(`Un secret est récupéré`, _accessKey, _secretKey)
//       // }
//       getParameterFromSSM("USER_POOL_ID", (_userPoolId)=>{
//           getParameterFromSSM("APP_CLIENT_ID", (_appClientId)=>{
//             console.log(_accessKey, _secretKey, _userPoolId, _appClientId);
//             AWS.config.update({region: 'us-east-2', accessKeyId: _accessKey, secretAccessKey: _secretKey, userPoolId: _userPoolId, userPoolWebClientId: _appClientId});
//             // Amplify.configure({
//             //   Auth: {
//             //     mandatorySignIn: true,
//             //     region: 'us-east-2',
//             //     userPoolId: _userPoolId,
//             //     userPoolWebClientId: _appClientId
//             //   }
//             // });
//           })
//       })
//   })
// })

// // Fonction de récupération du paramètre par SSN
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


// *******************************************************************************************************



// *******************************************************************************************************
// 3. Route53 method
// *******************************************************************************************************

// Auth.currentCredentials()
//   .then(credentials => {

//     const route53 = new Route53({
//       apiVersion: '2013-04-01',
//       credentials: Auth.essentialCredentials(credentials)
//     });


//     // more code working with route53 object
//     // route53.changeResourceRecordSets();
//     // Amplify.configure({
//     //   Auth: {
//     //     mandatorySignIn: true,
//     //     region: REGION,
//     //     userPoolId: '',
//     //     userPoolWebClientId: '',
//     //     identityPoolId: ''
//     //   }
//     // });

//   })
// *******************************************************************************************************



// *******************************************************************************************************
// 4. aws-param-store module method
// *******************************************************************************************************

// awsParamStore.getParameters(['ACCESS_KEY', 'SECRET_ACCESS_KEY'] { region: REGION } )
// .then( (data) => {
//   console.log(data)
//   AWS.config.update({accessKeyId:data.Parameters[1].value, secretAccessKey: data.Parameters[2].value, region: REGION})
// });

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
// *******************************************************************************************************


// *******************************************************************************************************
// 5. Config file method
// *******************************************************************************************************
const REGION = 'us-east-2';

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID
  }
});


core_1.AWS.config.update({
  region: REGION,
  credentials: credentials
});

// *******************************************************************************************************

// *******************************************************************************************************
// 6. ssm params
// *******************************************************************************************************
// const { ssmToObjByPath } = require('ssm-params');

// // AWS.config.update({ region: 'us-east-2' });
// AWS.config.update({accessKeyId:config.api.ACCESS_KEY, secretAccessKey:config.api.SECRET_ACCESS_KEY, region: REGION})

// ssmToObjByPath({
//   Path: 'USER_POOL_ID',
//   nestObject: true,
// }, (err, obj) => {
//   if (err) {
//     throw err;
//   }

//   /*
//    * Result: {"baz":"hunter2"}
//    */
//   console.log("### Enable nestObject.\n%j", obj);
// });
// *******************************************************************************************************




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
          <Route exact path="/welcome" component={Welcome} />
        </Switch>
      </Router>
  </I18nextProvider>  
)

ReactDOM.render( renderRoutes(), document.getElementById('root') )