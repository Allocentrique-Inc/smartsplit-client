import React, {Component} from 'react'

// Assistant
import { Wizard } from "semantic-ui-react-formik"

// Traduction
import { Translation } from 'react-i18next'

// Composantes
import TableauSommaireSplit from './tableau-sommaire'

const TYPE_SPLIT = ['workCopyrightSplit', 'performanceNeighboringRightSplit', 'masterNeighboringRightSplit']

class ValiderSplit extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            split: props.split
        }
    }

    render() {

        let rightHolders = {}
        let rights = {}

        // Extraire les différents ayant-droits et ordonnancement dans un tableau
        TYPE_SPLIT.forEach(type=>{
            if(!rights[type]) {
                rights[type] = {}
            }
            if(this.state.split[type]) {
                let rightsSplit = this.state.split[type].rightsSplit
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

        return (            
            <Translation>
                {
                    (t, i18n)=>
                        <div>
                            <Wizard
                                buttonLabels={{previous: t('navigation.precedent'), next: t('navigation.suivant'), submit: t('navigation.envoi')}}
                                debug={false}>

                                <Wizard.Page>
                                    <React.Fragment>
                                        <h1>{t('flot.split.sommaire.titre')}</h1>
                                        <h2>{this.state.split.media.title}</h2>
                                        <p/>
                                        <p/>
                                        <h3>{t('flot.split.sommaire.soustitre')} {this.state.split.initiateur.name} : </h3>
                                        <TableauSommaireSplit droits={rights} />                                       
                                    </React.Fragment>
                                </Wizard.Page>

                            </Wizard>
                        </div>
                }
            </Translation>                                
        )
    }
}

export default ValiderSplit