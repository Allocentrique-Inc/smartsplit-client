import React, { Component } from 'react'
// Assistant
import { Wizard } from "semantic-ui-react-formik"
// Traduction
import { Translation } from 'react-i18next'
// Composantes
import EntetePartage from './entete-partage'
// Pages de l'assistant
import PageAssistantPartageDroitAuteur from './assistant-partage-auteur'
import PageAssistantPartageDroitInterpretation from './assistant-partage-interpretation'
import PageAssistantPartageDroitEnregistrement from './assistant-partage-enregistrement'

import axios from 'axios'
import { toast } from 'react-toastify'

import 'react-confirm-alert/src/react-confirm-alert.css'
import { Auth } from 'aws-amplify'

import Login from '../auth/Login'
import { confirmAlert } from 'react-confirm-alert'

const ROLES = {
    COMPOSITEUR: "45745c60-7b1a-11e8-9c9c-2d42b21b1a31",
    AUTEUR: "45745c60-7b1a-11e8-9c9c-2d42b21b1a33",
    ARRANGEUR: "45745c60-7b1a-11e8-9c9c-2d42b21b1a32",
    ACCOMPAGNEMENT: "45745c60-7b1a-11e8-9c9c-2d42b21b1a37",
    PRODUCTEUR:  "45745c60-7b1a-11e8-9c9c-2d42b21b1a40",
    REALISATEUR: "45745c60-7b1a-11e8-9c9c-2d42b21b1a41",
    STUDIO: "45745c60-7b1a-11e8-9c9c-2d42b21b1a42",
    GRAPHISTE: "45745c60-7b1a-11e8-9c9c-2d42b21b1a43",
    CHANTEUR: "45745c60-7b1a-11e8-9c9c-2d42b21b1a35",
    MUSICIEN: "45745c60-7b1a-11e8-9c9c-2d42b21b1a36"
}

class AssistantPartage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mediaId: this.props.mediaId,
            uuid: this.props.uuid,
            user: null
        }
        this.enregistrerEtQuitter = this.enregistrerEtQuitter.bind(this)
        this.soumettre = this.soumettre.bind(this)
    }

    componentWillMount() {
        Auth.currentAuthenticatedUser()
        .then(res=>{
            this.setState({user: res})
            if(this.state.mediaId) {
                // Une nouvelle proposition pour un média                
                // Récupérer la dernière proposition pour le média                
                axios.get(`http://api.smartsplit.org:8080/v1/proposal/derniere-proposition/${this.state.mediaId}`)
                .then(res=>{
                    // Si elle existe, configuration de l'assistant avec cette dernière
                    console.log(res)
                    if(res.data) {
                        this.setState({proposition: res.data})
                    }
                })
                .finally(()=>{
                    this.recupererOeuvre()
                })
            } else if (this.state.uuid) {
                // Une proposition existante, poursuite de la proposition BROUILLON
                axios.get(`http://api.smartsplit.org:8080/v1/proposal/${this.state.uuid}`)
                .then(res=>{
                    let proposal = res.data.Item
                    this.setState({proposition: proposal}, ()=>{
                        this.setState({mediaId: proposal.mediaId}, ()=>{
                            this.recupererOeuvre()
                        })
                    })
                })
                .catch((error) => {
                    toast.error(error)
                })
            }

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
                            <Login message="Connecte-toi pour accéder au tableau de bord" fn={ (user) => {
                                onClose()
                                this.setState({ user: user }, () => {
                                    this.recupererOeuvre()
                                })
                            } }/>
                        </div>
                })
            })
    }

    recupererOeuvre() {
        // Récupérer le média
        axios.get(`http://api.smartsplit.org:8080/v1/media/${ this.state.mediaId }`)
            .then(res => {
                let media = res.data.Item;
                this.setState({ media: media });
            })
            .catch((error) => {
                toast.error(error);
            })
    }

    soumettre(values, etat, cb) {
        console.log('Soumettre le partage', values)

        if (this.state.user) {
            let _association = {} // Associera le nom de l'ayant-droit avec son identitifiant unique

            // 1. Récupérer la liste des ayant-droits
            axios.get(`http://api.smartsplit.org:8080/v1/rightHolders`)
            .then(res=>{                                    
                console.log('Ayant-droits', res)
                res.data.forEach(elem=>{
                    let nom = `${elem.artistName ? elem.artistName : `${elem.firstName} ${elem.lastName}`}`
                    _association[nom] = elem
                })                        
                // 2. Générer la structure à envoyer à Dynamo

                    let droitEnregistrement = [];
                    let droitInterpretePrincipal = [];
                    let droitInterpreteAccompagnement = [];
                    let droitAuteurMusique = [];
                    let droitAuteurParoles = [];

                    values.droitAuteur.forEach(elem => {

                    let _rH = _association[elem.nom]
                    let uuid = _rH.rightHolderId

                    if(elem.arrangeur || elem.compositeur) {
                        let roles = {}
                        if(elem.compositeur) {
                            roles["45745c60-7b1a-11e8-9c9c-2d42b21b1a31"] = "composer"
                        }
                        if(elem.arrangeur) {
                            roles["45745c60-7b1a-11e8-9c9c-2d42b21b1a32"] = "remixer"
                        }
                        droitAuteurMusique.push({
                            "rightHolder": {
                                "name": elem.nom,
                                "rightHolderId": uuid,
                                "color": elem.color
                            },
                            "voteStatus": "active",
                            "contributorRole": roles,
                            "splitPct": `${elem.pourcentMusique}`
                            }
                        )
                    }

                    if(elem.auteur) {
                        let roles = {"45745c60-7b1a-11e8-9c9c-2d42b21b1a33": "songwriter"}
                        droitAuteurParoles.push({
                            "rightHolder": {
                                "name": elem.nom,
                                "rightHolderId": uuid,
                                "color": elem.color
                            },
                            "voteStatus": "active",
                            "contributorRole": roles,
                            "splitPct": `${elem.pourcentParoles}`
                            }
                        )
                    }
                })

                values.droitInterpretation.forEach(elem=>{
                    
                    let _rH = _association[elem.nom]
                    let uuid = _rH.rightHolderId

                    if(elem.principal) {
                        let roles = {}
                        if(elem.chanteur) {
                            roles["45745c60-7b1a-11e8-9c9c-2d42b21b1a35"] = "singer"
                        }
                        if(elem.musicien) {
                            roles["45745c60-7b1a-11e8-9c9c-2d42b21b1a36"] = "musician"
                        }
                        droitInterpretePrincipal.push({
                            "rightHolder": {
                                "name": elem.nom,
                                "rightHolderId": uuid,
                                "color": elem.color
                            },
                            "voteStatus": "active",
                            "contributorRole": roles,
                            "splitPct": `${elem.pourcent}`
                            })
                    } else {
                        let roles = {"45745c60-7b1a-11e8-9c9c-2d42b21b1a37": "accompaniment"}
                        if(elem.chanteur) {
                            roles["45745c60-7b1a-11e8-9c9c-2d42b21b1a35"] = "singer"
                        }
                        if(elem.musicien) {
                            roles["45745c60-7b1a-11e8-9c9c-2d42b21b1a36"] = "musician"
                        }
                        droitInterpreteAccompagnement.push({
                            "rightHolder": {
                                "name": elem.nom,
                                "rightHolderId": uuid,
                                "color": elem.color
                            },
                            "voteStatus": "active",
                            "contributorRole": roles,
                            "splitPct": `${elem.pourcent}`
                            })
                        }

                    })

                values.droitEnregistrement.forEach(elem=>{
                    let _rH = _association[elem.nom]
                    let uuid = _rH.rightHolderId
                    let roles = {}
                        if(elem.producteur) {
                            roles["45745c60-7b1a-11e8-9c9c-2d42b21b1a40"] = "producer"
                        }
                        if (elem.realisateur) {
                            roles["45745c60-7b1a-11e8-9c9c-2d42b21b1a41"] = "director"
                        }
                        if (elem.studio) {
                            roles["45745c60-7b1a-11e8-9c9c-2d42b21b1a42"] = "studio"
                        }
                        if (elem.graphiste) {
                            roles["45745c60-7b1a-11e8-9c9c-2d42b21b1a43"] = "graphist"
                        }
                    droitEnregistrement.push({
                        "rightHolder": {
                            "name": elem.nom,
                            "rightHolderId": uuid,
                            "color": elem.color
                        },
                        "voteStatus": "active",
                        "contributorRole": roles,
                        "splitPct": `${elem.pourcent}`
                    })
                })            

                console.log(this.state.user.attributes)

                let body = {
                    uuid: "",
                    mediaId: parseInt(`${this.state.mediaId}`),
                    initiator: {
                        "name": `${this.state.user.attributes.given_name} ${this.state.user.attributes.family_name}`,
                        "id": this.state.user.username
                    },
                    rightsSplits: {
                        "workCopyrightSplit": {
                            "lyrics": droitAuteurParoles,
                            "music": droitAuteurMusique
                        },
                        "performanceNeighboringRightSplit": {
                            "principal": droitInterpretePrincipal,
                            "accompaniment": droitInterpreteAccompagnement
                        },
                        "masterNeighboringRightSplit": {
                            "split": droitEnregistrement
                        }
                    },
                    "comments": [],
                    "etat": etat
                }
                body.comments.push({ rightHolderId: this.state.user.username, comment: "Initiateur du split"})
                console.log('Envoi', body)

                if(values.uuid && values.uuid !== "") {
                    // 3a. Soumettre la nouvelle proposition
                    body.uuid = values.uuid
                    axios.put(`http://api.smartsplit.org:8080/v1/proposal/${body.uuid}`, body)
                    .then(res=>{
                        toast.success(`${res.data}`)
                        // 4. Exécuter une fonction passée en paramètre ou rediriger vers la page sommaire de la proposition
                        if(typeof cb === "function") {
                            cb()
                        } else {
                            setTimeout(()=>{
                                window.location.href = `/proposition/approuver/${res.data}`
                            }, 3000)
                        }
                    })
                    .catch(err=>{
                        toast.error(err.message)
                    })
                } else {
                    // 3b. Soumettre la nouvelle proposition
                    axios.post('http://api.smartsplit.org:8080/v1/proposal', body)
                    .then(res=>{
                        toast.success(`${res.data}`)
                        // 4. Exécuter une fonction passée en paramètre ou rediriger vers la page sommaire de la proposition
                        if(typeof cb === "function") {
                            cb()
                        } else {
                            setTimeout(()=>{
                                window.location.href = `/proposition/approuver/${res.data}`
                            }, 3000)
                        }
                    })
                    .catch(err=>{
                        toast.error(err.message)
                    })
                }

            })
            .catch(err=>{
                toast.error(err.message)
                if (typeof cb === "function") {
                    setTimeout(()=>{
                        cb()
                    }, 1000)
                }                
            })
        }
    }

    enregistrerEtQuitter(valeurs) {
        this.soumettre(valeurs, "BROUILLON", () => {
            Auth.signOut()
                .then(data => {
                    toast.success("Déconnexion réussie")
                    setTimeout(() => {
                        window.location.href = '/accueil'
                    }, 1000)
                })
                .catch(error => toast.error("Erreur..."))
        })
    }

    render() {

        if(this.state.media) {
            let valeursInitiales = {droitAuteur: [],droitInterpretation: [],droitEnregistrement: []}
            if(this.state.proposition) {
                // Ordonner les valeurs initiales
                let _rS = this.state.proposition.rightsSplits
                let _droit = {
                    auteur: {},
                    interpretation: {},
                    enregistrement: {}
                }
                function creerAd(elem) {
                    return {nom: elem.rightHolder.name, pourcent: 0.00}
                }
                // Droit d'auteur
                _rS.workCopyrightSplit.music.forEach(elem=>{ // Musique
                    if(!_droit.auteur[elem.rightHolder.rightHolderId]) {
                        _droit.auteur[elem.rightHolder.rightHolderId] = creerAd(elem)
                    }
                    _droit.auteur[elem.rightHolder.rightHolderId].pourcentMusique = parseFloat(elem.splitPct)
                    _droit.auteur[elem.rightHolder.rightHolderId].pourcent = parseFloat(elem.splitPct) + _droit.auteur[elem.rightHolder.rightHolderId].pourcent
                    _droit.auteur[elem.rightHolder.rightHolderId].arrangeur = elem.contributorRole[ROLES.ARRANGEUR] ? true : false
                    _droit.auteur[elem.rightHolder.rightHolderId].compositeur = elem.contributorRole[ROLES.COMPOSITEUR] ? true : false
                    _droit.auteur[elem.rightHolder.rightHolderId].color = elem.rightHolder.color
                })
                _rS.workCopyrightSplit.lyrics.forEach(elem=>{ // Paroles
                    if(!_droit.auteur[elem.rightHolder.rightHolderId]) {
                        _droit.auteur[elem.rightHolder.rightHolderId] = creerAd(elem)
                    }
                    _droit.auteur[elem.rightHolder.rightHolderId].pourcentParoles = parseFloat(elem.splitPct)
                    _droit.auteur[elem.rightHolder.rightHolderId].pourcent = parseFloat(elem.splitPct) + _droit.auteur[elem.rightHolder.rightHolderId].pourcent
                    _droit.auteur[elem.rightHolder.rightHolderId].auteur = elem.contributorRole[ROLES.AUTEUR] ? true : false
                    _droit.auteur[elem.rightHolder.rightHolderId].color = elem.rightHolder.color
                })

                // Droit d'interprétation
                _rS.performanceNeighboringRightSplit.principal.forEach(elem=>{ // Principal
                    if(!_droit.interpretation[elem.rightHolder.rightHolderId]) {
                        _droit.interpretation[elem.rightHolder.rightHolderId] = creerAd(elem)
                    }
                    _droit.interpretation[elem.rightHolder.rightHolderId].pourcent = parseFloat(elem.splitPct) + _droit.interpretation[elem.rightHolder.rightHolderId].pourcent
                    _droit.interpretation[elem.rightHolder.rightHolderId].principal = true
                    _droit.interpretation[elem.rightHolder.rightHolderId].chanteur = elem.contributorRole[ROLES.CHANTEUR] ? true : false
                    _droit.interpretation[elem.rightHolder.rightHolderId].musicien = elem.contributorRole[ROLES.MUSICIEN] ? true : false
                    _droit.interpretation[elem.rightHolder.rightHolderId].color = elem.rightHolder.color
                })
                _rS.performanceNeighboringRightSplit.accompaniment.forEach(elem=>{ // Accompagnement
                    if(!_droit.interpretation[elem.rightHolder.rightHolderId]) {
                        _droit.interpretation[elem.rightHolder.rightHolderId] = creerAd(elem)
                    }
                    _droit.interpretation[elem.rightHolder.rightHolderId].pourcent = parseFloat(elem.splitPct) + _droit.interpretation[elem.rightHolder.rightHolderId].pourcent
                    _droit.interpretation[elem.rightHolder.rightHolderId].accompaniment = true
                    _droit.interpretation[elem.rightHolder.rightHolderId].chanteur = elem.contributorRole[ROLES.CHANTEUR] ? true : false
                    _droit.interpretation[elem.rightHolder.rightHolderId].musicien = elem.contributorRole[ROLES.MUSICIEN] ? true : false
                    _droit.interpretation[elem.rightHolder.rightHolderId].color = elem.rightHolder.color
                })
                // Droit d'enregistrement
                _rS.masterNeighboringRightSplit.split.forEach(elem=>{ // Split
                    if(!_droit.enregistrement[elem.rightHolder.rightHolderId]) {
                        _droit.enregistrement[elem.rightHolder.rightHolderId] = creerAd(elem)
                    }
                    _droit.enregistrement[elem.rightHolder.rightHolderId].pourcent = parseFloat(elem.splitPct)
                    _droit.enregistrement[elem.rightHolder.rightHolderId].studio = elem.contributorRole[ROLES.STUDIO] ? true : false
                    _droit.enregistrement[elem.rightHolder.rightHolderId].producteur = elem.contributorRole[ROLES.PRODUCTEUR] ? true : false
                    _droit.enregistrement[elem.rightHolder.rightHolderId].realisateur = elem.contributorRole[ROLES.REALISATEUR] ? true : false
                    _droit.enregistrement[elem.rightHolder.rightHolderId].graphiste = elem.contributorRole[ROLES.GRAPHISTE] ? true : false
                    _droit.enregistrement[elem.rightHolder.rightHolderId].color = elem.rightHolder.color
                })

                // Construction des valeurs initiales
                Object.keys(_droit.auteur).forEach(elem=>{valeursInitiales.droitAuteur.push(_droit.auteur[elem])})
                Object.keys(_droit.interpretation).forEach(elem=>{valeursInitiales.droitInterpretation.push(_droit.interpretation[elem])})
                Object.keys(_droit.enregistrement).forEach(elem=>{valeursInitiales.droitEnregistrement.push(_droit.enregistrement[elem])})
            }

            return (
                <Translation>
                    {
                        (t, i18n) =>
                            <div className="ui grid" style={ { padding: "10px" } }>
                                <EntetePartage media={ this.state.media } user={ this.state.user }/>
                                <div className="ui row">
                                    <div className="ui two wide column"/>
                                    <div className="ui twelve wide column">
                                        <Wizard                                    
                                            initialValues={{
                                                droitAuteur: valeursInitiales.droitAuteur,
                                                droitInterpretation : valeursInitiales.droitInterpretation,
                                                droitEnregistrement: valeursInitiales.droitEnregistrement,
                                                collaborateur: [],
                                                uuid: this.state.uuid,
                                                media: this.state.media
                                            }}
                                            buttonLabels={{previous: t('navigation.precedent'), next: t('navigation.suivant'), submit: t('navigation.envoi')}}
                                            debug={false}
                                            onSubmit={
                                                (values) => {
                                                    this.soumettre(values, "PRET")
                                                }
                                            }
                                        >

                                            <Wizard.Page>
                                                <PageAssistantPartageDroitAuteur
                                                    enregistrerEtQuitter={ this.enregistrerEtQuitter } i18n={ i18n }/>
                                            </Wizard.Page>
            
                                            <Wizard.Page>                                                
                                                <PageAssistantPartageDroitInterpretation enregistrerEtQuitter={this.enregistrerEtQuitter} i18n={i18n} />
                                            </Wizard.Page>

                                            <Wizard.Page>
                                                <PageAssistantPartageDroitEnregistrement enregistrerEtQuitter={this.enregistrerEtQuitter} i18n={i18n} />
                                            </Wizard.Page>

                                        </Wizard>
                                    </div>
                                </div>
                            </div>
                    }
                </Translation>
            )
        } else {
            return (
                <div></div>
            )
        }

    }
}

export default AssistantPartage
