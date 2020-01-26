import React, { Component } from "react"
import { withTranslation } from 'react-i18next'
import { ChampTexteAssistant } from "../formulaires/champ-texte";

// Progression
import { Progress } from 'semantic-ui-react'

class PageAssistantOeuvrePro extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            pctProgression: props.pctProgression
        }
    }
    
    render(){
        const t = this.props.t
        return (            
            <React.Fragment>
                <Progress percent={this.state.pctProgression} indicating></Progress>
                <h2>{t('flot.pro.titre')}</h2>
                <p>{t('flot.pro.preambule')}</p>

                <ChampTexteAssistant 
                    etiquette={t('oeuvre.attribut.etiquette.editeur')} indication={t('oeuvre.attribut.indication.editeur')} 
                    modele="publisher" requis={true} autoFocus={true} info={true}  />

                <ChampTexteAssistant 
                    etiquette={t('oeuvre.attribut.etiquette.isrc')} indication={t('oeuvre.attribut.indication.isrc')} 
                    modele="isrc" requis={false} autoFocus={false} info={true}  />

                <ChampTexteAssistant
                    etiquette={t('oeuvre.attribut.etiquette.upc')} indication={t('oeuvre.attribut.indication.upc')} 
                    modele="upc" requis={false} autoFocus={false} info={true}  />                    

            </React.Fragment>                
        )
    }
}

export default withTranslation()(PageAssistantOeuvrePro)