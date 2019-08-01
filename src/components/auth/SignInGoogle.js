import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
// To federated sign in from Google
class SignInGoogle extends Component {
    // constructor(props) {
    //     super(props);
    //     this.signIn = this.signIn.bind(this);
    // }

    // componentDidMount() {
    //     const ga = window.gapi && window.gapi.auth2 ? 
    //         window.gapi.auth2.getAuthInstance() : 
    //         null;
    //     if (!ga) this.createScript();
    // }

    // signIn() {
    //     const ga = window.gapi.auth2.getAuthInstance();
    //     ga.signIn().then(
    //         googleUser => {
    //             this.getAWSCredentials(googleUser);
    //         },
    //         error => {
    //             console.log(error);
    //         }
    //     );
    // }

    // async getAWSCredentials(googleUser) {
    //     const { id_token, expires_at } = googleUser.getAuthResponse();
    //     const profile = googleUser.getBasicProfile();
    //     let user = {
    //         email: profile.getEmail(),
    //         name: profile.getName()
    //     };
        
    //     const credentials = await Auth.federatedSignIn(
    //         'google',
    //         { token: id_token, expires_at },
    //         user
    //     );
    //     console.log('credentials', credentials);
    // }

    // createScript() {
    //     // load the Google SDK
    //     const script = document.createElement('script');
    //     script.src = 'https://apis.google.com/js/platform.js';
    //     script.async = true;
    //     script.onload = this.initGapi;
    //     document.body.appendChild(script);
    // }

    // initGapi() {
    //     // init the Google SDK client
    //     const g = window.gapi;
    //     g.load('auth2', function() {
    //         g.auth2.init({
    //             client_id: '682431972735-4an6o3qlsb0rv538fbihnm0ajuodjs42.apps.googleusercontent.com',
    //             // authorized scopes
    //             scope: 'profile email openid'
    //         });
    //     });
    // }

    render() {
        return (
            // <div>
            //     <button id="google" onClick={this.signIn}><i className="google icon white google-login"></i>Sign in with Google</button>
            // </div>
            <div>
                <button id="google" ><i className="google icon white google-login"></i>Sign in with Google</button>
            </div>
        );
    }
}

export default SignInGoogle;
