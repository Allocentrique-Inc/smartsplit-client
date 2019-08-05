import React, { Component } from 'react'

import axios from 'axios'

import Entete from '../entete/entete'

import 'react-confirm-alert/src/react-confirm-alert.css'
import { Auth } from 'aws-amplify'
import { toast } from '@aws-amplify/ui'

import Login from '../auth/Login'
import { confirmAlert } from 'react-confirm-alert'

import cassette from '../../assets/images/compact-cassette.png'

export default class SommaireOeuvre extends Component {

    constructor(props) {
        super(props)
        this.state = {
            mediaId: props.mediaId
        }
    }

    componentWillMount() {        

        Auth.currentAuthenticatedUser()
        .then(res=>{
            this.setState({user: res}, ()=>{console.log(this.state.user)})

            axios.get(`http://api.smartsplit.org:8080/v1/media/${this.state.mediaId}`)
            .then(res=>{
                let media = res.data.Item
                this.setState({media: media})
            })
            
        })
        .catch(err=>{
            toast.error(err.message)
            confirmAlert({
                title: `Connexion obligatoire`,
                message: `Tu dois être connecté pour accéder au tableau de bord`,
                closeOnClickOutside: false,
                style: {
                        position: "relative",
                        width: "640px",
                        height: "660px",
                        margin: "0 auto",
                        background: "#FFFFFF",
                        border: "1px solid rgba(0, 0, 0, 0.5)",
                        boxSizing: "border-box",
                        boxShadow: "inset 0px -1px 0px #DCDFE1"
                    },
                customUI: ({ onClose }) => 
                    <div>         
                        <Login message="Connecte-toi pour accéder au tableau de bord" fn={(user)=>{
                            onClose()
                            this.setState({user: user})                                  
                        }} />
                </div>
            })
        })
    }

    render() {

        let _m = ""       

        if(this.state.media) {

            let artiste = this.state.media.artist

            let enteteOeuvre = (               
                <div className="ui row">    
                    <div className="ui twelve wide column grid">
                        <div className="ui one wide column">
                            <i className="file image outline icon huge grey" style={{background: "#F2EFF0"}}></i>
                        </div>
                        <div className="ui eleven wide column">
                            <div className="ui row">
                                <h1>{`${this.state.media.title}`}&nbsp;&nbsp;&nbsp;<i className="pencil alternate icon grey" style={{cursor: "pointer"}}></i></h1>
                            </div>
                            <div className="ui row">
                                <div className="small-400" style={{display: "inline-block"}}>Créé par&nbsp;</div><div className="small-500-color" style={{display: "inline-block"}}>{`${artiste}`}&nbsp;</div>
                                <div className="small-400-color" style={{display: "inline-block"}}>&bull; Mis à jour il y a 2 jours</div>
                            </div>                                            
                        </div>                        
                    </div>
                </div>                        
            )
            return (
                <div className="ui grid">
                    <div className="ui row" style={{background: "#FAF8F9", paddingTop: "30px", paddingBottom: "0px"}}>
                        <div className="ui two wide column" />
                        <div className="ui fourteen wide column">
                            <Entete navigation={'/accueil'} menu={true} profil={this.state.user} />
                        </div>             
                    </div>
                    <div className="ui row" style={{background: "#FAF8F9"}}>
                        <div className="ui two wide column"></div>
                        <div className="ui eleven wide column"><hr style={{width: "100%"}}/></div>
                    </div>                
                    <div className="ui row" style={{background: "#FAF8F9"}}>
                        <div className="ui two wide column" />
                        <div className="ui eleven wide column">                    
                            {enteteOeuvre}
                        </div>                        
                    </div>
                    <div className="ui row">
                        <div className="ui two wide column" />
                        <div className="ui six wide column">
                            <div className="ui row etape">
                                <div className="ui heading3">ÉTAPE 1</div>
                                <div className="ui heading1">Partage tes droits</div>
                                <div className="ui medium-400">
                                    Crée les partages sur tes droits à l’aide de notre guide. Tu vas voir, c’est beaucoup plus simple que tu ne le crois :)
                                </div>                                
                                <div className="ui medium button" style={{marginTop: "50px", marginLeft: "0px"}} onClick={()=>{window.location.href=`/partager/${this.state.mediaId}`}}>
                                    Commencer
                                </div>                    
                            </div>
                            <div className="ui row etape">
                            <div className="ui heading3">ÉTAPE 2</div>
                                <div className="ui heading1">Documente ton oeuvre</div>
                                <div className="ui medium-400">
                                    Rends découvrable ton oeuvre sur le web grâce aux métadonnées et augmente ainsi tes chances d’apparaître dans des playlists.
                                </div>
                                <div className="ui medium button" style={{marginTop: "50px", marginLeft: "0px"}}>
                                    Commencer
                                </div> 
                            </div>
                            <div className="ui row etape">
                            <div className="ui heading3">ÉTAPE 3</div>
                                <div className="ui heading1">Protège ton oeuvre</div>
                                <div className="ui medium-400">
                                Dans le bon vieux temps, on s’envoyait une cassette par courrier recommandé pour prouver qui a fait l’oeuvre et à quel moment. Là, on utilise plutôt une blockchain pour créer cette preuve. :)
                                </div>
                                <div className="ui medium button" style={{marginTop: "50px", marginLeft: "0px"}}>
                                    Commencer
                                </div> 
                            </div>                            
                        </div>
                        <div className="ui five wide column" style={{padding: "50px"}}>
                            <div style={{position: "absolute", top: "105px", left: "150px", width: "60%"}}>
                                {this.state.media.title} par {artiste}
                            </div>
                            <img src={cassette} />
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div>{_m}</div>
            )
        }
        
    }

}