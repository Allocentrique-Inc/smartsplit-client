/**
 * Saisie des paroles de l'oeuvre
 */

import React, { Component } from 'react'
import { Translation } from "react-i18next"
import { ChampTexteLongAssistant } from "../formulaires/champ-texte"
import { ChampListeAssistant } from "../formulaires/champ-liste"

class PageAssistantParoles extends Component {
    constructor(props){
        super(props)
        this.state = {
            languesOptions: require(`../../assets/listes/${props.i18n.lng}/codes_langues.json`)
        }        
    }    
    render() {
        return (
            <Translation>
                {
                    (t) => 
                        <React.Fragment>

                            <h2>{t('flot.paroles.titre')}</h2> 
                            <p>{t('flot.paroles.preambule')}</p>

                            <ChampTexteLongAssistant 
                                etiquette={t('oeuvre.attribut.etiquette.paroles')} indication={t('oeuvre.attribut.indication.paroles')}
                                modele="lyrics" requis={false} autoFocus={true} />

                            <ChampListeAssistant
                                etiquette={t('oeuvre.attribut.etiquette.langueParoles')} indication={t('oeuvre.attribut.indication.langueParoles')}
                                modele="inLanguages" requis={false} fluid={true} multiple={true} recherche={true} selection={true} autoFocus={false}
                                options={this.state.languesOptions} />

                        </React.Fragment>
                }
            </Translation>
        )
    }
}

export default PageAssistantParoles