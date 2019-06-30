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

        // Envoyer le courriel de création de slipt aux ayant droits
        Object.keys(modele.ayantDroits).forEach(id=>{
            let _c = modele.ayantDroits[id]
            
            let body = {
                "splitId": this.props.split.uuid,
                "rightHolderId": _c.uuid,
                "nom": _c.name.split(" ")[0],
                "courriel": _c.email,
                "initiateur": this.props.split.initiateur.name,
                "initiateurId": this.props.split.initiateur.uuid,
                "titre": this.props.split.media.title                    
            }          

            axios.post('http://api.smartsplit.org:8080/v1/splits/invite', body)
            .then(()=>{
                console.log(body, "Envoyé")
                setTimeout(()=>{window.location.href="/split/confirmer-courriel"}, 1000)
            })

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