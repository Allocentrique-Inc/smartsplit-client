import React, { Component } from 'react'
import { withTranslation } from "react-i18next"
import { ChampTexteLongAssistant } from "../formulaires/champ-texte"
import { ChampListeAssistant } from "../formulaires/champ-liste"
import { ChampInterrupteurAssistant } from '../formulaires/champ-interrupteur';

class PageAssistantOeuvreParoles extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            pctProgression: props.pctProgression
        }
        this.languesOptions = require(`../../assets/listes/${props.i18n.language.substring(0,2)}/codes_langues.json`)                
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.pctProgression !== nextProps.pctProgression) {
            this.setState({pctProgression: nextProps.pctProgression})
        }
    }

    render() {
        const t =this.props.t
        return (            
            <React.Fragment>
                <Progress percent={this.state.pctProgression} indicating></Progress>
                <h2>{t('flot.paroles.titre')}</h2> 
                <p>{t('flot.paroles.preambule')}</p>

                <ChampInterrupteurAssistant modele="instrumental" etiquette={t('oeuvre.attribut.etiquette.instrumental')} changement={ (a) => {
                    this.props.setFieldValue('instrumental', `${a}`, false)
                }}/>

                <ChampTexteLongAssistant 
                    etiquette={t('oeuvre.attribut.etiquette.paroles')} indication={t('oeuvre.attribut.indication.paroles')}
                    modele="lyrics" requis={false} autoFocus={true} />

                <ChampListeAssistant
                    etiquette={t('oeuvre.attribut.etiquette.langueParoles')} indication={t('oeuvre.attribut.indication.langueParoles')}
                    modele="inLanguages" requis={false} fluid={true} multiple={true} recherche={true} selection={true} autoFocus={false}
                    options={this.languesOptions} />
            </React.Fragment>                
        )
    }
}

export default withTranslation()(PageAssistantOeuvreParoles)