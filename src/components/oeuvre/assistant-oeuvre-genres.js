import React, {Component} from 'react'
import { withTranslation } from "react-i18next"
import { ChampListeAssistant } from "../formulaires/champ-liste"

// Progression
import { Progress } from 'semantic-ui-react'

class PageAssistantOeuvreGenre extends Component {

    constructor(props){
        super(props)
        const GENRES = require(`../../assets/listes/${this.props.i18n.language.substring(0,2)}/genres.json`).genres
        this.genreOptions = this.genererGenres(GENRES)
        this.genreSecondaireOptions = this.genererGenres(GENRES, true)
        this.state = {
            pctProgression: props.pctProgression
        }
    }

    genererGenres(GENRES, secondaire = false) { // secondaire est booléen        
    
        return GENRES.map((elem, idx)=>{
            let prefixe = secondaire ? 'GS' : 'G'
            return {
                key: `${prefixe}${idx}`,
                text: elem.nom,
                value: `${prefixe}${idx}`
            }
        })
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.pctProgression !== nextProps.pctProgression) {
            this.setState({pctProgression: nextProps.pctProgression})
        }
    }
    
    render(){
        const t = this.props.t
        return (            
            <React.Fragment>
                <Progress percent={this.state.pctProgression} indicating></Progress>
                
                <h2>{t('flot.genre.titre')}</h2>            
                <p>{t('flot.genre.preambule')}</p>

                <ChampListeAssistant
                    etiquette={t('oeuvre.attribut.etiquette.genre')} indication={t('oeuvre.attribut.indication.genre')}
                    modele="genre" requis={true} fluid={true} multiple={false} recherche={true} selection={true} autoFocus={true}
                    options={this.genreOptions} />

                <ChampListeAssistant
                    etiquette={t('oeuvre.attribut.etiquette.genre2')} indication={t('oeuvre.attribut.indication.genre2')}
                    modele="secondaryGenre" requis={false} fluid={true} multiple={true} recherche={true} selection={true} autoFocus={false} ajout={true}
                    options={this.genreSecondaireOptions} />                           
        
            </React.Fragment>                
        )
    }
}

export default withTranslation()(PageAssistantOeuvreGenre)