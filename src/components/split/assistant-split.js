import React, {Component} from 'react'
import axios from 'axios'

import { toast } from 'react-toastify'

// Assistant
import { Wizard } from "semantic-ui-react-formik"

// Traduction
import { Translation } from 'react-i18next'

// Pages de l'assistant
import PageAssistantSplitCourrielsCollaborateurs from './assistant-split-courriel-collaborateurs'

const TYPE_SPLIT = ['workCopyrightSplit', 'performanceNeighboringRightSplit', 'masterNeighboringRightSplit']

class ValiderSplit extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            rightHolders: {},
            rights: {},
            mediaTitle: "",
            initiateur: ""
        }
    }

    componentWillMount() {
 
        // Récupère la proposition
        axios.get(`http://api.smartsplit.org:8080/v1/proposal/${this.props.proposition}`)
        .then((data)=>{
            // Construction de la structure des données de l'assistant
            let proposition = data.data.Item

            let rightHolders = {}
            let rights = {}

            function traitementDroit(objDroit, type) {
                if (objDroit) {
                    objDroit.forEach(droit=>{
                        if(!rightHolders[droit.rightHolder.rightHolderId]) {
                            // Ajout du titulaire dans la table des ayant droits
                            rightHolders[droit.rightHolder.rightHolderId] = droit.rightHolder
                        }
                        // Ajout du droit à l'ayant droit
                        rights[type][droit.rightHolder.rightHolderId] = droit
                    })
                }                
            }

            // Extraire les différents ayant-droits et ordonnancement dans un tableau
            TYPE_SPLIT.forEach(type=>{
                if(!rights[type]) {
                    rights[type] = {}
                }
                if(proposition.rightsSplits[type]) {
                    let rightsSplit = proposition.rightsSplits[type]
                    // Séparation de la structure des droits
                    switch(type) {
                        case 'workCopyrightSplit':
                            // lyrics
                            traitementDroit(rightsSplit.lyrics, type)
                            // music
                            traitementDroit(rightsSplit.music, type)
                            break
                        case 'performanceNeighboringRightSplit':
                            //principal
                            traitementDroit(rightsSplit.principal, type)
                            //accompaniment
                            traitementDroit(rightsSplit.accompaniment, type)
                            break
                        case 'masterNeighboringRightSplit':
                            traitementDroit(rightsSplit.split, type)
                            break
                        default:
                    }
                                        
                }
            })            

            // Affecte les objets construits
            this.setState({rights: rights})
            this.setState({initiateur: proposition.initiator.name})

            // Récupère le titre du média
            // Temporaire, devrait déjà être fourni dans le client à ce stade
            axios.get(`http://api.smartsplit.org:8080/v1/media/${proposition.mediaId}`)
            .then(res=>{
                let media = res.data.Item
                this.setState({mediaTitle: media.title})
                this.setState({mediaId: media.mediaId})
            })
            .catch((error) => {
                toast.error(error.message)                
            })

            // Récupération du courriel de l'ayant-droit
            // Récupère le courriel des ayants-droits
            let reqs = {} // Suivi des requêtes asynchrones
            function aToutRecu() {
                let _r = false                
                Object.keys(reqs).forEach(e=>{                    
                    if (reqs[e] === '-->') {
                        _r = true
                        return
                    }
                })
                return !_r
            }
            Object.keys(rightHolders).forEach((idx)=>{
                reqs[idx] = '-->' // Marque comme envoyé
                axios.get(`http://api.smartsplit.org:8080/v1/rightHolders/${rightHolders[idx].rightHolderId}`)
                .then(res=>{
                    rightHolders[idx].email = res.data.Item.email                    
                    reqs[idx] = '---'
                    if(aToutRecu()) {
                        this.setState({rightHolders: rightHolders})   
                    }
                })
                .catch((error) => {
                    toast.error(error.message)                    
                })
            })            
            
        })
        .catch((error) => {
            toast.error(error)
            
        })

    }

    transmettreInvitation(modele) {

        let body = {
            "proposalId": this.props.proposition,
            "rightHolders": modele.rightHolders
        }

        axios.post('http://api.smartsplit.org:8080/v1/proposal/invite', body)
        .then((resp)=>{
            if(resp.data !== '') {
                window.location.href=`/partager/${this.state.mediaId}`
            }                
        })
        .catch((error) => {
            toast.error(error)
        })

    }

    render() {

        return ( Object.keys(this.state.rightHolders).length > 0 &&         
            <Translation>
                {
                    (t, i18n)=>
                        <div>
                            <Wizard
                                initialValues={{
                                    rightHolders: this.state.rightHolders
                                }}
                                buttonLabels={{previous: t('navigation.precedent'), next: t('navigation.suivant'), submit: t('navigation.envoi')}}
                                debug={false}
                                onSubmit={this.transmettreInvitation.bind(this)}>

                                <Wizard.Page>
                                    <PageAssistantSplitCourrielsCollaborateurs ayantDroits={this.state.rightHolders} titre={this.state.mediaTitle}/>
                                </Wizard.Page>

                            </Wizard>
                        </div>
                }
            </Translation>                                
        )
    }
}

export default ValiderSplit