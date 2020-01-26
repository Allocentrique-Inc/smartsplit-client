import React, { Component } from 'react';

class SignInFacebook extends Component {
    render() {
        return (
            <div>
                <button id="facebook" onClick={this.signIn}><i className="facebook icon white"></i>Sign in with Facebook</button>
            </div>
        );
    }
}

export default SignInFacebook;
