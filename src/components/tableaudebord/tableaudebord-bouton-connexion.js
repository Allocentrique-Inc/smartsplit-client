import React, {Component} from 'react'
import { Translation } from 'react-i18next';
import { Auth } from 'aws-amplify';
import axios from 'axios'
import { toast } from 'react-toastify'

export default class BoutonConnexion extends Component {

    state = {
        // isAuthenticated: false,
        // isAuthenticating: true,
        user: '',
        initials: ''
    }

    constructor(props) {
        super(props)
    }

    componentDidMount() {

        try {
          Auth.currentSession().then(
            session=>{
              axios.get('http://api.smartsplit.org:8080/v1/rightHolders/' + session.idToken.payload.sub)
              .then(res=>{
                this.setState({user: res.data.Item});
                this.setState({initials: res.data.Item.firstName.charAt(0)+res.data.Item.lastName.charAt(0)})
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
            }
          ).catch((err) => {
            console.log(`Auth err: ${err}`)
          })
                    
        } catch(error) {
          if (error !== 'No current user.') {
            console.log(error);
          }
        }
    }

    render() {
        let avatarLink = this.state.user.avatarS3Etag; // avatarS3Etag taken as full url instead of Etag
        // Set user image to default grey with initials if user did not upload an avatar image
        let avatarImage = this.state.user.avatarS3Etag == null ? 'https://www.imsa-search.com/wp-content/uploads/2018/06/avatar.png' : avatarLink;
        let userInitials = this.state.user.avatarS3Etag == null ? this.state.initials : null;

        return (
            <Translation>
                {
                    t=>
                    <div>
                        <div className='avatar--image'>
                            <div className='initials'>{userInitials}</div>
                            <a><img src={avatarImage} alt='user--image' className='user--img'/></a>
                            <a href="/" class="button is-light"><img src='https://smartsplit-images.s3.us-east-2.amazonaws.com/down-arrow.svg' className='icon--img'/></a>
                        </div>
                    </div>
                }
            </Translation>
        )
    }
}