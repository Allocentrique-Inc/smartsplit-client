import React, {Component} from 'react'
import { Translation } from 'react-i18next'
import axios from 'axios'
import { Auth } from 'aws-amplify';

import { toast } from 'react-toastify'
import LigneMedia from './tableaudebord-ligne-media'
import { Modal } from 'semantic-ui-react';
import AssistantOeuvre from '../oeuvre/assistant-oeuvre';
import NouvelleOeuvre from './tableaudebord-nouvelle-oeuvre';

const PANNEAU_INITIATEUR = 1, PANNEAU_COLLABORATEUR = 0

export default class ListePieces extends Component {

    constructor(props) {
        super(props)
        this.state={
            medias:[],
            collabMedias:[],
            creatorMedias: [],
            panneau:PANNEAU_INITIATEUR,
            collecte: {
                medias: false,
                collab: false
            },
            user: props.user
        }
        this.modaleNouvelleOeuvre = this.modaleNouvelleOeuvre.bind(this)
    }

    afficherPanneauInitiateur() {
        this.setState({panneau: PANNEAU_INITIATEUR})
    }
    
    afficherPanneauCollaborateur() {
        this.setState({panneau: PANNEAU_COLLABORATEUR})
    }

    collecte(obj) {
        let collecte = this.state.collecte
        if(obj.medias) {
            collecte.medias = true
        }
        if(obj.collab) {
            collecte.collab = true
        }
        this.setState({collecte: collecte}, ()=>{
            let _collecte = this.state.collecte
            if (_collecte.medias && _collecte.collab) {
                this.setState({patience: false})
            }
        })        
    }

    componentWillMount() {

        // Retrait des doublons
        // cleanArray removes all duplicated elements
        // https://www.unicoda.com/?p=579
        function cleanArray(array) {
            var i, j, len = array.length, out = [], obj = {};
            for (i = 0; i < len; i++) {
            obj[array[i]] = 0;
            }
            for (j in obj) {
            out.push(j);
            }
            return out;
        }
        
        try{

            this.setState({collecte: {
                medias: false,
                collabs: false
            }})
            this.setState({patience: true}, ()=>{
                Auth.currentSession().then(
                    session=>{
                    let that = this
                    let USER_ID = session.idToken.payload.sub
    
                    // Médias depuis les propositions
                    axios.get('http://dev.api.smartsplit.org:8080/v1/proposal')
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

                        initiatorMediaIds = cleanArray(initiatorMediaIds)
                        collabMediaIds = cleanArray(collabMediaIds)
                        
                        let _medias = [];
                        let ii = '';
                        let _collabMedias = [];
                        let jj = '';
    
                        initiatorMediaIds.forEach(async function(element) {
                            const res = await axios.get('http://dev.api.smartsplit.org:8080/v1/media/' + element)
                            _medias.push(res.data.Item)
                            ii++
                            if (initiatorMediaIds.length == ii) {
                                that.setState({medias: _medias})
                            }
                            that.collecte({medias: true})
                        })
    
                        collabMediaIds.forEach(async function(elm) {
                            const res = await axios.get('http://dev.api.smartsplit.org:8080/v1/media/' + elm)
                            _collabMedias.push(res.data.Item)
                            jj++
                            if (collabMediaIds.length == jj) {
                                that.setState({collabMedias: _collabMedias})
                            }
                            that.collecte({collab: true})
                        })

                        if(initiatorMediaIds.length === 0) {
                            that.collecte({medias: true})
                        }

                        if(collabMediaIds.length === 0) {
                            that.collecte({collab: true})
                        }
    
                    })
                    .catch((error) => {
                        toast.error(error.message)            
                    })

                    // Médias depuis les médias
                    let _cM = []                 
                    axios.get('http://dev.api.smartsplit.org:8080/v1/media')
                    .then(res=>{                        
                        let kk = 0
                        res.data.forEach(m=>{
                            // Si l'usager est le créateur il peut voir l'oeuvre
                            console.log(USER_ID, m.creator)
                            if(USER_ID === m.creator) {
                                _cM.push(m)
                                console.log('Créateur identifié')
                            }
                            kk++
                            console.log(kk, res.data.length)
                            if(kk === res.data.length) {
                                _cM = cleanArray(_cM)
                                this.setState({creatorMedias: _cM}, ()=>console.log(this.state.creatorMedias))
                            }
                        })                  
                    })
                    .catch(err=>console.log(err))
                    
                })
            })

            
        } catch (err) {
            console.log(err)
        }
    }

    modaleNouvelleOeuvre(ouvert = true) {
        this.setState({modaleOeuvre: ouvert})
    }

    render() {

        let rendu

        function aucuneOeuvre() {
            return (
                <Translation>
                {
                    t =>
                    <div style={{marginTop: "20px"}}>
                        <div className="ui three column grid">
                            <div className="ui row">
                                <div className="ui thirteen wide column">
                                    <div className="ui row">                                    
                                        <br/>                                        
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
        
        if (
            (!this.state.patience && this.state.medias.length == 0 && this.state.panneau === PANNEAU_INITIATEUR) ||
            (!this.state.patience && this.state.collabMedias.length == 0 && this.state.panneau === PANNEAU_COLLABORATEUR)
         ) {  // If no initiator musical pieces present for user
            rendu = aucuneOeuvre()
        } else {
            let tableauMedias = []
            if (this.state.medias.length + this.state.creatorMedias.length > 0 && this.state.panneau === PANNEAU_INITIATEUR) {
                tableauMedias = this.state.medias.map((elem, _idx)=>{
                    return (
                        <LigneMedia key={elem.mediaId} media={elem} user={this.state.user} />                    
                    )
                })
                tableauMedias = tableauMedias.concat(
                    this.state.creatorMedias.map((elem, _idx)=>{
                        return (
                            <LigneMedia key={elem.mediaId} media={elem} user={this.state.user} />                    
                        )
                    })
                )
            }
            if (this.state.collabMedias.length > 0 && this.state.panneau === PANNEAU_COLLABORATEUR) {
                tableauMedias = this.state.collabMedias.map((elem, _idx)=>{
                    return (
                        <LigneMedia key={elem.mediaId} media={elem} user={this.state.user} />                    
                    ) 
                })
            } 
            rendu = tableauMedias
        }        

        return (
            <Translation>
                {
                    t=>
                        <div>
                            {
                                !this.state.patience && (
                                    <div>                                                                                
                                        <div className="ui grid">
                                            <div className="ui row">
                                                <div className="heading2 ten wide column">{t('tableaudebord.navigation.0')}</div>
                                            </div>                                            
                                            <div className="ui row">
                                                <div className="ui nine wide column" />
                                                <div className="ui three wide column medium button" onClick={()=>{this.modaleNouvelleOeuvre()}}>
                                                    {t('tableaudebord.pieces.ajouter')}
                                                </div>
                                            </div>
                                            <div className="ui row">
                                                <div className="fifteen wide column">
                                                    <div className="medium-500">{toggle}</div>
                                                    <br/>
                                                    <ul>{rendu}</ul>
                                                </div>
                                            </div>                                            
                                        </div>
                                        <Modal
                                            open={this.state.modaleOeuvre}                                            
                                            onClose={()=>this.modaleNouvelleOeuvre(false)}
                                            size="large"
                                            closeIcon
                                            closeOnDimmerClick={false}
                                        >
                                            <Modal.Header>Créer une nouvelle pièce musicale</Modal.Header>
                                            <Modal.Content>
                                                <NouvelleOeuvre parent={this} user={this.state.user} />
                                            </Modal.Content>                                            
                                        </Modal>
                                    </div>
                                )
                            }
                            {
                                this.state.patience && (
                                    <div className="ui active dimmer">
                                        <div className="ui text loader">{t('entete.encours')}</div>
                                    </div>
                                )
                            }
                        </div>
                }
            </Translation>
        )
    }
}


