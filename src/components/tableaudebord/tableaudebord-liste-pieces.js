import React, {Component} from 'react'
import { Translation } from 'react-i18next'
import axios from 'axios'
import { Auth } from 'aws-amplify';

import { toast } from 'react-toastify'

const PANNEAU_INITIATEUR = 1, PANNEAU_COLLABORATEUR = 0


export default class ListePieces extends Component {

    constructor(props) {
        super(props)
        this.state={
            medias:[],
            collabMedias:[],
            panneau:PANNEAU_INITIATEUR
        }
    }

    afficherPanneauInitiateur() {
        this.setState({panneau: PANNEAU_INITIATEUR})
    }
    
    afficherPanneauCollaborateur() {
        this.setState({panneau: PANNEAU_COLLABORATEUR})
    }

    componentWillMount() {

        try{
            Auth.currentSession().then(
                session=>{
                let that = this
                let USER_ID = session.idToken.payload.sub       

                axios.get('http://api.smartsplit.org:8080/v1/proposal')
                .then((res) => {
                    let initiatorMediaIds = []
                    let collabMediaIds = []

                    res.data.forEach(function(item){
                        if (item.initiator.id === USER_ID){
                            initiatorMediaIds.push(item.mediaId) // If initiator
                        } 
                        else if (item.initiator.id == undefined){
                            toast.error("Initiator undefined")
                        } 
                        if((JSON.stringify(item.rightsSplits)).includes(USER_ID)){
                            collabMediaIds.push(item.mediaId) // If collaborator
                        } else if (item.rightsSplits == undefined) {
                            toast.error("rightsSplits object error")
                        }
                    })
                    let _medias = [];
                    let ii = '';
                    let _collabMedias = [];
                    let jj = '';

                    initiatorMediaIds.forEach(async function(element) {
                        const res = await axios.get('http://api.smartsplit.org:8080/v1/media/' + element)
                        _medias.push(res.data.Item)
                        ii++
                        if (initiatorMediaIds.length == ii) {
                            that.setState({medias: _medias})
                        }
                        return _medias;
                    });

                    collabMediaIds.forEach(async function(elm) {
                        const res = await axios.get('http://api.smartsplit.org:8080/v1/media/' + elm)
                        _collabMedias.push(res.data.Item)
                        jj++
                        if (collabMediaIds.length == jj) {
                            that.setState({collabMedias: _collabMedias})
                        }
                        return _collabMedias;
                    });

                })
                .catch((error) => {
                    toast.error(error)            
                })

            })
        } catch (err) {
            console.log(err)
        }
    }

    render() {

        let toggle = (
            <Translation>
                {
                  t =>
                    <div>
                        <div className="ui row">
                            <div className="ui one wide column" />
                            <div className="ui twelve wide column">
                                <span style={this.state.panneau === PANNEAU_INITIATEUR ? {cursor: "pointer", borderBottom: "solid green"} : {cursor: "pointer"}} className={`small-500${this.state.panneau === PANNEAU_INITIATEUR ? '-color' : ''}`} onClick={()=>{this.afficherPanneauInitiateur()}}>{t('tableaudebord.pieces.0')}</span>&nbsp;&nbsp;
                                <span style={this.state.panneau === PANNEAU_COLLABORATEUR ? {cursor: "pointer", borderBottom: "solid green"} : {cursor: "pointer"}} className={`small-500${this.state.panneau === PANNEAU_COLLABORATEUR ? '-color' : ''}`} onClick={()=>{this.afficherPanneauCollaborateur()}}>{t('tableaudebord.pieces.1')}</span>
                            </div>
                            <div className="ui one wide column" />
                        </div>
                    </div> 
                }
            </Translation>
        )
        let tableauMedias = []
          if (this.state.medias.length > 0 && this.state.panneau === PANNEAU_INITIATEUR) {
            tableauMedias = this.state.medias.map((elem, _idx)=>{
                return (
                    <Translation>
                        {
                            t =>
                                <div key={_idx} style={{marginTop: "20px"}}>
                                    <div className="ui three column grid">
                                        <div className="ui row">
                                            <div className="ui thirteen wide column">
                                                <div className="ui three column grid cliquable" onClick={()=>{window.location.href = `/oeuvre/sommaire/${elem.mediaId}`}} >
                                                    <div className="ui row">
                                                        <div className="ui one wide column">
                                                            <i className="file image outline icon big grey"></i>
                                                        </div>
                                                        <div className="ui fifteen wide column">
                                                            <div className="song-name">{`${elem.title}`}</div>
                                                            <div className="small-400" style={{display: "inline-block"}}>&nbsp;&nbsp;Par&nbsp;</div><div className="small-500-color" style={{display: "inline-block"}}>{`${elem.artist}`}</div>
                                                            <br/>
                                                            <div className="small-400-color" style={{display: "inline-block"}}>Modifié il y a 2 jours &bull; Partagée avec</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>                            
                                        </div>
                                    </div>
                                </div>
                                
                            }
                    </Translation>
                ) 
            })
        }
        if (this.state.collabMedias.length > 0 && this.state.panneau === PANNEAU_COLLABORATEUR) {
            tableauMedias = this.state.collabMedias.map((elem, _idx)=>{
                return (
                    <Translation>
                        {
                            t =>
                                <div key={_idx} style={{marginTop: "20px"}}>
                                    <div className="ui three column grid">
                                        <div className="ui row">
                                            <div className="ui thirteen wide column">
                                                <div className="ui three column grid cliquable" onClick={()=>{window.location.href = `/oeuvre/sommaire/${elem.mediaId}`}} >
                                                    <div className="ui row">
                                                        <div className="ui one wide column">
                                                            <i className="file image outline icon big grey"></i>
                                                        </div>
                                                        <div className="ui fifteen wide column">
                                                            <div className="song-name">{`${elem.title}`}</div>
                                                            <div className="small-400" style={{display: "inline-block"}}>&nbsp;&nbsp;Par&nbsp;</div><div className="small-500-color" style={{display: "inline-block"}}>{`${elem.artist}`}</div>
                                                            <br/>
                                                            <div className="small-400-color" style={{display: "inline-block"}}>Modifié il y a 2 jours &bull; Partagée avec</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>                            
                                        </div>
                                    </div>
                                </div>     
                            }
                    </Translation>
                ) 
            })
        }  
        if (this.state.medias.length == 0 && this.state.panneau === PANNEAU_INITIATEUR) {  // If no initiator musical pieces present for user
            return (
                <Translation>
                {
                    t =>
                    <div key="blank"style={{marginTop: "20px"}}>
                        <div className="ui three column grid">
                            <div className="ui row">
                                <div className="ui thirteen wide column">
                                    <div className="ui row">
                                    <div className="heading2">{t('tableaudebord.navigation.0')}</div>
                                        <br/>
                                        <div className="medium-500">
                                            <div className="ui twelve wide column">
                                                <span style={this.state.panneau === PANNEAU_INITIATEUR ? {cursor: "pointer", borderBottom: "solid green"} : {cursor: "pointer"}} className={`small-500${this.state.panneau === PANNEAU_INITIATEUR ? '-color' : ''}`} onClick={()=>{this.afficherPanneauInitiateur()}}>{t('tableaudebord.pieces.0')}</span>&nbsp;&nbsp;
                                                <span style={this.state.panneau === PANNEAU_COLLABORATEUR ? {cursor: "pointer", borderBottom: "solid green"} : {cursor: "pointer"}} className={`small-500${this.state.panneau === PANNEAU_COLLABORATEUR ? '-color' : ''}`} onClick={()=>{this.afficherPanneauCollaborateur()}}>{t('tableaudebord.pieces.1')}</span>
                                            </div>
                                            <div className="ui one wide column" />    
                                        </div>
                                        <br/>
                                        <br/>
                                        <div className="illustration">
                                            <div className="medium-500">👀</div>
                                        </div>
                                        <div className="ui fifteen wide column">
                                            <br/>
                                            <div className="medium-500">{t('tableaudebord.vide.preambule')}</div>
                                            <div className="medium-500" style={{fontWeight: '100'}}>{t('tableaudebord.vide.indication')}</div>
                                        </div>
                                    </div>
                                </div>                            
                            </div>
                        </div>
                    </div>
                }
            </Translation>
            )
        }
        if (this.state.collabMedias.length == 0 && this.state.panneau === PANNEAU_COLLABORATEUR) {  // If no collaborator musical pieces present for user
            return (
                <Translation>
                    {
                        t =>
                            <div key="blank"style={{marginTop: "20px"}}>
                                <div className="ui three column grid">
                                    <div className="ui row">
                                        <div className="ui thirteen wide column">
                                            <div className="ui row">
                                            <div className="heading2">{t('tableaudebord.navigation.0')}</div>
                                                <br/>
                                                <div className="medium-500">
                                                    <div className="ui twelve wide column">
                                                        <span style={this.state.panneau === PANNEAU_INITIATEUR ? {cursor: "pointer", borderBottom: "solid green"} : {cursor: "pointer"}} className={`small-500${this.state.panneau === PANNEAU_INITIATEUR ? '-color' : ''}`} onClick={()=>{this.afficherPanneauInitiateur()}}>{t('tableaudebord.pieces.0')}</span>&nbsp;&nbsp;
                                                        <span style={this.state.panneau === PANNEAU_COLLABORATEUR ? {cursor: "pointer", borderBottom: "solid green"} : {cursor: "pointer"}} className={`small-500${this.state.panneau === PANNEAU_COLLABORATEUR ? '-color' : ''}`} onClick={()=>{this.afficherPanneauCollaborateur()}}>{t('tableaudebord.pieces.1')}</span>
                                                    </div>
                                                    <div className="ui one wide column" />    
                                                </div>
                                                <br/>
                                                <br/>
                                                <div className="illustration">
                                                    <div className="medium-500">👀</div>
                                                </div>
                                                <div className="ui fifteen wide column">
                                                    <br/>
                                                    <div className="medium-500">{t('tableaudebord.vide.preambule')}</div>
                                                    <div className="medium-500" style={{fontWeight: '100'}}>{t('tableaudebord.vide.indication')}</div>
                                                </div>
                                            </div>
                                        </div>                            
                                    </div>
                                </div>
                            </div>
                    }
                </Translation>
            )
        }
        return (
            <Translation>
                {
                    t=>
                        <div>
                            <div className="heading2">{t('tableaudebord.navigation.0')}</div>
                            <br/>
                            <div className="medium-500">{toggle}</div>
                            <br/>
                            <ul>{tableauMedias}</ul>                            
                        </div>
                }
            </Translation>
        )
    }
}


