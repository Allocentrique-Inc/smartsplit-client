/**
 * Saisie du collaborateur principal de l'oeuvre
 */

import React, { Component } from "react"
import { Translation } from 'react-i18next'
import { ChampCourrielAssistant } from "../formulaires/champ-texte"

class PageAssistantSplitCourrielsCollaborateurs extends Component {

    constructor(props) {
        super(props)
        this.state = {
            ayantDroits: props.ayantDroits,
            titre: props.titre
        }
    }    
    
    render() {

        // Construction de la liste à afficher
        let ayantDroits = []
        Object.keys(this.state.ayantDroits).forEach((elem)=>{
            ayantDroits.push( 
                (
                    <ChampCourrielAssistant 
                        key={`champ--courriel__split-${elem}`} modele={`ayantDroits[${elem}].email`} requis={true} etiquette={this.state.ayantDroits[elem].name} indication="courriel@domain.extension"
                    />
                )
            )
        })

        return (
            <Translation>
                {
                    (t) =>
                        <React.Fragment>                            
                            <React.Fragment>
                                <h1>{t('flot.split.valider.titre')}</h1>
                                <h2>{this.state.titre}</h2>
                                <p/>
                                <p/>
                                <h3>{t('flot.split.valider.soustitre')}</h3>
                                {ayantDroits}
                            </React.Fragment>
                        </React.Fragment>
                }
            </Translation>    
        )
    }
}

export default PageAssistantSplitCourrielsCollaborateurs