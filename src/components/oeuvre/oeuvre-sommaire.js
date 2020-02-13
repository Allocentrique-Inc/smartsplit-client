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
import { Progress } from 'semantic-ui-react'
import { toast } from 'react-toastify'

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
        const t = this.props.t
        if (Identite.usager) {
            this.setState({ user: Identite.usager}, async ()=>{
                if(this.props.invitations) {toast.success( t('flot.invitations.envoyees') )}
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
                    this.setState({p0: _p0})
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

            // Proposition la plus récente
            let p0 = this.state.p0            

            // Progression du partage
            let pctPartage = 0, pctDocumentation = 0

            // Calcul de la progression du partage
            if(p0) {
                /**
                 *  Partage © (avec données documentées ou bouton «Plus tard» cliqué) =20%
                    Si l’utilisateur sort immédiatement 
                    Partage ✪ (avec données documentées) =40%
                    Partage ℗ (avec données documentées) =60%
                    Sommaire = 70%
                    Sommaire envoyé aux invités 80%
                    Sommaire envoyé aux invités approbation = 20% résiduel divisé par le nombre d’approbation attendues. Si 5 collabos, chaque collabo qui a approuvé vaut 4%.
                    Approuvé = 100% (bouton «Continuer» devient «Voir le sommaire»)
                 */
                if(p0.rightsSplits) {
                    if(p0.rightsSplits.workCopyrightSplit) {
                        if(p0.rightsSplits.workCopyrightSplit.lyrics.length > 0 || p0.rightsSplits.workCopyrightSplit.music.length > 0) {
                            pctPartage += 20
                        }
                    }
                    if(p0.rightsSplits.performanceNeighboringRightSplit) {
                        if(p0.rightsSplits.performanceNeighboringRightSplit.principal.length > 0 || p0.rightsSplits.performanceNeighboringRightSplit.accompaniment.length > 0) {
                            pctPartage += 20
                        }
                    }
                    if(p0.rightsSplits.masterNeighboringRightSplit) {
                        if(p0.rightsSplits.masterNeighboringRightSplit.split.length > 0 || p0.rightsSplits.masterNeighboringRightSplit.split.length > 0) {
                            pctPartage += 20
                        }
                    }
                    if(p0.etat === "PRET") {
                        pctPartage += 10
                    }
                    if(p0.etat === "VOTATION") {
                        pctPartage += 20
                    }
                    if(p0.etat === "ACCEPTE") {
                        pctPartage = 100
                    }
                }
            }

            let classeEtatDerniererProposition = "sommaire-nouveau"
            if(p0) {
                classeEtatDerniererProposition = (p0.etat === 'ACCEPTE') ? "sommaire-approuve" : (p0.etat === 'REFUSE' ? "sommaire-desaprouve" : ((p0.etat === 'PRET') ? "sommaire-envoie" : "sommaire-attente"))
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
                                    <div className="ui heading3 carrefour">{t('flot.split.documente-ton-oeuvre.preambules.titre1')}</div>                                    

                                    {
                                        <>
                                            <div className="ui heading4">
                                                {t('flot.split.documente-ton-oeuvre.preambules.sous-titre1')}&nbsp;&nbsp;
                                                
                                                <span 
                                                    style={{marginLeft: "1rem"}} 
                                                    className={classeEtatDerniererProposition}>
                                                    { p0 ? t(`flot.split.etat.${p0.etat}`) : t(`flot.split.etat.NOUVEAU` )}
                                                </span>
                                            </div>
                                            <div className="ui medium-400" style={{color: "#687A8B", fontStyle: "normal", fontWeight: "normal", marginBottom: "3rem"}}>
                                                {t('flot.split.documente-ton-oeuvre.preambules.intro1')}                                                    
                                            </div>
                                            <Progress size="tiny" success={p0 && p0.etat !== "REFUSE"} warning={!p0} error={p0 && p0.etat === "REFUSE"} percent={pctPartage} />
                                        </>
                                    }                                    

                                    <div className={`ui medium button ${p0 ? "inverse" : ""}`}
                                        style={{ marginTop: "20px", marginLeft: "0px", minWidth: "125px" }} 
                                        onClick={() => {                                            
                                            if (!p0) {
                                                utils.naviguerVersNouveauPartage(this.state.mediaId)                                                
                                            } else {
                                                utils.naviguerVersSommairePartage(this.state.mediaId)                                                
                                            }
                                        }}>
                                        {!p0 && t('flot.split.action.commencer')}
                                        {p0 && pctPartage < 100 && t('flot.split.action.continuer')}
                                        {p0 && pctPartage === 100 && t('flot.split.action.sommaire')}
                                    </div>
                                </div>
                                <div className="ui row etape">
                                    <div className="ui heading3 carrefour">{t('flot.split.documente-ton-oeuvre.preambules.titre2')}</div>
                                    <div className="ui heading4">{t('flot.split.documente-ton-oeuvre.preambules.sous-titre2')}</div>
                                    <div className="ui medium-400" style={{color: "#687A8B", fontStyle: "normal", fontWeight: "normal", marginBottom: "3rem"}}>
                                        {t('flot.split.documente-ton-oeuvre.preambules.intro2')}
                                    </div>
                                    <Progress size="tiny" success percent={pctDocumentation} />                                    
                                    <div className="ui medium button"
                                        style={{ marginTop: "20px", marginLeft: "0px", minWidth: "125px" }} 
                                        onClick={() => {
                                            utils.naviguerVersDocumentation(this.state.media.mediaId)
                                        }}>
                                        {t('flot.split.action.commencer')}
                                    </div>
                                </div>
                            </div>
                            <div className="ui five wide column" style={{marginLeft: "3rem"}}>
                                <div style={{
                                    position: "relative",
                                    top: "5rem",
                                    left: "7rem"
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