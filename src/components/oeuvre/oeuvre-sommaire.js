import React, { Component } from 'react'

import axios from 'axios'

import Entete from '../entete/entete'

import 'react-confirm-alert/src/react-confirm-alert.css'
import { Auth } from 'aws-amplify'
import { toast } from '@aws-amplify/ui'

import Login from '../auth/Login'
import { confirmAlert } from 'react-confirm-alert'

import cassette from '../../assets/images/compact-cassette.png'
import { Translation } from 'react-i18next';
import moment from 'moment'

export default class SommaireOeuvre extends Component {

    constructor(props) {
        super(props)
        this.state = {
            mediaId: props.mediaId
        }
    }

    componentWillMount() {

        Auth.currentAuthenticatedUser()
            .then(res => {
                this.setState({ user: res })
                this.getMedia()
                axios.get(`http://api.smartsplit.org:8080/v1/proposal/media/${this.state.mediaId}`)
                .then(res=>{
                    let _p0
                    res.data.forEach(_p=>{
                        if(!_p0)
                            _p0 = _p
                        if(_p0._d < _p._d)
                            _p0 = _p
                    })
                    this.setState({p0: _p0})
                })
            })
            .catch(err => {
                toast.error(err.message)
                confirmAlert({
                    title: ``,
                    message: ``,
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
                        <Translation>
                            {
                                t =>
                                    <Login message={ t('connexion.titre.oeuvre') } fn={ (user) => {
                                        onClose()
                                        this.setState({ user: user })
                                    } }/>
                            }
                        </Translation>
                })
            })
    }

    getMedia() {
        axios.get(`http://api.smartsplit.org:8080/v1/media/${ this.state.mediaId }`)
            .then(res => {
                let media = res.data.Item
                this.setState({ media: media })
            })
    }

    majTitre() {
        let titre = document.getElementById('titre').value
        axios.patch(`http://api.smartsplit.org:8080/v1/media/${ this.state.media.mediaId }/title`, {
            mediaId: this.state.media.mediaId,
            title: titre
        })
        .then(() => {
            this.getMedia()
        })
    }

    editerTitre(edition) {
        this.setState({ editerTitre: edition })
    }

    render() {
        let _m = ""
        if (this.state.media) {
            let artiste = this.state.media.artist
            let contenu = (<div className="ui nine wide column"></div>)
            //let misAJourLe = moment(this.state.media.modificationDate).fromNow()
            return (
                <Translation>
                    {
                        (t, i18n) =>
                            <div className="ui grid">
                                <div className="ui row"
                                     style={ { background: "#FAF8F9", paddingTop: "30px", paddingBottom: "0px" } }>
                                    <div className="ui two wide column"/>
                                    <div className="ui fourteen wide column">
                                        <Entete contenu={ contenu } navigation={ '/accueil' }
                                                profil={ this.state.user }/>
                                    </div>
                                </div>
                                <div className="ui row" style={ { background: "#FAF8F9" } }>
                                    <div className="ui two wide column"></div>
                                    <div className="ui eleven wide column"></div>
                                </div>
                                <div className="ui row" style={ { background: "#FAF8F9" } }>
                                    <div className="ui two wide column"/>
                                    <div className="ui eleven wide column">
                                        <div className="ui row">
                                            <div className="ui twelve wide column grid">
                                                <div className="ui one wide column">
                                                    <i className="file image outline icon huge grey"
                                                       style={ { background: "#F2EFF0" } }></i>
                                                </div>
                                                <div className="ui fourteen wide column">
                                                    <div className="ui row">
                                                        {
                                                            this.state.editerTitre &&
                                                            (
                                                                <div className="ui input">
                                                                    <input
                                                                        size="50"
                                                                        id="titre"
                                                                        type="text"
                                                                        placeholder="Saisir un titre"
                                                                        defaultValue={ this.state.media.title }
                                                                        onKeyPress={ (e) => {
                                                                            if (e.key === "Enter") {
                                                                                this.majTitre()
                                                                                this.editerTitre(false)
                                                                            }
                                                                        } }
                                                                    ></input>
                                                                    <i
                                                                        onClick={ () => {
                                                                            this.majTitre();
                                                                            this.editerTitre(false)
                                                                        } }
                                                                        className="save alternate icon grey big"
                                                                        style={ {
                                                                            cursor: "pointer",
                                                                            paddingTop: "5px",
                                                                            paddingLeft: "5px"
                                                                        } }>
                                                                    </i>
                                                                </div>
                                                            )
                                                        }
                                                        {
                                                            !this.state.editerTitre &&
                                                            (
                                                                <h1>{ `${ this.state.media.title }` }&nbsp;&nbsp;&nbsp;
                                                                    <i
                                                                        onClick={ () => {
                                                                            this.editerTitre(true)
                                                                        } }
                                                                        className="pencil alternate icon grey"
                                                                        style={ { cursor: "pointer" } }>
                                                                    </i>
                                                                </h1>
                                                            )
                                                        }
                                                    </div>
                                                    <div className="ui row">
                                                        <div className="small-400"
                                                             style={ { display: "inline-block" } }>{ t('oeuvre.creePar') }&nbsp;</div>
                                                        <div className="small-500-color"
                                                             style={ { display: "inline-block" } }>{ `${ artiste }` }&nbsp;</div>
                                                        <div className="small-400-color"
                                                             style={ { display: "inline-block" } }>&bull; { i18n.lng && moment(this.state.media.creationDate).locale(i18n.lng.substring(0, 2)).fromNow() }</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="ui row">
                                    <div className="ui two wide column"/>
                                    <div className="ui six wide column">
                                        <div className="ui row etape">
                                            <div className="ui heading3">{ t('flot.split.documente-ton-oeuvre.preambules.titre1') }</div>
                                            <div className="ui heading1">{ t('flot.split.documente-ton-oeuvre.preambules.sous-titre1') }</div>

                                            <div className="ui medium-400">
                                                { t('flot.split.documente-ton-oeuvre.preambules.intro1') }
                                            </div>

                                            <div className="ui medium button"
                                                 style={ { marginTop: "50px", marginLeft: "0px" } } onClick={ () => {
                                                
                                                    let p0 = this.state.p0

                                                    if(!p0) {
                                                        window.location.href = `/partager/nouveau/${ this.state.mediaId }`
                                                    } else {
                                                        window.location.href = `/partager/${ this.state.mediaId }`
                                                    }
                                                                                                    
                                            } }>
                                                { t('flot.split.action.commencer') }
                                            </div>
                                        </div>
                                        <div className="ui row etape">
                                            <div className="ui heading3">{ t('flot.split.documente-ton-oeuvre.preambules.titre2') }</div>
                                            <div className="ui heading1">{ t('flot.split.documente-ton-oeuvre.preambules.sous-titre2') }</div>
                                            <div className="ui medium-400">
                                                { t('flot.split.documente-ton-oeuvre.preambules.intro2') }
                                            </div>
                                            <div className="ui medium button"
                                                 style={ { marginTop: "50px", marginLeft: "0px" } } onClick={ () => {
                                                window.location.href = `/documenter/${ this.state.media.mediaId }`
                                            } }>
                                                { t('flot.split.action.commencer') }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="ui five wide column" style={ { padding: "50px" } }>
                                        <div style={ {
                                            position: "absolute",
                                            top: "85px",
                                            left: "135px",
                                            width: "55%"
                                        } }>
                                            { this.state.media.title } { t('oeuvre.par') } { artiste }
                                        </div>
                                        <img alt="médium" src={ cassette }/>
                                    </div>
                                </div>
                            </div>
                    }
                </Translation>
            )
        } else {
            return (
                <div>{ _m }</div>
            )
        }
    }

}
