import React, {Component} from 'react'
import axios from 'axios'

// Assistant
import { Wizard } from "semantic-ui-react-formik"

// Traduction
import { Translation } from 'react-i18next'

// Composantes
import TableauSommaireSplit from './tableau-sommaire'

// Pages de l'assistant
import PageAssistantSplitCourrielsCollaborateurs from './assistant-split-courriel-collaborateurs'

// Utilitaire
import GenerateurJeton from '../../utils/generateur-jetons'

const TYPE_SPLIT = ['workCopyrightSplit', 'performanceNeighboringRightSplit', 'masterNeighboringRightSplit']

class ValiderSplit extends Component {
    
    constructor(props) {
        super(props)

        // Construction de la structure des données de l'assistant
        let rightHolders = {}
        let rights = {}

        // Extraire les différents ayant-droits et ordonnancement dans un tableau
        TYPE_SPLIT.forEach(type=>{
            if(!rights[type]) {
                rights[type] = {}
            }
            if(this.props.split[type]) {
                let rightsSplit = this.props.split[type].rightsSplit
                rightsSplit.forEach(droit=>{
                    if(!rightHolders[droit.rightHolder.uuid]) {
                        // Ajout du titulaire dans la table des ayant droits
                        rightHolders[droit.rightHolder.uuid] = droit.rightHolder
                    }
                    // Ajout du droit à l'ayant droit
                    rights[type][droit.rightHolder.uuid] = droit
                })                
            }
        })

        this.state = {
            rightHolders: rightHolders,
            rights: rights
        }
    }

    transmettreInvitation(modele) {
        
        let generateurJeton = new GenerateurJeton()

        // Envoyer le courriel de création de slipt aux ayant droits
        Object.keys(modele.ayantDroits).forEach(id=>{
            let _c = modele.ayantDroits[id]
            // Créer un jeton JWT pour le split et l'ayant droit
            let _j = generateurJeton.genererJetonVotation(this.props.split.uuid, _c.uuid)
            
            let body = [
                {
                    "template": "splitCreated",
                    "firstName": _c.name.split(" ")[0],
                    "splitInitiator": this.props.split.initiateur.name,
                    "workTitle": this.props.split.media.title,
                    "callbackURL": `http://proto.smartsplit.org:3000/split/voter/${_j}`
                }
            ]
            
            console.log(body)

            axios.post('http://courriel.smartsplit.org:3034', body)

        })
    }

    render() {

        return (            
            <Translation>
                {
                    (t, i18n)=>
                        <div>
                            <Wizard
                                initialValues={{
                                    ayantDroits: this.state.rightHolders
                                }}
                                buttonLabels={{previous: t('navigation.precedent'), next: t('navigation.suivant'), submit: t('navigation.envoi')}}
                                debug={false}
                                onSubmit={this.transmettreInvitation.bind(this)}>

                                <Wizard.Page>
                                    <React.Fragment>
                                        <h1>{t('flot.split.sommaire.titre')}</h1>
                                        <h2>{this.props.split.media.title}</h2>
                                        <p/>
                                        <p/>
                                        <h3>{t('flot.split.sommaire.soustitre')} {this.props.split.initiateur.name} : </h3>
                                        <TableauSommaireSplit droits={this.state.rights} />                                       
                                    </React.Fragment>
                                </Wizard.Page>

                                <Wizard.Page>
                                    <PageAssistantSplitCourrielsCollaborateurs ayantDroits={this.state.rightHolders} titre={this.props.split.media.title}/>                                    
                                </Wizard.Page>

                            </Wizard>
                        </div>
                }
            </Translation>                                
        )
    }
}

export default ValiderSplit