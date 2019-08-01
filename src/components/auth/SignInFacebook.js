import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
// To federated sign in from Facebook
class SignInFacebook extends Component {
    constructor(props) {
        super(props);
        this.signIn = this.signIn.bind(this);
    }

    componentDidMount() {
        if (!window.FB) this.createScript();
    }

    signIn() {
        const fb = window.FB;
        fb.getLoginStatus(response => {
            if (response.status === 'connected') {
                this.getAWSCredentials(response.authResponse);
            } else {
                fb.login(
                    response => {
                        if (!response || !response.authResponse) {
                            return;
                        }
                        this.getAWSCredentials(response.authResponse);
                    },
                    {
                        // the authorized scopes
                        scope: 'public_profile,email'
                    }
                );
            }
        });
    }

    getAWSCredentials(response) {
            const { accessToken, expiresIn } = response;
            const date = new Date();
            const expires_at = expiresIn * 1000 + date.getTime();
            if (!accessToken) {
                return;
            }

            const fb = window.FB;
            fb.api('/me', { fields: 'name,email' }, response => {
                const user = {
                    name: response.name,
                    email: response.email
                };
                
                Auth.federatedSignIn('facebook', { token: accessToken, expires_at }, user)
                .then(credentials => {
                    console.log(credentials);
                });
            });
        }

    createScript() {
        // load the sdk
        window.fbAsyncInit = this.fbAsyncInit;
        const script = document.createElement('script');
        script.src = 'https://connect.facebook.net/en_US/sdk.js';
        script.async = true;
        script.onload = this.initFB;
        document.body.appendChild(script);
    }

    initFB() {
        const fb = window.FB;
        console.log('FB SDK inited');
    }

    fbAsyncInit() {
        // init the fb sdk client
        const fb = window.FB;
        fb.init({
            appId   : '691770771275677',
            cookie  : true,
            xfbml   : true,
            version : 'v2.11'
        });
    }

    render() {
        return (
            <div>
                <button id="facebook" onClick={this.signIn}><i className="facebook icon white"></i>Sign in with Facebook</button>
            </div>
        );
    }
}

export default SignInFacebook;
