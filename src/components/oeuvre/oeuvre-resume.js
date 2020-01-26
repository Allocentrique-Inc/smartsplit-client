import {AyantsDroit, utils, Identite, journal, config} from '../../utils/application'
import React from 'react';
import { withTranslation } from "react-i18next";
import Navbar from "../navigation/navbar";
import Entete from "./oeuvre-resume/entete";
import Corps from "./oeuvre-resume/corps";
import axios from 'axios';
import roles from '../../assets/listes/role-uuids'

const ACCES_ADMIN = 3
const NOM = "OeuvreResume"

class OeuvreResume extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            mediaId: props.mediaId,
            pochette: props.pochette,
            jeton: props.jeton
        }        
    }

    componentWillMount() {        
        
        if (Identite.usager) {
            this.setState({user: Identite.usager})
        } 

        if(this.props.jeton) {
            axios.post(`${config.API_URL}media/decodeMedia`, {jeton: this.props.jeton})
            .then(res=>{                    
                if(res.data.mediaId && res.data.acces) {
                    this.setState({acces: res.data.acces}, ()=>{
                        this.setState({mediaId: res.data.mediaId}, ()=>this.getMedia())
                    })                        
                }
            })
            .catch(err=>journal.error(NOM, err))
        } else {
            if(this.props.mediaId) {
                this.getMedia()
            }                
        }

    }

    getMedia() {
        axios.get(`${config.API_URL}media/${this.state.mediaId}`)
        .then(res=>{
            let _m = res.data.Item            
            this.setState({media: _m},
                ()=>{
                    this.setState({ rightHolders: AyantsDroit.ayantsDroit })
                })
        })
    }

    render() {
        if(this.state.media && this.state.rightHolders) {

            let membreEquipe = false
            if(this.state.user) {
                if(this.state.user.username === this.state.media.creator) {
                    membreEquipe = true
                } else {
                    let _rH = this.state.media.rightHolders
                    Object.keys(_rH).forEach(e=>{                    
                        if(_rH[e].id === this.state.user.username) {
                            membreEquipe = true
                        }
                    })
                }
            }

            if(this.state.acces === ACCES_ADMIN) {
                membreEquipe = true
            }

            return (                
                <>
                    <Navbar 
                        navigation={()=>utils.naviguerVersSommaireOeuvre(this.state.media.mediaId)} 
                        membreEquipe={membreEquipe} acces={this.state.acces} 
                        media={this.state.media} profil={this.state.user} 
                        pochette={this.state.pochette} />
                    <Entete 
                        edition={ (this.state.user && this.state.user.username === this.state.media.creator) || 
                                    this.state.acces === ACCES_ADMIN ? true : false} 
                        media={this.state.media} 
                        rightHolders={this.state.rightHolders} />
                    <Corps jeton={this.props.jeton} membreEquipe={membreEquipe} 
                        acces={this.state.acces} 
                        edition={ (this.state.user && this.state.user.username === this.state.media.creator) || 
                                    this.state.acces === ACCES_ADMIN ? true : false} 
                        media={this.state.media} rightHolders={this.state.rightHolders} 
                        roles={roles} pochette={this.state.pochette} />
                </>                   
            )
        } else {
            return (<div></div>)
        }    
    }
}

export default withTranslation()(OeuvreResume)