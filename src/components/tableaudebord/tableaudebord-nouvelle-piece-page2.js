import {config, journal, AyantsDroit, Identite} from '../../utils/application'
import React, { Component } from 'react'
import RightHolderOptions from '../page-assistant/right-holder-options'
import ChampSelectionMultipleAyantDroit from '../page-assistant/champ-selection-multiple-ayant-droit'
import ChampTeleversement from '../page-assistant/champ-televersement'
import { toast } from 'react-toastify'
import ChampListeEntiteMusicaleAssistant from '../formulaires/champ-liste-entite-musicales'
import InfoBulle from '../partage/InfoBulle'
import { withTranslation } from 'react-i18next'
import axios from 'axios'
import ModaleAnalyseAudio from '../modales/modale-analyse-audio'

const ORIGINALE = 0, ARRANGEMENT = 1 //, REPRISE = 2
const NOM = "Page2NouvellePiece"

class Page2NouvellePiece extends Component {

    constructor(props) {
        super(props)
        this.state = {
            auteur: props.auteur,
            rightHolders: props.rightHolders,
            assocUuidArtiste: props.assocUuidArtiste
        }
        this.modaleReconnaissance = this.modaleReconnaissance.bind(this)
        this.remplirChampsAnalyse = this.remplirChampsAnalyse.bind(this)
        this.ajouterEntiteArtistique = this.ajouterEntiteArtistique.bind(this)
        props.setFieldValue('type', "0")
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.auteur !== nextProps.auteur) {
            this.setState({ auteur: nextProps.auteur })
        }
        if (this.props.assocUuidArtiste !== nextProps.assocUuidArtiste) {
            this.setState({ assocUuidArtiste: nextProps.assocUuidArtiste })
        }
    }

    modaleReconnaissance(ouvert = true) {
        this.setState({ modaleReconnaissance: ouvert })
    }

    rightHolderOptions() {
        return RightHolderOptions(this.state.rightHolders);
    }

    remplirChampsAnalyse() {
        let i18n = this.props.i18n
        let analyse = this.state.analyse
        this.props.setFieldValue('title', analyse.title, false)
        this.props.setFieldValue('publisher', analyse.label ? analyse.label : analyse.artists[0].name, false)
        let oeuvrePar = analyse.artists[0].name
        this.props.setFieldValue('artist', oeuvrePar, false)
        this.props.setFieldValue('instrumental', true, false)
        this.props.setFieldValue('album', analyse.album.name, false)
        this.props.setFieldValue('durationMs', `${analyse.duration_ms}`, false)
        this.props.setFieldValue('isrc', analyse.external_ids.isrc, false)
        this.props.setFieldValue('upc', analyse.external_ids.upc, false)
        this.props.setFieldValue('publishDate', analyse.release_date, false)
        // Si l'oeuvrePar n'existe pas déjà, créer l'entité t.q. oeuvrePar => entite(oeuvrePar)
        let entites = this.state.entites
        let entiteExiste = false        
        entites.OPTIONS.forEach(e=>{            
            if(e.text === oeuvrePar) {
                entiteExiste = true
            }
        })
        if(!entiteExiste) {
            this.ajouterEntiteArtistique(oeuvrePar)
        }
        // Liens commerciaux
        let liensCommerciaux = []
        if (analyse.external_metadata.deezer) {
            let _url = `https://www.deezer.com/${i18n.language.substring(0, 2)}/album/${analyse.external_metadata.deezer.album.id}`
            liensCommerciaux.push({lien: _url, type: "deezer"})
        }
        if (analyse.external_metadata.spotify) {
            let _url = `https://open.spotify.com/track/${analyse.external_metadata.spotify.track.id}`
            liensCommerciaux.push({lien: _url,type: "spotify"})
        }
        if (analyse.external_metadata.youtube) {
            let _url = `https://www.youtube.com/watch?v=${analyse.external_metadata.youtube.vid}`
            liensCommerciaux.push({lien: _url,type: "youtube"})
        }
        this.props.setFieldValue('streamingServiceLinks', liensCommerciaux)
    }

    ajouterEntiteArtistique(e, cb) {        
        this.props.setFieldValue('artist', e)
        if(Identite.usager) {
            let username = Identite.usager.username
            let body = { username: username, entite: e }
            axios.post(`${config.API_URL}entities/`, body)
            .then(res => { if (cb) { cb() } })
            .catch(err => journal.error(NOM, err))
        }        
    }

    render() {
        let t = this.props.t, vedettes = "", rHs = this.props.values.rightHolders
        rHs && this.state.assocUuidArtiste && rHs.forEach((rH, idx) => {
            if (idx < rHs.length - 1) {
                vedettes = vedettes + this.state.assocUuidArtiste[rH] + ", "
            } else {
                vedettes = vedettes + this.state.assocUuidArtiste[rH]
            }
        })
        return (
            <React.Fragment>
                <div className="ui grid">
                    {
                        this.state.patience &&
                        (
                            <div className="container ui active dimmer">
                                <div className="ui text loader">{t("televersement.encours")}</div>
                            </div>
                        )
                    }
                    <div className="ui row">
                        <div className="ui column" />
                        <div className="ui twelve wide column">
                            <h2>
                                <i>{this.props.values.title}</i>
                                {vedettes && (
                                    <>&nbsp;(feat. <i>{vedettes}</i>)</>
                                )}
                                {this.props.values.artist && (
                                    <>&nbsp;{t("oeuvre.par")}&nbsp;<i>{this.props.values.artist}</i></>
                                )}
                            </h2>
                        </div>
                    </div>
                    {
                        this.props.values.type === "" + ORIGINALE && (
                            <div style={{ marginTop: "20px", fontSize: "16px", fontFamily: "IBM Plex Sans" }} className="ui row">
                                <div className="ui column" />
                                <div className="ui twelve wide column">
                                    <ChampListeEntiteMusicaleAssistant
                                        rightHolderId={this.props.parent.state.user.username}
                                        modele={"artist"}
                                        etiquette={t('oeuvre.attribut.etiquette.piecePar', { titre: this.props.values.title })}
                                        indication={t('oeuvre.attribut.indication.artiste')}
                                        requis={false}
                                        autoFocus={false}
                                        multiple={false}
                                        nomCommeCle={false}
                                        ajout={true}
                                        surAjout={(e, cb) => {
                                            let elem = e.target.parentElement.childNodes, entite
                                            if (elem.length === 2) {
                                                entite = elem[1].innerText
                                            } else {
                                                if (elem[0].childNodes.length === 2) {
                                                    entite = elem[0].childNodes[1].innerText
                                                } else {
                                                    if (elem.childNodes) {
                                                        entite = elem.childNodes[0].childNodes[1].innerText
                                                    } else {
                                                        if (elem.length === 1 && elem[0].childNodes && elem[0].childNodes[1]) {
                                                            entite = elem[0].childNodes[0].childNodes[1].innerText
                                                        }
                                                    }
                                                }
                                            }
                                            if (entite) {
                                                this.ajouterEntiteArtistique(entite, cb)
                                            } else {
                                                this.props.setFieldValue('artist', '')
                                            }
                                        }}
                                        onRef={liste => this.setState({ entites: liste })}
                                    />
                                </div>
                            </div>
                        )}
                    {
                        this.props.values.type === "" + ARRANGEMENT && (
                            <>
                                <div style={{ marginTop: "20px" }} className="ui row">
                                    <div className="ui column" />
                                    <div className="ui twelve wide column">
                                        <ChampListeEntiteMusicaleAssistant
                                            rightHolderId={this.props.parent.state.user.username}
                                            modele={"artist"}
                                            etiquette={t('oeuvre.attribut.etiquette.piecePar', { titre: this.props.values.title })}
                                            indication={t('oeuvre.attribut.indication.artiste')}
                                            requis={false}
                                            autoFocus={false}
                                            multiple={false}
                                            nomCommeCle={false}
                                            ajout={true}
                                            surAjout={(e, cb) => {
                                                let entite = e.target.parentElement.childNodes[1].innerText
                                                this.ajouterEntiteArtistique(entite, cb)
                                            }}
                                            onRef={
                                                liste => this.setState({ entites: liste })
                                            }

                                        />
                                    </div>
                                </div>
                                <div style={{ marginTop: "20px" }} className="ui row">
                                    <div className="ui column" />
                                    <div className="ui twelve wide column">
                                        <ChampListeEntiteMusicaleAssistant
                                            modele="arrangeur"
                                            etiquette={t('oeuvre.attribut.etiquette.arrangementPar', { titre: this.props.values.title })}
                                            indication={t('oeuvre.attribut.indication.arrangeur')}
                                            requis={false}
                                            autoFocus={false}
                                            multiple={false}
                                            nomCommeCle={false}
                                            ajout={true}
                                            surAjout={(e, cb) => {
                                                let entite = e.target.parentElement.childNodes[1].innerText
                                                this.ajouterEntiteArtistique(entite, cb)
                                            }}
                                            onRef={
                                                liste => this.setState({ entites: liste })
                                            }
                                        />
                                    </div>
                                </div>
                            </>
                        )}
                    <div style={{ margin: "20px 0 20px 0", width: "400px" }} className="ui row">
                        <div className="ui column" />
                        <div className="ui twelve wide column">
                            <ChampSelectionMultipleAyantDroit
                                pochette={this.props.pochette}
                                items={this.rightHolderOptions()}
                                label={t('oeuvre.titre.vedette')}
                                createLabel={t('flot.split.documente-ton-oeuvre.documenter.collabo')}
                                placeholder={t('oeuvre.attribut.etiquette.vedette')}
                                value={this.props.values.vedettes}
                                onChange={ids => {
                                    // Protéger la liste des valeurs non-uuid
                                    let _ids = []
                                    const UUID_REGEXP = new RegExp("[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}")
                                    if (ids) {
                                        ids.forEach(id => {
                                            if (UUID_REGEXP.test(id)) {
                                                _ids.push(id)
                                            }
                                        })
                                        this.props.setFieldValue('rightHolders', _ids)
                                    }
                                }}
                                fn={(nouveau) => {
                                    let _rHs = this.props.values.rightHolders
                                    // Ajoute le nouveau s'il ne fait pas déjà partie de la liste
                                    if (!_rHs.includes(nouveau)) {_rHs.push(nouveau)}
                                    this.props.setFieldValue('rightHolders', _rHs)
                                    // recharger les ayant-droits
                                    AyantsDroit.rafraichirListe( ()=>{
                                        // Ordonnancement simple uuid -> nom d'artiste
                                        let assocUuidArtiste = this.state.assocUuidArtiste
                                        AyantsDroit.ayantsDroitBrut.forEach(e => {
                                            assocUuidArtiste[e.rightHolderId] = e.artistName || `${e.firstName} ${e.lastName}`
                                        })                                        
                                        this.setState({ rightHolders: AyantsDroit.ayantsDroitBrut }, 
                                            () => this.setState({ assocUuidArtiste: assocUuidArtiste })
                                        )
                                    })                                   
                                }}
                            />
                        </div>
                    </div>
                    <div className="ui row">
                        <div className="ui sixteen wide column">
                            <ChampTeleversement
                                label="Fichier  "
                                conserverNomFichier={true}
                                info={<InfoBulle pos={{ x: 100, y: 450 }} text={t('composant.televersement.soustitre')} />}
                                access="private"
                                onAccessChange={value =>{
                                        this.setState({accesAudio: value})                                                        
                                        let fichier, files = this.props.values.files
                                        if(files.audio) {
                                            fichier = files.audio.files[0] // Seul le premier est considéré
                                            if (fichier) {
                                                // Remplace l'accès du fichier existant
                                                fichier.access = value
                                                files.audio.files[0] = fichier
                                                this.props.setFieldValue('files', files)
                                            }                                                            
                                        }                                                        
                                    }                                                    
                                }
                                pochette={this.props.pochette}
                                onFileChange={value => {
                                    if (value) {      
                                        this.setState({ patience: true })
                                        let fichier = value
                                        // Réinitialise le lecteur audio, qui est contenu dans la liste des médias
                                        this.props.parent.props.parent.state.audio.stopEtJouer(fichier)
                                        let fd = new FormData()
                                        fd.append('file', fichier)
                                        let mediaId
                                        if(this.props.parent) {
                                            mediaId = this.props.parent.state.mediaId
                                        }
                                        fd.append('mediaId', mediaId)
                                        axios
                                            .post(`${config.FICHIERS_SRV_URL}envoi`, fd)
                                            .then(res => {
                                                let f = res.data
                                                if (f.music.err) {
                                                    switch (f.music.err) {
                                                        case "AUDIO-MAUVAISE-LECTURE":
                                                            toast.warn(t('flot.split.traitement.acr.erreur-mauvaise-lecture'))
                                                            journal.warn(NOM, t('flot.split.traitement.acr.erreur-mauvaise-lecture'))
                                                            break;
                                                        case "AUDIO-INCONNU":
                                                            toast.warn(t('flot.split.traitement.acr.erreur-inconnu'))
                                                            journal.warn(NOM, t('flot.split.traitement.acr.erreur-inconnu'))
                                                            break;
                                                        default:
                                                            toast.warn(f.music.err)
                                                            journal.warn(NOM, f.music.err)
                                                    }
                                                }
                                                if (f && !f.music.err) {
                                                    let analyse = f.music[0] // NB. Il peut y avoir plus d'un résultat
                                                    this.setState({ analyse: analyse }, () => this.modaleReconnaissance())
                                                    this.props.setFieldValue('fichier', f.empreinte)
                                                    let fichiers = []                                                
                                                    let access = this.state.accesAudio ? this.state.accesAudio : "private"
                                                    fichiers.push({file: f.nom, md5: f.empreinte, access: access})
                                                    this.props.setFieldValue('files.audio.files', fichiers)
                                                } else {
                                                    let fichiers = []                                                                    
                                                    let access = this.state.accesAudio ? this.state.accesAudio : "private"
                                                    fichiers.push({file: fichier.name, access: access})
                                                    this.props.setFieldValue('files.audio.files', fichiers)
                                                }
                                            })
                                            .catch(err => {
                                                if (err) {
                                                    journal.error(NOM, err)
                                                    if (fichier) 
                                                        toast.error(t('flot.split.documente-ton-oeuvre.envoifichier.echec') + ` ${fichier.name}`)
                                                }
                                            })
                                            .finally(() => {
                                                this.setState({ patience: false })
                                            })
                                        this.props.parent.setState({ fichier: value })
                                    }
                                }}
                            />
                        </div>
                    </div>                    
                </div>
                {
                    this.state.modaleReconnaissance && (
                        <ModaleAnalyseAudio
                            open={this.state.modaleReconnaissance} analyse={this.state.analyse}
                            onClose={()=>this.modaleReconnaissance(false)} action={()=>{this.remplirChampsAnalyse()}} />                        
                    )
                }
            </React.Fragment>
        )
    }
}

export default withTranslation()(Page2NouvellePiece)