import React, { Component } from 'react';
import './Register.css'
import { Formik , Form, Field } from 'formik'
import { toast } from 'react-toastify'
import { Auth } from 'aws-amplify';
import axios from 'axios'
const MAX_IMAGE_SIZE = 10000000
// import * as Yup from 'yup'
// Traduction
// import { Translation } from 'react-i18next';


class Register2 extends Component {
  state = { firstName: false, username: false, lastName: false }

  constructor(props) {
    super(props);

    this.state = {
      artistName: '',
      role: 'Singer',
      avatar: 'https://smartsplit-images.s3.us-east-2.amazonaws.com/faceapp.jpg',
      image: '',
      uploadURL: ''
    };

    // this.handlePasswordChange = this.handlePasswordChange.bind(this);
    // this.validatePasswordStrong = this.validatePasswordStrong.bind(this)
    // // this.stateChanged = this.stateChanged.bind(this);
    // this.toggleShow = this.toggleShow.bind(this);
    this.handleArtistNameChange = this.handleArtistNameChange.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
    // this.toggleConfirmShow = this.toggleConfirmShow.bind(this);
    // this.validateUsername = this.validateUsername.bind(this)
    // this.validatePassword = this.validatePassword.bind(this)
    // this.validateConfirmPassword = this.validateConfirmPassword.bind(this)
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

  handleSubmit = values => { 
    // AWS Cognito integration here 
    let artistName = values.artistName;
    let role = values.role; // username is used as email
    let avatar = values.avatar;
    let content = {
      firstName: "John",
      lastName: "Smith",
      email: "john.smith@example.com",
      jurisdiction: "Canada",
      ipi: "00004576",
      wallet: "0xdd87ae15f4be97e2739c9069ddef674f907d27a8",
      avatarImage: "image.jpg",
      artistName: "Questlove",
      socialMediaLinks: {
        "facebook": "https://facebook.com/ex",
        "twitter": "https://twitter.com/ex",
        "youtube": "https://youtube.com/ex"
      }
    }

    try {
      Auth.currentSession().then(
        session=>{
          let url = 'http://api.smartsplit.org:8080/v1/rightHolders/' + session.idToken.payload.sub + '/artistName'
          let req = {
            url,
            method: 'Patch',
            data: {artistName: this.state.artistName}
          }
          axios(req)
          .then(res=>{
            console.log(res);
          })
          .catch(err=>{
            toast.error(err)
          })
          // let avatarUrl = 'http://api.smartsplit.org:8080/v1/rightHolders/' + session.idToken.payload.sub + '/avatarS3Etag'
          // let avatarReq = {
          //   avatarUrl,
          //   method: 'Patch',
          //   data: {avatarS3Etag: avatar} 
          // }
          // axios(avatarReq)
          // .then(res=>{
          //   console.log(res);
          // })
          // .catch(err=>{
          //   toast.error(err)
          // })

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


  handleFileUpload(e) {
    // console.log(e.target.files[0]);
    console.log("FILE: ", e.target.files[0]);
    if (e.target.files[0].size > MAX_IMAGE_SIZE) {
      return alert('Image is loo large - 10Mb maximum')
    }
    if ( !e.target.files[0].type.includes('image/jpeg') )  {
      return alert('Wrong file type - JPG only.')
    }
    this.setState(
      { image: 'https://smartsplit-images.s3.us-east-2.amazonaws.com/faceapp.jpg'}
    );
  }

  handleFileDelete(e) {
    e.target.value = null;
    // this.image = ''
    this.setState(
      { image: '' },
    );
    console.log('image: ', this.state.image);
  }

  handleArtistNameChange(e) {
    this.setState(
      { artistName: e.target.value },
    );
    // const value = e.target.value;
    // this.setState(({ dirty = false }) => ({ value, dirty: !dirty || dirty }), () => this.validateConfirmPassword(this.state));
  }

  componentDidMount() {
    if (this.props.role) {
      this.setState({ role: this.props.role });
    }
    if (this.props.artistName) {
      this.setState({ artistName: this.props.artistName });
    }
  }

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
                avatar: this.state.avatar,
                image: this.state.image
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
            <img type="image" className="avatarImage" src="https://smartsplit-images.s3.us-east-2.amazonaws.com/faceapp.jpg"/>
            <input type="file" className="fileUpload" onChange={this.handleFileUpload}/>
            <button className="fileDelete" onChange={this.handleFileDelete}>Remove File</button>
            <div className="field">
              <div className="control has-icons-left has-icons-right">
                Artist Name:
                <Field 
                  name="artistName"
                  id="artistName"
                  aria-describedby="artistNameHelp"
                  placeholder="Enter Artist Name"
                  value={this.state.artistName}
                  onChange={this.handleArtistNameChange}
                  required={true}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope"></i>
                </span>
              </div>
            </div>
            <div className="field">
              <div className="control has-icons-left has-icons-right">
                Role:
                <Field
                  name="role"
                  id="role"
                  aria-describedby="=roleHelp"
                  placeholder="Enter Role"
                  value={this.state.role}
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

export default Register2;