
import React, { Component } from 'react'
import { Translation } from 'react-i18next'
import moment from 'moment'
import axios from 'axios'

export default class LigneMedia extends Component {

    constructor(props) {
        super(props) 
        this.state = {
            media: props.media,
            user: props.user
        }
    }

    componentWillMount() {
        // Récupération de la dernière proposition du média
        axios.get(`http://api.smartsplit.org:8080/v1/proposal/media/${this.state.media.mediaId}`)
        .then(res=>{
            let _pS = res.data
            let _p0
            _pS.forEach(elem=>{
                if (!_p0) {
                    _p0 = elem
                }
                if(_p0._d > elem._d) {
                    _p0 = elem
                }
            })
            this.setState({p0: _p0})
        })
    }

    render() {

        let elem = this.state.media
        let _p = this.state.p0

        let nouveauDisabled = false, continuerDisabled = true, sommaireDisabled = true

        if(_p) {
            if (_p.etat !== 'REFUSE' || this.state.propositions.length === 0) {
                nouveauDisabled = true
            }    
            if(_p.etat === 'PRET' || _p.etat === 'ACCEPTE' || _p.etat === 'VOTATION') {
                sommaireDisabled = false
            }
            if(_p.etat === 'BROUILLON' && _p.initiator.id === this.state.user.username) {
                continuerDisabled = false
            }           
        }        

        return (
            <Translation>
                {
                    (t, i18n) =>
                        <div style={{marginTop: "20px"}}>
                            <div className="ui grid">
                            
                                <div className="ui row">
                                    <div className="ui one wide column cliquable" onClick={()=>{window.location.href = `/oeuvre/sommaire/${elem.mediaId}`}}>
                                        <i className="file image outline icon big grey"></i>
                                    </div>
                                    <div className="ui nine wide column" onClick={()=>{window.location.href = `/oeuvre/sommaire/${elem.mediaId}`}}>
                                        <div className="song-name">{`${elem.title}`}</div>
                                        <div className="small-400" style={{display: "inline-block"}}>&nbsp;&nbsp;{t('tableaudebord.pieces.par')}&nbsp;</div><div className="small-500-color" style={{display: "inline-block"}}>{`${elem.artist}`}</div>
                                        <br/>
                                        <div className="small-400-color" style={{display: "inline-block"}}>{i18n.lng && moment(elem.modificationDate).locale(i18n.lng.substring(0,2)).fromNow()} &bull; {t('tableaudebord.pieces.partageAvec')}</div>
                                    </div>
                                    <div className="ui four wide column">
                                        {
                                            !continuerDisabled && (
                                                <div className={`ui medium button`} onClick={
                                                    ()=>{
                                                        window.location.href=`/partager/existant/${_p.uuid}`
                                                    }
                                                    }>
                                                    {t('flot.proposition.continuer')}
                                                </div>
                                            )
                                        }
                                        {
                                            !nouveauDisabled && (
                                                <div className={`ui medium button`} onClick={
                                                    ()=>{
                                                        window.location.href=`/partager/nouveau/${this.state.media.mediaId}`
                                                    }
                                                    }>
                                                    {t('flot.proposition.nouvelle')}
                                                </div>
                                            )
                                        }
                                        {
                                            !sommaireDisabled && (                                        
                                                <div className={`ui medium button`} onClick={
                                                    ()=>{
                                                        window.location.href=`/partager/${this.state.media.mediaId}`
                                                    }
                                                    }>
                                                    {t('flot.proposition.sommaire')}
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        
                        </div>     
                    }
            </Translation>
        )
    }
}