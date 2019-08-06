import React, { Component } from 'react';
import './Register.css'
import { Formik , Form, Field } from 'formik'
import { toast } from 'react-toastify'
import SignInFacebook from './SignInFacebook';
import SignInGoogle from './SignInGoogle';
import zxcvbn from 'zxcvbn';
// import * as Yup from 'yup'
// Traduction
// import { Translation } from 'react-i18next';

import { Auth } from "aws-amplify";


class Register extends Component {
  state = { firstName: false, username: false, lastName: false }

  constructor(props) {
    super(props);
    const { minStrength = 3, thresholdLength = 8 } = props;


    this.state = {
      hidden: true,
      confirmhidden: true,
      password: '',
      confirmpassword: '',
      strength: 0,
      passwordmatch: false,
      // dirty: false
    };

    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.validatePasswordStrong = this.validatePasswordStrong.bind(this)
    // this.stateChanged = this.stateChanged.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
    this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
    this.toggleConfirmShow = this.toggleConfirmShow.bind(this);
    this.validateUsername = this.validateUsername.bind(this)
    this.validatePassword = this.validatePassword.bind(this)
    this.validateConfirmPassword = this.validateConfirmPassword.bind(this)
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

  validateUsername(value) {
    if (!value) {
      return "Required"
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i.test(value)) {
      return "Invalid username"
    }
  }
  
  validatePassword(value) {
    if (!value) {
      return "Required"
    } else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i.test(value)) {
      console.log("VALUE", value)
      return "Invalid password"
    }
  }

  validateConfirmPassword(value) {
    if (!value) {
      return "Required"
    // } else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i.test(value)) {
    //   console.log("VALUE confirm", value)
    //   return "Passwords do not match"
    } else if ((value) !== this.state.password) {
      console.log("VALUE confirm", value)
      return "Passwords do not match"
    } else {
        this.setState({ passwordmatch: true});
    }
  }

  validatePasswordStrong = value => {
    // ensure password is long enough
    if (value.length <= this.thresholdLength) throw new Error("Password is short");

    // ensure password is strong enough using the zxcvbn library
    if (zxcvbn(value).score < this.minStrength) throw new Error("Password is weak");
  };

  handleSubmit = values => { 
    // AWS Cogni"to integration here 
    const username = values.username;
    const email = values.username; // username is used as email
    const firstName = values.firstName;
    const lastName = values.lastName;
    const password = this.state.password;
    // console.log(password, username, email, firstName, lastName)

    try {
      Auth.signUp({
        username,
        password,
        attributes: {
          email: email,
          name: firstName,
          family_name: lastName 
        }
      })
      // Auth.currentSession().then(
      //   session=>{
      //     // this.props.auth.setAuthStatus(true)
      //     console.log("AmazonCognitoUser***** ", session)
      //     console.log("rightHolderId: ", session.idToken.payload.sub)
      //   }
      // )
      // this.props.history.push("/welcome")
      .then(
        // toast.success(`Biquette#${user.username} !`)
        // this.props.auth.setAuthStatus(true)
        // this.props.auth.setUser(user.username)    
        this.props.history.push("/register-2")
    
      )
      .catch((err)=>{
        // toast.error(err.message)
        console.log(err)
      })
      .finally(()=>{
        if(this.props.fn) {
          this.props.fn()
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  handlePasswordChange(e) {
    console.log("PASSWORD STRENGTH", this.state.strength);
    this.setState({ 
      password: e.target.value,
      strength: zxcvbn(e.target.value).score
    });
  }

  // stateChanged = e => {

  //   // update the internal state using the updated state from the form field

  //   console.log("Target Value", e.target.value)
  //   console.log("PPPPPPPPP", this.state.password)

  //   this.setState({
  //     password: e.target.value,
  //     strength: zxcvbn(e.target.value).score
  //   }, () => this.props.onStateChanged(e));

  // };

  handleConfirmPasswordChange(e) {
    this.setState(
      { confirmpassword: e.target.value },
    );
    // const value = e.target.value;
    // this.setState(({ dirty = false }) => ({ value, dirty: !dirty || dirty }), () => this.validateConfirmPassword(this.state));
  }

  toggleShow() {
    this.setState({ hidden: !this.state.hidden });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.password !== nextProps.password) {
      this.setState({ password: nextProps.password });
    }
  }

  toggleConfirmShow() {
    this.setState({ confirmhidden: !this.state.confirmhidden });
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
    const { type, validator, onStateChanged, children, ...restProps } = this.props;
    const { password, strength, dirty } = this.state;

    // const { firstName, lastName, username } = this.state;

    const passwordLength = password.length;
    const passwordStrong = strength >= this.minStrength;
    const passwordLong = passwordLength > this.thresholdLength;

    // const errors = 7;
    // const hasErrors = this.passwordmatch;
    // password strength meter is only visible when password is not empty
    const strengthClass = ['strength-meter mt-2', passwordLength > 0 ? 'visible' : 'invisible'].join(' ').trim();
    // confirm password field is only visible when password is not empty
    const confirmClass = ['confirmPassword', strength >= 2 ? 'visible' : 'invisible'].join(' ').trim();
    // const controlClass = ['form-control', this.passwordmatch ? dirty ? 'is-valid' : 'is-invalid' : ''].join(' ').trim();
    const controlClass = ['form-control', this.passwordmatch ? 'is-valid' : 'is-invalid'].join(' ').trim();


    return (

      <Formik
      initialValues={ 
              {
                // email: this.state.email,
                username: this.state.username,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                password: this.state.password,
                hidden: true,
                confirmpassword: this.state.confirmpassword,
                strength: this.state.strength
              } 
          }
      onSubmit={
          (values, { setSubmitting }) => {
              this.handleSubmit(values, ()=>{setSubmitting(false)})
        }}
      >

      {({ errors, touched, isValidating }) => (
      <Form>
        <SignInFacebook text="Créer mon compte avec Facebook"></SignInFacebook>
        <SignInGoogle>"Créer mon compte avec Google"</SignInGoogle>
            <br></br>
            <br></br>
            <hr/>
            <br></br>
            <br></br>
      <section className="section auth">
        <div className="container">
          <h1>Register</h1>
          <div className="field">
              <div className="control has-icons-left has-icons-right">
                <Field 
                  name="firstName"
                  id="firstName"
                  aria-describedby="firstNameHelp"
                  placeholder="Enter First Name"
                  value={this.state.firstName}
                  required={true}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope"></i>
                </span>
              </div>
            </div>
            <div className="field">
              <div className="control has-icons-left has-icons-right">
                <Field
                  name="lastName"
                  id="lastName"
                  aria-describedby="=lastNameHelp"
                  placeholder="Enter Last Name"
                  value={this.state.lastName}
                  required={true}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope"></i>
                </span>
              </div>
            </div>
            {/* <div className="field">
              <div className="control has-icons-left has-icons-right">
                <Field 
                  name="email" 
                  type="email"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Enter Email"
                  value={this.state.email}
                  required={true}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope"></i>
                </span>
              </div>
            </div> */}
            <div className="field">
              <div className="control">
                <Field
                  validate={  (val) => {this.validateUsername(val)} } 
                  name="username"
                  id="username"
                  aria-describedby="userNameHelp"
                  placeholder="Create Username (Email)"
                  value={this.state.username}
                  required={true}
                />
                {errors.username && touched.username && <div style={{color: "red"}}> Courriel invalide </div>}
              </div>
            </div>
            <div className="field">
              <div className="control has-icons-left">
                <Field
                  validate={  (val) => {this.validatePassword(val)} } 
                  validate={ (val) => {this.validatePasswordStrong(val)} } 
                  type={this.state.hidden ? "password" : "text"}
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.handlePasswordChange}
                  // onChange={this.stateChanged}
                  required={true}
                  // {...restProps}
                />
                <button id="hide" onClick={ (e) => {e.preventDefault(); this.toggleShow()} }>
                  <i className="eye icon black"></i>
                  {/* <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#8DA0B3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="#8DA0B3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg> */}
                </button>
                {errors.password && touched.password && <div style={{color: "red"}}> Mot de passe invalide </div>}
                <span className="icon is-small is-left">
                  <i className="fas fa-lock"></i>
                </span>
              </div>
            </div>

            <div className={strengthClass}>
              <div className="strength-meter-fill" data-strength={strength}></div>  
            </div>

            <div className={confirmClass}>
              <div className="control has-icons-left confirmPassword">
                <Field
                  validate={  (val) => {this.validateConfirmPassword(val)} } 
                  type={this.state.confirmhidden ? "password" : "text"}
                  id="confirmpassword"
                  name="confirmpassword"
                  placeholder="Confirm password"
                  value={this.state.confirmpassword}
                  onChange={this.handleConfirmPasswordChange}
                  required={true}
                  className={controlClass} 
                />
                <button id="hide-confirm" onClick={ (e) => {e.preventDefault(); this.toggleConfirmShow()} }>
                  <i className="eye icon black"></i>
                </button>
                {errors.confirmpassword && touched.confirmpassword && <div style={{color: "red"}}> Les mots de passes ne correspondent pas</div>}
                <span className="icon is-small is-left">
                  <i className="fas fa-lock"></i>
                </span>
              </div>
              <div className="d-flex flex-row justify-content-between align-items-center px-3 mb-5">
              <p className="control">
                <button className="button is-success" type="submit">
                  Register
                </button>
              </p>
              </div>
            </div>

        </div>
      </section>
      </Form>
      )}
    </Formik>           
    );
  }
}

export default Register;