import React, { Component } from 'react';
// import React, { useState, Fragment, useEffect } from "react";
import s from "./Login.css";

// import FormErrors from "../FormErrors";
// import Validate from "../utility/FormValidation";
import { Auth } from "aws-amplify";
import { Translation } from 'react-i18next'

import { Formik, Form, Field } from "formik";
import * as yup from "yup";

// Synchronous validation
// const validate = (values, props /* only available when using withFormik */) => {
//   let errors = {};

//   if (!values.email) {
//     errors.email = 'Required';
//   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i.test(values.email)) {
//     errors.email = 'Invalid email address';
//   }

//   if (!values.password) {
//     errors.password = 'Required';
//   } else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i.
//   test(values.password)) {
//     errors.email = 'Invalid password';
//   }

//   //...

//   return errors;
// };

function validateUsername(value) {
  console.log(value)
  let error;
  if (!value) {
    error = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i.test(value)) {
    error = 'Invalid email address';
  }
  return error;
}

function validatePassword(value) {
  console.log(value)
  let error;
  if (!value) {
    error = 'Required';
  } else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i.test(value)) {
    error = 'Invalid email address';
  }
  return error;
}

class LogIn extends Component {
  state = {
    username: "",
    password: "",
    errors: {
      cognito: null,
      blankfield: false
    }
  };

  constructor(props) {
    super(props);

    this.state = {
      hidden: true,
      password: "",
    };

    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
  }

  clearErrorState = () => {
    this.setState({
      errors: {
        cognito: null,
        blankfield: false
      }
    });
  };

  handleSubmit = async event => {
    event.preventDefault();

    // AWS Cognito integration here
    try {
      const user = await Auth.signIn(this.state.username, this.state.password);
      console.log(user);
      this.props.auth.setAuthStatus(true);
      this.props.auth.setUser(user);
      this.props.history.push("/");
    }catch(error) {
      let err = null;
      !error.message ? err = { "message": error } : err = error;
      this.setState({
        errors: {
          ...this.state.errors,
          cognito: err
        }
      });
    }
  };

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  toggleShow() {
    this.setState({ hidden: !this.state.hidden });
  }

  onInputChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
    document.getElementById(event.target.id).classList.remove("is-danger");
  };

  componentDidMount() {
    if (this.props.password) {
      this.setState({ password: this.props.password });
    }
  }

  render() {
    return (
      <Formik
      initialValues={ 
              {
                username: "",
                password: ""
              } 
          }
      onSubmit={
          (values, { setSubmitting }) => {
              // Soumettre les valeurs à l'API
              this.handleSubmit(values, ()=>{setSubmitting(false)})
      }}
      // validate={validate}
      >
      {props => {
            const {
                values,
                touched,
                errors,
                dirty,
                isSubmitting,
                handleChange,
                handleBlur,
                handleSubmit,
                handleReset,
            } = props
      return(

        <Form>
      <section className="section auth">
        <div className="container">
          <h1>Log in</h1>
            <div className="field">
              <p className="control">
                <Field name="email" validate={validateUsername} 
                  className="input" 
                  type="email"
                  id="username"
                  aria-describedby="usernameHelp"
                  placeholder="Enter email"
                  value={this.state.username}
                  onChange={this.onInputChange}
                  required={true}
                />
              </p>
              {errors.email && touched.email && <div>{errors.email}</div>}
            </div>
            <div className="field">
              <p className="control has-icons-left">
              <Field name="password" validate={validatePassword} 
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
              {errors.password && touched.password && <div>{errors.password}</div>}
            </div>
            <div className="field">
              <p className="control">
                <a href="/forgot-password">Forgot password?</a>
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
      )
      }}
    </Formik>
    );
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







