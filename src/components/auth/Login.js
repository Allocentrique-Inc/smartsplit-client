import React, { Component } from 'react'

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
      password: this.props.password,
      auth : {}
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
    // AWS Cognito integration here    
    Auth.signIn(values.username, values.password)
    .then(user=>{
      toast.success(`Biquette#${user.username} !`)
      this.props.auth.setAuthStatus(true)
      this.props.auth.setUser(user.username)
      if(this.props.fn) {
        this.props.fn()
      }
    })
    .catch((err)=>{
      toast.error(err.message)
      console.log(err)
    })
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
                  password: "Aa@34567"
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
                  <h1> Connecte-toi afin de voter </h1>
                    <div className="field">
                      <div className="control">
                        <Field 
                          validate={this.validateUsername}
                          name="username"
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
                          <i className="eye icon white"></i>
                        </button>                              
                      </div>                            
                      {errors.password && touched.password && <div style={{color: "red"}}> Mot de passe invalide </div>}
                    </div>
                    <div className="field">
                      <p className="control">
                        <a href="/forgot-password"> Mot de passe oublié ? </a>
                      </p>
                    </div>
                    <div className="field">
                      <p className="control">
                        <button className="button is-success">
                          Login
                        </button>
                      </p>
                    </div>
                </div>
              </section>
            </Form>
          )}
      </Formik>           
    )
  }
}

export default LogIn;


// const intialState = {
//   name: "", 
//   email: "",
//   password: ""
// };
// const userSchema = yup.object().shape({
//   name: yup.string().required(),
//   email: yup
//     .string()
//     .email()
//     .required(),
//   password: yup
//     .string()
//     .required()
//     .max(13)
//     .min(8)
// });


// function LogIn(props) {
//   const [user, setUser] = useState(intialState);

//   handleSubmit = async event => {
//     event.preventDefault();
  
//     // AWS Cognito integration here
//     try {
//       const user = await Auth.signIn(this.state.username, this.state.password);
//       console.log(user);
//       this.props.auth.setAuthStatus(true);
//       this.props.auth.setUser(user);
//       this.props.history.push("/");
//     }catch(error) {
//       let err = null;
//       !error.message ? err = { "message": error } : err = error;
//       this.setState({
//         errors: {
//           ...this.state.errors,
//           cognito: err
//         }
//       });
//     }
//   };

//   return (
//     <Fragment>
//       <span className={`${s.output}`}>{JSON.stringify(user, null, 2)}</span>
//       <Formik
//         initialValues={user}
//         onSubmit={(values, actions) => {
//           actions.setSubmitting(true);
//           setUser(values);
//           setTimeout(() => {
//             actions.setSubmitting(false);
//           }, 2000);
//           this.handleSubmit(values, ()=>{setSubmitting(false)})
//         }}
//         validationSchema={userSchema}
//       >
//         {props =>
//           !props.isSubmitting ? (
//             <form onSubmit={props.handleSubmit} className={s.form}>
//               <Field
//                 type="email"
//                 placeholder="Enter email"
//                 onChange={props.handleChange}
//                 name="email"
//                 value={props.values.email}
//                 className={s.text_field}
//               />

//               {props.errors.email && props.touched.email ? (
//                 <span className={s.field_text}>{props.errors.email}</span>
//               ) : (
//                 ""
//               )}

//               <Field
//                 type="password"
//                 onChange={props.handleChange}
//                 name="password"
//                 value={props.values.password}
//                 placeholder="Password"
//                 className={s.text_field}
//               />

//               {props.errors.password && props.touched.password ? (
//                 <span className={s.field_text}>{props.errors.password}</span>
//               ) : (
//                 ""
//               )}
//               <button
//                 type="submit"
//                 disabled={!props.dirty && props.isSubmitting}
//                 className={`${s.button} ${s.submit_button}`}
//               >
//                 Submit
//               </button>
//               <button
//                 disabled={!props.dirty}
//                 onClick={props.handleReset}
//                 type="button"
//                 className={s.button}
//               >
//                 Reset
//               </button>
//             </form>
//           ) : (
//             <div className={s.overlay} />
//           )
//         }
//       </Formik>
//     </Fragment>
//   );
// }

// export default LogIn;







