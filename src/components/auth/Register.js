import React, { Component } from 'react';
import './Register.css'
import { Formik } from 'formik'
import * as Yup from 'yup'
// Traduction
import { Translation } from 'react-i18next';

// import FormErrors from "../FormErrors";
// import Validate from "../utility/FormValidation";
import { Auth } from "aws-amplify";

import { Wizard } from 'semantic-ui-react-formik'
import { Form } from 'semantic-ui-react';

class Register extends Component {
  state = {
    email: "",
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    hidden: true,
    confirmpassword: "",
    errors: {
      cognito: null,
      blankfield: false,
      passwordmatch: false
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      hidden: true,
      confirmhidden: true,
      password: "",
      confirmpassword: ""
    };

    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
    this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
    this.toggleConfirmShow = this.toggleConfirmShow.bind(this);
  }

  clearErrorState = () => {
    this.setState({
      errors: {
        cognito: null,
        blankfield: false,
        passwordmatch: false
      }
    });
  }

  handleSubmit = async event => {
    event.preventDefault();

    // Form validation
    // this.clearErrorState();
    // const error = Validate(event, this.state);
    // if (error) {
    //   this.setState({
    //     errors: { ...this.state.errors, ...error }
    //   });
    // }

    // AWS Cognito integration here
    const { username, email, firstName, lastName, password } = this.state;
    try {
      const signUpResponse = await Auth.signUp({
        username,
        password,
        attributes: {
          email: email,
          name: firstName,
          family_name: lastName
        }
      });
      this.props.history.push("/welcome");
      console.log(signUpResponse);
    } catch (error) {
      let err = null;
      !error.message ? err = { "message": error } : err = error;
      this.setState({
        errors: {
          ...this.state.errors,
          cognito: err
        }
      });
    }
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  handleConfirmPasswordChange(e) {
    this.setState({ confirmpassword: e.target.value });
  }

  toggleShow() {
    this.setState({ hidden: !this.state.hidden });
  }

  toggleConfirmShow() {
    this.setState({ confirmhidden: !this.state.confirmhidden });
  }

  onInputChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
    document.getElementById(event.target.id).classList.remove("is-danger");
  }

  componentDidMount() {
    if (this.props.password) {
      this.setState({ password: this.props.password });
    }
    if (this.props.confirmpassword) {
      this.setState({ confirmpassword: this.props.confirmpassword });
    }
  }

  render() {
    return (
      <section className="section auth">
        <div className="container">
          <h1>Register</h1>
          {/* <FormErrors formerrors={this.state.errors} /> */}

          <form onSubmit={this.handleSubmit}>
          <div className="field">
              <p className="control has-icons-left has-icons-right">
                <input 
                  className="input" 
                  type="firstName"
                  id="firstName"
                  aria-describedby="firstNameHelp"
                  placeholder="Enter First Name"
                  value={this.state.firstName}
                  onChange={this.onInputChange}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope"></i>
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left has-icons-right">
                <input 
                  className="input" 
                  type="lastName"
                  id="lastName"
                  aria-describedby="=lastNameHelp"
                  placeholder="Enter Last Name"
                  value={this.state.lastName}
                  onChange={this.onInputChange}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope"></i>
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left has-icons-right">
                <input 
                  className="input" 
                  type="email"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Enter Email"
                  value={this.state.email}
                  onChange={this.onInputChange}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope"></i>
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control">
                <input 
                  className="input" 
                  type="text"
                  id="username"
                  aria-describedby="userNameHelp"
                  placeholder="Enter username"
                  value={this.state.email}
                  onChange={this.onInputChange}
                  style={{display: 'none'}} 
                />
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left">
                <input 
                  className="input" 
                  type={this.state.hidden ? "password" : "text"}
                  id="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.handlePasswordChange}
                  onChange={this.onInputChange}
                />
                <button id="hide" onClick={this.toggleShow}>👁️</button>
                <span className="icon is-small is-left">
                  <i className="fas fa-lock"></i>
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left">
                <input 
                  className="input" 
                  type={this.state.confirmhidden ? "password" : "text"}
                  id="confirmpassword"
                  placeholder="Confirm password"
                  value={this.state.confirmpassword}
                  onChange={this.handleConfirmPasswordChange}
                  onChange={this.onInputChange}
                />
                <button id="hide" onClick={this.toggleConfirmShow}>👁️</button>
                <span className="icon is-small is-left">
                  <i className="fas fa-lock"></i>
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control">
                <button className="button is-success">
                  Register
                </button>
              </p>
            </div>
          </form>
        </div>
      </section>
    );
  }
}

export default Register;