import React, { Component } from "react";
import { Modal } from "semantic-ui-react";
import { toast } from "react-toastify";
import { Auth } from "aws-amplify";
import Login from "../auth/Login";
import Register from "./Register";
import ForgotPassword from "./ForgotPassword";
import ForgotPasswordVerification from "./ForgotPasswordVerification";
import ChangePasswordVerification from "./ChangePasswordVerification";

const TYPE_LOGIN = 0,
  TYPE_REGISTER = 1,
  TYPE_FORGOT = 2,
  TYPE_VERIFY = 3,
  TYPE_CHANGE = 4;

export default class ModaleConnexion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: props.isOpen,
      opened: TYPE_LOGIN,
      parent: props.parent
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isOpen === nextProps.isOpen) {
      this.setState({ isOpen: nextProps.isOpen });
    }
  }

  afficher(type) {
    console.log("Afficher", type);
    this.setState({ opened: type });
  }

  render() {
    return (
      <Modal
        open={this.state.isOpen}
        closeOnEscape={false}
        closeOnDimmerClick={false}
        onClose={this.props.close}
        size="small"
      >
        <br />
        <br />
        <br />
        {this.state.opened === TYPE_LOGIN && (
          <Login
            parent={this}
            fn={() => {
              Auth.currentAuthenticatedUser()
                .then(res => {
                  // // Vérifier si le profil est complet, si non,

                  // let EMAIL_FILTER_STRING = 'email = \"'+ res.attributes.email + '\"'
                  // let params = {
                  //   "AttributesToGet": ["email"],
                  //   "Filter": EMAIL_FILTER_STRING,
                  //   "Limit": 1,
                  //   "UserPoolId": USER_POOL_ID
                  // }
                  // COGNITO_CLIENT.listUsers(params, (err, data) => {
                  //   if (err) {
                  //       console.log(err);
                  //   }
                  //   else {
                  //     if (data.Users[0].UserStatus === "CONFIRMED") {
                  //       // If user is confirmed and has full profile
                  //       window.location.href = '/accueil'
                  //       // this.state.parent.setState({ user: res });
                  //     } else {
                  //       // If user is not confirmed
                  //       toast.error("Check your email to verify your account")
                  //       this.props.parent.afficher(TYPE_PROFILE)
                  //     }
                  //   }
                  // })
                  // // Débloque la composante appelante
                  this.state.parent.setState({ user: res });
                  // Fermer la modale
                  this.setState({ isOpen: false });
                })
                .catch(err => {
                  toast.error(err.message);
                });
            }}
          />
        )}
        {this.state.opened === TYPE_REGISTER && <Register parent={this} />}
        {this.state.opened === TYPE_VERIFY && (
          <ForgotPasswordVerification parent={this} />
        )}
        {this.state.opened === TYPE_CHANGE && (
          <ChangePasswordVerification parent={this} />
        )}
        {this.state.opened === TYPE_FORGOT && <ForgotPassword parent={this} />}
      </Modal>
    );
  }
}
