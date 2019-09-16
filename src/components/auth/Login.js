import React, { Component } from 'react'

import './Login.css'

import { Auth } from "aws-amplify";
import { Translation } from 'react-i18next'

import { Formik, Form, Field } from "formik"

// Rétroaction utilisateur
import { toast } from 'react-toastify'

class LogIn extends Component {

  constructor(props) {
    super(props)

    this.state = {
      hidden: true,
      username: "",
      password: this.props.password
    }

    this.toggleShow = this.toggleShow.bind(this)
    this.validateUsername = this.validateUsername.bind(this)
    this.validatePassword = this.validatePassword.bind(this)

  }

  clearErrorState = () => {
    this.setState({
      errors: {
        cognito: null,
        blankfield: false
      }
    });
  };

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
      return "Invalid password"
    }
  }

  handleSubmit = values => { 
    try {
      this.setState({patience: true}, ()=>{
        Auth.signIn(values.username, values.password)
        .then(user=>{
          toast.success(`Bonjour#${user.username} !`)
          if(this.props.fn) {
            this.props.fn()
          }
        })
        .catch((err)=>{
          toast.error(err.message)
        })
        .finally(()=>{
          this.setState({patience: false})
        })
      })      
    } catch (err) {
      console.log(err)
    }
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  toggleShow(e) {
    e.preventDefault()
    this.setState({ hidden: !this.state.hidden });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.password !== nextProps.password) {
      this.setState({ password: nextProps.password });
    }
  }

  render() {
    
    return (
      
      <Formik
        initialValues={ 
                {
                  username: this.state.username,
                  password: ""
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
                
                  {
                    this.state.patience && (
                        <div className="container ui active dimmer">
                          <div className="ui text loader">
                            Connexion en cours ...
                          </div>
                        </div>
                      )
                  }
                  {
                    !this.state.patience && (
                      <div className="container">
                        <h1>{this.props.message}</h1>
                        <div className="field">
                          <div className="control">
                            <Field 
                              validate={this.validateUsername}
                              name="username"
                              id="username"
                              aria-describedby="usernameHelp"
                              placeholder="Enter email"
                              required={true}
                            />
                            {errors.username && touched.username && <div style={{color: "red"}}> Courriel invalide </div>}
                          </div>                    
                        </div>
                        <div className="field">
                          <div className="control has-icons-left">
                            <Field 
                              validate={this.validatePassword} 
                              type={this.state.hidden ? "password" : "text"}
                              name="password"
                              placeholder="Password"
                              required={true}
                            />
                            <button id="hide" onClick={this.toggleShow}>
                              <i className="eye icon black"></i>
                            </button>                              
                          </div>                            
                          {errors.password && touched.password && <div style={{color: "red"}}> Mot de passe invalide </div>}
                        </div>
                        <div className="field">
                          <p className="control">
                            <a href="/forgot-password"> Mot de passe oublié ? </a>                         
                            <a href="/register"> Créer ton compte </a>
                          </p>
                        </div>
                        <div className="field">
                          <p className="control">
                            <button className="ui medium button is-success">
                              Login
                            </button>
                          </p>
                        </div>
                    </div>
                    )
                  }                  
              </section>
            </Form>
          )}
      </Formik>           
    )
  }
}

export default LogIn