import React, { Component } from 'react'
import { Translation } from 'react-i18next'

import axios from 'axios'

import { toast } from 'react-toastify'
import { Dropdown } from 'semantic-ui-react'

// Authentification avec AWS
import { Auth } from 'aws-amplify'

export default class MenuProfil extends Component {

    constructor(props) {
        super(props)
        if(props.onRef) { // Permet de tenir une référence à la fonction de déconnexion dans l'en-tête qui inclut
            props.onRef(this)
        }
        this.state = {
            auth: props.user,
            angle: "down",
            initials: '',
            user: undefined
        }
        this.deconnexion = this.deconnexion.bind(this)
    }

    componentWillMount() {                
        axios.get('http://api.smartsplit.org:8080/v1/rightHolders/' + this.state.auth.username)
        .then(res=>{
            this.setState({user: res.data.Item})
            this.setState({initials: res.data.Item.firstName.charAt(0)+res.data.Item.lastName.charAt(0)})
        })
        .catch(err=>{
            toast.error(err)
        })
    }

    deconnexion() {
        Auth.signOut()
            .then(data=>{
                toast.success("Déconnexion réussie")
                setTimeout(() => {
                    window.location.href = '/accueil'
                }, 1000)
            })
            .catch(error=>toast.error("Erreur..."))
    }

    render() {        

        let avatarLink
        let avatarImage
        let userInitials
        let nomComplet

        if (this.state.user) {
            avatarLink = this.state.user.avatarS3Etag // avatarS3Etag taken as full url instead of Etag
            avatarImage = this.state.user.avatarS3Etag == null ? 'https://www.imsa-search.com/wp-content/uploads/2018/06/avatar.png' : avatarLink
            userInitials = this.state.user.avatarS3Etag == null ? this.state.initials : null
            nomComplet = this.state.user.artistName ? this.state.user.artistName : `${this.state.user.firstName} ${this.state.user.lastName}`
        }

        let menu = (
            <Dropdown text='' icon="angle down big black">
                <Dropdown.Menu icon="down big">
                <Dropdown.Item text='Accueil' onClick={()=>{window.location.href = '/accueil'}}/>
                <Dropdown.Item text='Mon profil' onClick={()=>{console.log('Mon profil')}}/>
                <Dropdown.Divider />
                <Dropdown.Item text='Déconnexion' onClick={()=>{this.deconnexion()}}/>
                </Dropdown.Menu>
            </Dropdown>
        )

        return (
            <Translation>
                {
                    t=>
                        <div style={{display: "inline-block"}}>
                            <div style={{display: "inline-block"}}>
                                {nomComplet}
                            </div>                            
                            <div className='avatar--image' style={{display: "inline-block"}} >
                                {userInitials}
                                {!userInitials && (<img src={avatarImage} alt='user--image' className='user--img'/>)}
                                {menu}
                            </div>
                        </div>
                }
            </Translation>
        )
    }
}