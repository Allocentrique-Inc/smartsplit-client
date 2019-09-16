import React, { Component } from 'react'

import './Login.css'

import { Auth } from "aws-amplify";
import { Translation } from 'react-i18next'

import { Formik, Form, Field } from "formik"

// Rétroaction utilisateur
import { toast } from 'react-toastify'

import Eye from './Eye';

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

        <Translation>
        { 
          (t, i18n)=>  
            <Form>
              <span className="top-register">
                <a href="/register" style={{color: "#2DA84F"}}>{t('entete.inscription')}</a>
              </span>
            <div className="container">
              <header id="loginHeader">
                {
                  i18n.lng && i18n.lng.substring(0,2) === 'en' && (
                    <div>
                      <div className="loginHeader">
                        <h1>Log into you Smart Split <br />account.</h1>
                        <br></br>
                      </div>
                      <div className="loginPrompt">
                          <h3>Enter your information below.</h3>
                      </div>
                    </div>
                  )
                }
                {
                  i18n.lng && i18n.lng.substring(0,2) !== 'en' && (
                    <div>
                      <div className="loginHeader">
                        <h1>Connecte-toi à ton <br />compte Smart Split.</h1>
                        <br></br>
                      </div>
                      <div className="loginPrompt">
                          <h3>Entre tes informations ci-dessous.</h3>
                      </div>
                    </div>
                  )
                }
            
              </header>
          </div>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
              <section className="section auth">
                <div className="container">
                  <h1>{this.props.message}</h1>
                    <div className="field">
                    <div className="input-wrapper"> 
                    <div className="control">
                    <label htmlFor="username">{t('accueil.courriel')}</label>
                        <Field 
                          validate={this.validateUsername}
                          name="username"
                          id="username" 
                          aria-describedby="usernameHelp"
                          placeholder={t('inscription.exemple')} 
                          required={true}
                        />
                        {errors.username && touched.username && <div style={{color: "red"}}> {t('inscription.email-invalide')} </div>}
                      </div>                    
                    </div>
                    <div className="field">
                      <div className="control has-icons-left">
                      <label htmlFor="password">{t('accueil.motdepasse')}</label>    
                      <div className="input-wrapper">
                        <Field 
                          validate={this.validatePassword} 
                          type={this.state.hidden ? "password" : "text"}
                          id="password"
                          name="password"
                          placeholder={t('inscription.motdepasse')}
                          required={true}
                        />
                        <button id="hide" onClick={this.toggleShow}>
                        <Eye />
                        </button> 
                  </div>                             
                      </div>                            
                      {errors.password && touched.password && <div style={{color: "red"}}> {t('inscription.password-invalide')} </div>}
                    </div>
                    <div className="field">
                      <p className="control">
                        <a href="/forgot-password" style={{color: "#2DA84F"}}>{t('accueil.oublie')}</a>                         
                      </p>
                    </div>
                    <div className="field">
                      <p className="control">
                        <button className="ui medium button login is-success">
                        {t('entete.connexion')}
                        </button>
                      </p>
                      </div>
                    </div>
                </div>
              </section>
            </Form>
          }
          </Translation> 
          )
          }
      </Formik>           
    )
  }
}

export default LogIn