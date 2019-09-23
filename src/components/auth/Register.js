import React, { Component } from 'react';
import './Register.css'
import { Field, Form, Formik } from 'formik'
import zxcvbn from 'zxcvbn';
import { Auth } from "aws-amplify";
// import * as Yup from 'yup'
// Traduction
import { Translation } from 'react-i18next';
import Eye from './Eye';

class Register extends Component {
    state = { username: false }

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
            this.setState({ passwordmatch: true });
        }
    }

    validatePasswordStrong = value => {
        // ensure password is long enough
        if (value.length <= this.thresholdLength) throw new Error("Password is short");

        // ensure password is strong enough using the zxcvbn library
        if (zxcvbn(value).score < this.minStrength) throw new Error("Password is weak");
    };

    handleSubmit = values => {
        // AWS Cognito integration here
        const username = values.username;
        const email = values.username; // username is used as email
        // const firstName = values.firstName;
        // const lastName = values.lastName;
        // const artistName = values.artistName;
        const password = this.state.password;
        // console.log(password, username, email, firstName, lastName)

        try {
            Auth.signUp({
                username,
                password,
                attributes: {
                    email: email
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
                    this.props.history.push("/welcome")
                )
                .catch((err) => {
                    // toast.error(err.message)
                    console.log(err)
                })
                .finally(() => {
                    if (this.props.fn) {
                        this.props.fn()
                    }
                })
        } catch (err) {
            console.log(err)
        }
    }

    handlePasswordChange(e) {
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
        
        /*let header = (
            <span text='Connexion' onClick={()=>{this.connexion()}}>
            <span text='Inscription' onClick={()=>{this.inscription()}}>
            </span>
            </span>
        )*/

        return (
            <Formik
                initialValues={
                    {
                        // email: this.state.email,
                        username: this.state.username,
                        // firstName: this.state.firstName,
                        // lastName: this.state.lastName,
                        // artistName: this.state.artistName,
                        password: this.state.password,
                        hidden: true,
                        confirmpassword: this.state.confirmpassword,
                        strength: this.state.strength
                    }
                }
                onSubmit={
                    (values, { setSubmitting }) => {
                        this.handleSubmit(values, () => {
                            setSubmitting(false)
                        })
                    } }
            >

                { ({ errors, touched, isValidating }) => (
                <Translation>
                    {
                        (t, i18n)=>                               
                            <Form>
                                <span className="top-login">
                                    <a href="/login" style={{color: "#2DA84F"}}>{t('entete.connexion')}</a>
                                </span>
                                <div className="container">
                                    <header id="registerHeader">
                                        {
                                            i18n.lng && i18n.lng.substring(0,2) === 'en' && (
                                                <div>
                                                <div className="registerHead">
                                                <h1>On your way to <br />Professionalization.</h1>
                                                <br></br>
                                                </div>
                                                <div className="registerPrompt">
                                                <h3>You're one click away to documenting your music and share your <br />rights with your contributors.</h3>
                                                </div>
                                                </div>
                                            )
                                            }
                                        {
                                            i18n.lng && i18n.lng.substring(0,2) !== 'en' && (
                                                <div>
                                                <div className="lregisterHeade">
                                                <h1>En route vers la <br /> professionalisation.</h1>
                                                <br></br>
                                                </div>
                                                <div className="registerPrompt">
                                                <h3>Tu es à un clic de pouvoir documenter ta musique et de partager <br />tes droits avec tes collabos.</h3>
                                                </div>
                                                </div>
                                            )
                                            }
                                    </header>
                                    {/*<hr className="hrLogin" />*/}
                                    <hr className="hrLogin" data-content={t('inscription.ou')}></hr>
                                    <section className="section auth">
                                        <div className="container">
                                            <div className="field">
                                                <div className="control">
                                                    <label htmlFor="username">{t('inscription.courriel')}</label>
                                                    <Field 
                                                        validate={ (val) => {
                                                            this.validateUsername(val)
                                                    } } 
                                                    name="username" 
                                                    id="username" 
                                                    aria-describedby="userNameHelp" 
                                                    placeholder={t('inscription.exemple')} 
                                                    value={this.state.username} required={true} 
                                                    />
                                                    { errors.username && touched.username &&
                                                        <div style={ { color: "red" } }>{t('inscription.email-invalide')} </div> }
                                                </div>
                                            </div>
                                            <span>
                                                <div className="field">
                                                    <div className="control has-icons-left">
                                                        <label htmlFor="password">{t('inscription.motdepasse')}</label>

                                                        <div className="input-wrapper">
                                                            <Field 
                                                                /*validate={ (val) => {
                                                                this.validatePassword(val)
                                                            } }*/ 
                                                                validate={(val) => {
                                                                this.validatePasswordStrong(val)
                                                            } } 
                                                                type={ this.state.hidden ? "password" : "text" } 
                                                                id="password" 
                                                                name="password" 
                                                                placeholder={t('inscription.password')} 
                                                                value={ this.state.password }  
                                                                onChange={ this.handlePasswordChange }
                                                                /*onChange={this.stateChanged}*/
                                                                required={ true } 
                                                                //required={...restProps}
                                                                />

                                                            <button id="hide" onClick={ (e) => {
                                                                e.preventDefault();
                                                                this.toggleShow();
                                                            } }>
                                                                  <Eye />
                                                            </button>
                                                        </div>

                                                        { errors.password && touched.password &&
                                                            <div style={ { color: "red" } }> {t('inscription.password-invalide')} </div> }
                                                        <span className="icon is-small is-left">
                                                            <i className="fas fa-lock"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </span>
                                            <div className={ strengthClass }>
                                                <div className="strength-meter-fill" data-strength={ strength }></div>
                                            </div>

                                            <div className={ confirmClass }>
                                                <div className="control has-icons-left confirmPassword">

                                                    <div className="input-wrapper">
                                                        <Field 
                                                            validate={ (val) => {
                                                            this.validateConfirmPassword(val);
                                                        } } 
                                                        type={ this.state.confirmhidden ? "password" : "text" } 
                                                        id="confirmpassword" 
                                                        name="confirmpassword" 
                                                        placeholder="Confirm password" 
                                                        value={ this.state.confirmpassword } 
                                                        onChange={ this.handleConfirmPasswordChange } 
                                                        required={ true } 
                                                        className={ controlClass } />
                                                        <button id="hide-confirm" onClick={ (e) => {
                                                            e.preventDefault();
                                                            this.toggleConfirmShow();
                                                        } }>

                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M9.9 4.24002C10.5883 4.0789 11.2931 3.99836 12 4.00003C19 4.00003 23 12 23 12C22.393 13.1356 21.6691 14.2048 20.84 15.19M14.12 14.12C13.8454 14.4148 13.5141 14.6512 13.1462 14.8151C12.7782 14.9791 12.3809 15.0673 11.9781 15.0744C11.5753 15.0815 11.1752 15.0074 10.8016 14.8565C10.4281 14.7056 10.0887 14.4811 9.80385 14.1962C9.51897 13.9113 9.29439 13.572 9.14351 13.1984C8.99262 12.8249 8.91853 12.4247 8.92563 12.0219C8.93274 11.6191 9.02091 11.2219 9.18488 10.8539C9.34884 10.4859 9.58525 10.1547 9.88 9.88003M17.94 17.94C16.2306 19.243 14.1491 19.9649 12 20C5 20 1 12 1 12C2.24389 9.68192 3.96914 7.65663 6.06 6.06003L17.94 17.94Z" stroke="#8DA0B3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                                <path d="M1 1L23 23" stroke="#8DA0B3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                            </svg>
                                                        </button>
                                                    </div>

                                                    { errors.confirmpassword && touched.confirmpassword &&
                                                        <div style={ { color: "red" } }> {t('inscription.correspond')}</div> }
                                                    <span className="icon is-small is-left">
                                                        <i className="fas fa-lock"></i>
                                                    </span>
                                                </div>
                                                <div 
                                                    className="d-flex flex-row justify-content-between align-items-center px-3 mb-5">
                                                    <div className="container">
                                                    <p className="control">

                                                        <button className="ui medium button register is-success" type="submit">
                                                            {t('entete.inscription')}
                                                        </button>
                                                    </p>
                                                </div>
                                                </div>
                                            </div>

                                        </div>
                                    </section>
                                </div>
                            </Form>
                    }
                </Translation> 
                ) }
            </Formik>
        );
    }
}

export default Register;
