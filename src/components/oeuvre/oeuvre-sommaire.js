import React, { Component } from 'react'
import axios from 'axios'
import Entete from '../entete/entete'
import cassette from '../../assets/images/compact-cassette.svg'
import { withTranslation } from 'react-i18next'
import moment from 'moment'
import ModaleConnexion from '../auth/Connexion'
import placeholder from '../../assets/images/placeholder.png'
import {Identite, journal, config, utils} from '../../utils/application'
import editIcon from '../../assets/svg/icons/edit.svg'

const NOM = "SommaireOeuvre"

class SommaireOeuvre extends Component {

    constructor(props) {
        super(props)
        this.state = {
            mediaId: props.mediaId
        }
        moment.defaultFormat = "DD-MM-YYYY HH:mm"
    }

    componentWillMount() {
        if (Identite.usager) {
            this.setState({ user: Identite.usager}, async ()=>{
                this.getMedia()
                try {
                    let res = await axios.get(`${config.API_URL}proposal/media/${this.state.mediaId}`)                
                    let _p0
                    res.data.forEach(_p => {
                        if (!_p0)
                            _p0 = _p
                        if (_p0._d < _p._d)
                            _p0 = _p
                    })
                    this.setState({ p0: _p0 })
                } catch(err) {
                    journal.error(NOM, err)
                }
            })
        } else {
            this.setState({modaleConnexion: true})
        }
    }

    getMedia() {
        axios.get(`${config.API_URL}media/${this.state.mediaId}`)
            .then(res => {
                let media = res.data.Item
                this.setState({ media: media })
            })
    }

    majTitre() {
        let titre = document.getElementById('titre').value
        axios.patch(`${config.API_URL}media/${this.state.media.mediaId}/title`, {
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

        const t = this.props.t, i18n = this.props.i18n
        if (this.state.media) {

            let artiste = this.state.media.artist
            let contenu = (<div className="ui seven wide column"></div>)

            let imageSrc = placeholder
            if(this.state.media) {
                let elem = this.state.media
                if(elem.files && elem.files.cover && elem.files.cover.files && elem.files.cover.files.length > 0) {
                    elem.files.cover.files.forEach(e=>{
                        if(e.access === 'public') {
                            imageSrc = `${config.IMAGE_SRV_ARTISTES_URL}${elem.mediaId}/cover/${e.file}`
                        }
                    })
                }
            }

            return (                
                <>                                                        
                    <div className="ui grid">
                        <div className="ui row" style={{ background: "#FAF8F9" }}>
                            <div className="ui one wide column"></div>
                            <div className="ui sixteen wide column">
                                <Entete contenu={contenu} navigation={()=>utils.naviguerVersAccueil()} profil={this.state.user} />                               
                            </div>
                        </div>
                        <div className="ui row" style={{ background: "#FAF8F9" }}>
                            <div className="ui two wide column" />
                            <div className="ui eleven wide column">
                                <div className="ui row">
                                    <div className="ui twelve wide column grid">
                                        <div className="ui two wide column">
                                            <img alt="Vignette" style={{width: "64px", height: "64px"}} src={imageSrc} />                                                    
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
                                                                defaultValue={this.state.media.title}
                                                                onKeyPress={(e) => {
                                                                    if (e.key === "Enter") {
                                                                        this.majTitre()
                                                                        this.editerTitre(false)
                                                                    }
                                                                }}
                                                            ></input>
                                                            <i
                                                                onClick={() => {
                                                                    this.majTitre();
                                                                    this.editerTitre(false)
                                                                }}
                                                                className="save alternate icon grey big"
                                                                style={{
                                                                    cursor: "pointer",
                                                                    paddingTop: "5px",
                                                                    paddingLeft: "5px"
                                                                }}>
                                                            </i>
                                                        </div>
                                                    )
                                                }
                                                {
                                                    !this.state.editerTitre &&
                                                    (
                                                        <h1>{`${this.state.media.title}`}&nbsp;&nbsp;&nbsp;
                                                            <img
                                                                alt="edition"
                                                                onClick={() => {
                                                                    this.editerTitre(true)
                                                                }}
                                                                src={editIcon}
                                                                style={{ cursor: "pointer" }}>
                                                            </img>
                                                        </h1>
                                                    )
                                                }
                                            </div>
                                            <div className="ui row">
                                                <div className="small-400"
                                                    style={{ display: "inline-block" }}>{t('oeuvre.creePar')}&nbsp;</div>
                                                <div className="small-500-color"
                                                    style={{ display: "inline-block" }}>{`${artiste}`}&nbsp;</div>
                                                <div className="small-400-color"
                                                    style={{ display: "inline-block" }}>&bull; {i18n.language && moment( new Date(parseInt(this.state.media.creationDate)), moment.defaultFormat).locale(i18n.language.substring(0, 2)).fromNow()}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="ui row">
                            <div className="ui two wide column" />
                            <div className="ui six wide column">
                                <div className="ui row etape">
                                    <div className="ui heading3">{t('flot.split.documente-ton-oeuvre.preambules.titre1')}</div>
                                    <div className="ui heading1">{t('flot.split.documente-ton-oeuvre.preambules.sous-titre1')}</div>

                                    <div className="ui medium-400">
                                        {t('flot.split.documente-ton-oeuvre.preambules.intro1')}
                                    </div>

                                    <div className="ui medium button"
                                        style={{ marginTop: "20px", marginLeft: "0px" }} onClick={() => {

                                            let p0 = this.state.p0

                                            if (!p0) {
                                                window.location.href = `/partager/nouveau/${this.state.mediaId}`
                                            } else {
                                                window.location.href = `/partager/${this.state.mediaId}`
                                            }

                                        }}>
                                        {t('flot.split.action.commencer')}
                                    </div>
                                </div>
                                <div className="ui row etape">
                                    <div className="ui heading3">{t('flot.split.documente-ton-oeuvre.preambules.titre2')}</div>
                                    <div className="ui heading1">{t('flot.split.documente-ton-oeuvre.preambules.sous-titre2')}</div>
                                    <div className="ui medium-400">
                                        {t('flot.split.documente-ton-oeuvre.preambules.intro2')}
                                    </div>
                                    <div className="ui medium button"
                                        style={{ marginTop: "20px", marginLeft: "0px" }} onClick={() => {
                                            window.location.href = `/documenter/${this.state.media.mediaId}`
                                        }}>
                                        {t('flot.split.action.commencer')}
                                    </div>
                                </div>
                            </div>
                            <div className="ui five wide column" style={{ padding: "50px" }}>
                                <div style={{
                                    position: "absolute",
                                    top: "85px",
                                    left: "135px",
                                    width: "55%"
                                }}>
                                    {this.state.media.title} {t('oeuvre.par')} {artiste}
                                </div>
                                <img alt="médium" src={cassette} />
                            </div>
                        </div>
                    </div>
                </>                   
            )
        } else {
            let accueil = "accueil"
            if(this.props.pochette) {
                accueil = "accueil-pochette"
            }
            return (
                <div className={`tdb--cadre ui row ${accueil}`}>
                    <ModaleConnexion fn={()=>{
                        this.getMedia()
                        axios.get(`${config.API_URL}media/${this.state.mediaId}`)
                        .then(res => {
                            let _p0
                            res.data.forEach(_p => {
                                if (!_p0)
                                    _p0 = _p
                                if (_p0._d < _p._d)
                                    _p0 = _p
                            })
                            this.setState({ p0: _p0 })
                        })
                    }} parent={this} isOpen={this.state.modaleConnexion} />
                </div>
            )
        }
    }

}
export default withTranslation()(SommaireOeuvre)