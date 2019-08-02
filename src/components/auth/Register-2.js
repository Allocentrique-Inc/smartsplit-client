import React, { Component } from 'react';
import './Register.css'
import { Formik , Form, Field } from 'formik'
import { toast } from 'react-toastify'
import { Auth } from 'aws-amplify';
import axios from 'axios'
import { toast } from 'react-toastify'
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
      artistName: true,
      role: '',
      avatar: '',
    };

    // this.handlePasswordChange = this.handlePasswordChange.bind(this);
    // this.validatePasswordStrong = this.validatePasswordStrong.bind(this)
    // // this.stateChanged = this.stateChanged.bind(this);
    // this.toggleShow = this.toggleShow.bind(this);
    // this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
    // this.toggleConfirmShow = this.toggleConfirmShow.bind(this);
    // this.validateUsername = this.validateUsername.bind(this)
    // this.validatePassword = this.validatePassword.bind(this)
    // this.validateConfirmPassword = this.validateConfirmPassword.bind(this)
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
  
  // validatePassword(value) {
  //   if (!value) {
  //     return "Required"
  //   } else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i.test(value)) {
  //     console.log("VALUE", value)
  //     return "Invalid password"
  //   }
  // }

  // validateConfirmPassword(value) {
  //   if (!value) {
  //     return "Required"
  //   // } else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i.test(value)) {
  //   //   console.log("VALUE confirm", value)
  //   //   return "Passwords do not match"
  //   } else if ((value) !== this.state.password) {
  //     console.log("VALUE confirm", value)
  //     return "Passwords do not match"
  //   } else {
  //       this.setState({ passwordmatch: true});
  //   }
  // }

  handleSubmit = values => { 
    // AWS Cogni"to integration here 
    const artistName = value.artistName;
    const role = values.role; // username is used as email
    const avatar = values.avatar;

    try {
      Auth.currentSession().then(
        session=>{
          axios.patch('http://api.smartsplit.org:8080/v1/rightHolders/' + session.idToken.payload.sub)
          .then(res=>{
            console.log(res);
          })
          .catch(err=>{
            toast.error(err)
          })

          // Auth.currentAuthenticatedUser().then(
          //   user=>{
          //     this.props.auth.setUser(user);
          //     this.setState({ isAuthenticating: false })
          //   }
          // )
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

  // handlePasswordChange(e) {
  //   console.log("PASSWORD STRENGTH", this.state.strength);
  //   this.setState({ 
  //     password: e.target.value,
  //     strength: zxcvbn(e.target.value).score
  //   });
  // }

  // stateChanged = e => {

  //   // update the internal state using the updated state from the form field

  //   console.log("Target Value", e.target.value)
  //   console.log("PPPPPPPPP", this.state.password)

  //   this.setState({
  //     password: e.target.value,
  //     strength: zxcvbn(e.target.value).score
  //   }, () => this.props.onStateChanged(e));

  // };

  // handleConfirmPasswordChange(e) {
  //   this.setState(
  //     { confirmpassword: e.target.value },
  //   );
  //   // const value = e.target.value;
  //   // this.setState(({ dirty = false }) => ({ value, dirty: !dirty || dirty }), () => this.validateConfirmPassword(this.state));
  // }

  // toggleShow() {
  //   this.setState({ hidden: !this.state.hidden });
  // }

  // componentWillReceiveProps(nextProps) {
  //   if (this.props.password !== nextProps.password) {
  //     this.setState({ password: nextProps.password });
  //   }
  // }

  // toggleConfirmShow() {
  //   this.setState({ confirmhidden: !this.state.confirmhidden });
  // }

  // componentDidMount() {
  //   if (this.props.password) {
  //     this.setState({ password: this.props.password });
  //   }
  //   if (this.props.confirmpassword) {
  //     this.setState({ confirmpassword: this.props.confirmpassword });
  //   }
  // }

  render() {
    // const { type, validator, onStateChanged, children, ...restProps } = this.props;
    // const { password, strength, dirty } = this.state;

    // const { firstName, lastName, username } = this.state;

    // const passwordLength = password.length;
    // console.log("password =====", password.length, "pL: ", passwordLength);

    // const passwordStrong = strength >= this.minStrength;
    // const passwordLong = passwordLength > this.thresholdLength;

    // const errors = 7;
    // const hasErrors = this.passwordmatch;
    // password strength meter is only visible when password is not empty
    // const strengthClass = ['strength-meter mt-2', passwordLength > 0 ? 'visible' : 'invisible'].join(' ').trim();
    // // confirm password field is only visible when password is not empty
    // const confirmClass = ['confirmPassword', strength >= 2 ? 'visible' : 'invisible'].join(' ').trim();
    // console.log("PASSWORD MATCH: ", this.state.passwordmatch)
    // // const controlClass = ['form-control', this.passwordmatch ? dirty ? 'is-valid' : 'is-invalid' : ''].join(' ').trim();
    // const controlClass = ['form-control', this.passwordmatch ? 'is-valid' : 'is-invalid'].join(' ').trim();


    return (

      <Formik
      initialValues={ 
              {
                // email: this.state.email,
                role: this.state.role,
                artistName: this.state.artistName,
                avatar: this.state.avatar
              } 
          }
      onSubmit={
          (values, { setSubmitting }) => {
              this.handleSubmit(values, ()=>{setSubmitting(false)})
        }}
      >

      {({ errors, touched, isValidating }) => (
      <Form>
      <section className="section auth">
        <div className="container">
          <h1>Register</h1>
          <div className="field">
              <div className="control has-icons-left has-icons-right">
                <Field 
                  name="artistName"
                  id="artistName"
                  aria-describedby="artistNameHelp"
                  placeholder="Enter Artist Name"
                  value={this.state.artistName}
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
                  name="role"
                  id="role"
                  aria-describedby="=roleHelp"
                  placeholder="Enter Role"
                  value={this.state.lastName}
                  required={true}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope"></i>
                </span>
              </div>
            </div>
              <div className="d-flex flex-row justify-content-between align-items-center px-3 mb-5">
              <p className="control">
                <button className="button is-success" type="submit">
                  Update account
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