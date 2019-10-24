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
    super(props)
    this.state = {
      isOpen: props.isOpen,
      opened: TYPE_LOGIN,
      parent: props.parent
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isOpen !== nextProps.isOpen) {
      this.setState({ isOpen: nextProps.isOpen })
    }
  }

  afficher(type) {
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
                  // Vérifier si le profil est complet, si non,
                  // Débloque la composante appelante
                  this.state.parent.setState({ user: res })

                  if(this.props.fn) {
                    this.props.fn()
                  }

                  // Fermer la modale
                  this.setState({ isOpen: false })
                })
                .catch(err => {
                  toast.error(err.message)
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
