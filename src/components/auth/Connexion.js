import React, { Component } from "react"
import { Modal } from "semantic-ui-react"
import Login from "../auth/Login"
import Register from "./Register"
import ForgotPassword from "./ForgotPassword"
import ForgotPasswordVerification from "./ForgotPasswordVerification"
import ChangePasswordVerification from "./ChangePasswordVerification"
import { withTranslation } from 'react-i18next'
import { Identite } from '../../utils/application'

const TYPE_LOGIN = 0,
  TYPE_REGISTER = 1,
  TYPE_FORGOT = 2,
  TYPE_VERIFY = 3,
  TYPE_CHANGE = 4;

class ModaleConnexion extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pochette: props.pochette,
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

    let pochette = this.state.pochette ? "pochette" : ""

    return (
      <Modal
        open={this.state.isOpen}
        closeOnEscape={false}
        closeOnDimmerClick={false}
        onClose={this.props.close}
        size="small"
      >
        {
          this.props.i18n.language && (
            <div className="ui row floated left">
              {
                this.props.i18n.language.substring(0, 2) === "en" && (
                  <div className={`ui medium button ${pochette}`} onClick={() => { this.props.i18n.init({ lng: "fr" }) }} >
                    FR
                  </div>
                )
              }
              {
                this.props.i18n.language.substring(0, 2) === "fr" && (
                  <div className={`ui medium button ${pochette}`} onClick={() => { this.props.i18n.init({ lng: "en" }) }} >
                    EN
                  </div>
                )
              }
            </div>
          )
        }
        <br />
        <br />
        <br />
        {this.state.opened === TYPE_LOGIN && (
          <Login
            pochette={this.state.pochette}
            parent={this}
            fn={() => {
              this.state.parent.setState({ user: Identite.usager })
              if (this.props.fn) {
                this.props.fn()
              }
              this.setState({ isOpen: false })
            }}
          />
        )}
        {this.state.opened === TYPE_REGISTER && <Register parent={this} pochette={this.state.pochette} />}
        {this.state.opened === TYPE_VERIFY && (
          <ForgotPasswordVerification pochette={this.state.pochette} parent={this} />
        )}
        {this.state.opened === TYPE_CHANGE && (
          <ChangePasswordVerification pochette={this.state.pochette} parent={this} />
        )}
        {this.state.opened === TYPE_FORGOT && <ForgotPassword pochette={this.state.pochette} parent={this} />}
      </Modal>     
    )
  }
}

export default withTranslation()(ModaleConnexion)
