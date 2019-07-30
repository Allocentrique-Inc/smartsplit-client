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

// import FormErrors from "../FormErrors";
// import Validate from "../utility/FormValidation";
import { Auth } from "aws-amplify";


class Register extends Component {

  constructor(props) {
    super(props);
    const { minStrength = 3, thresholdLength = 8 } = props;

    this.state = {
      hidden: true,
      confirmhidden: true,
      password: "",
      confirmpassword: "",
      strength: 0
    };

    // this.state = { password: '', strength: 0 };

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

  // clearErrorState = () => {
  //   this.setState({
  //     errors: {
  //       cognito: null,
  //       blankfield: false,
  //       passwordmatch: false
  //     }
  //   });
  // }

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
      // this.props.history.push("/welcome")
      .then(
        // toast.success(`Biquette#${user.username} !`)
        // this.props.auth.setAuthStatus(true)
        // this.props.auth.setUser(user.username)    
        this.props.history.push("/welcome")
    
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
    console.log("PASSWORD",e.target.value);
    console.log("STRENGTH", this.state.strength);
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
    this.setState({ confirmpassword: e.target.value });
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
    const { password, strength } = this.state;
    const passwordLength = password.length;
    const passwordStrong = strength >= this.minStrength;
    const passwordLong = passwordLength > this.thresholdLength;

    // password strength meter is only visible when password is not empty
    const strengthClass = ['strength-meter mt-2', passwordLength > 0 ? 'visible' : 'invisible'].join(' ').trim();

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
                // strength: this.state.strength
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
                  validator={ (val) => {this.validatePasswordStrong(val)} } 
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
            <div className="field">
              <div className="control has-icons-left">
                <Field
                  validate={  (val) => {this.validateConfirmPassword(val)} } 
                  type={this.state.confirmhidden ? "password" : "text"}
                  id="confirmpassword"
                  name="confirmpassword"
                  placeholder="Confirm password"
                  value={this.state.confirmpassword}
                  onChange={this.handleConfirmPasswordChange}
                  required={true}
                />
                <button id="hide-confirm" onClick={ (e) => {e.preventDefault(); this.toggleConfirmShow()} }>
                  <i className="eye icon black"></i>
                </button>
                {errors.confirmpassword && touched.confirmpassword && <div style={{color: "red"}}> Les mots de passes ne correspondent pas</div>}
                <span className="icon is-small is-left">
                  <i className="fas fa-lock"></i>
                </span>
              </div>
            </div>
            <div className="field">
              <p className="control">
                <button className="button is-success" type="submit">
                  Register
                </button>
              </p>
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