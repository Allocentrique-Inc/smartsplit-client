import React, { Component } from 'react'
import { Wizard } from 'semantic-ui-react-formik'
import axios from 'axios'
import { Translation } from 'react-i18next'
import { Label } from 'semantic-ui-react'
import { ChampTexteAssistant } from '../formulaires/champ-texte'
import BoutonsRadio from '../formulaires/champ-radio'

const ORIGINALE = 0, ARRANGEMENT = 1, REPRISE = 2

class PageNouvellePiece extends Component {

    constructor(props) {
        super(props)
        this.state = {
            auteur: props.auteur
        }
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.auteur !== nextProps.auteur) {
            this.setState({auteur: nextProps.auteur})
        }
    }

    render() {

        return (
            <React.Fragment>
                <Translation>
                    {
                        t=>
                            <div className="ui two column grid">
                                <div className="ui column">
                                    <div className="ui row">
                                        <ChampTexteAssistant 
                                            soustexte={t('oeuvre.attribut.indication.titre-soustexte')}
                                            modele="titre"
                                            etiquette={t('oeuvre.attribut.indication.titre')}
                                            requis={true}
                                            />
                                    </div>
                                    <div style={{marginTop: "20px"}} className="ui row">
                                        <BoutonsRadio 
                                            modele="type"
                                            etiquette={t('options.piece.titre')}
                                            actif={this.props.values.type} 
                                            requis={true}
                                            choix={[
                                                {
                                                    nom: t('options.piece.originale'),
                                                    valeur: ORIGINALE
                                                },
                                                {
                                                    nom: t('options.piece.arrangement'),
                                                    valeur: ARRANGEMENT
                                                },
                                                {
                                                    nom: t('options.piece.reprise'),
                                                    valeur: REPRISE
                                                }
                                            ]}
                                            onClick={(e) => {
                                                this.props.setFieldValue('type', e.target.value)                                                
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="ui column">
                                    <div style={{background: "#FAF8F9", borderRadius: "2px", minHeight: "112px", width: "100%"}}>                                        
                                        <p style={{
                                            fontFamily: "IBM Plex Sans",
                                            fontStyle: "normal",
                                            fontWeight: "bold",
                                            fontSize: "12px",
                                            lineHeight: "16px",                                            
                                            letterSpacing: "1px",
                                            textTransform: "uppercase",
                                            paddingTop: "16px",
                                            color: "#8DA0B3"
                                            
                                        }}>{t('titre.apercu')}</p>
                                        <div className="ui grid">
                                            <div className="ui two wide column">
                                                <i className="file image outline icon big grey" /> 
                                            </div>
                                            <div className="ui twelve wide column">
                                                <p>
                                                    {this.state.auteur && this.state.auteur.artistName}                                                    
                                                </p>
                                                <p>{this.props.values.titre}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    }                    
                </Translation>
            </React.Fragment>
        )
    }
}

class Page2NouvellePiece extends Component {

    constructor(props) {
        super(props)
        this.state = {
            auteur: props.auteur
        }
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.auteur !== nextProps.auteur) {
            this.setState({auteur: nextProps.auteur})
        }
    }

    render() {

        return (
            <React.Fragment>
                <Translation>
                    {
                        t=>
                            <div className="ui two column grid">
                                <div className="ui column">
                                    <div className="ui row">
                                        <ChampTexteAssistant 
                                            soustexte={t('oeuvre.attribut.indication.titre-soustexte')}
                                            modele="titre"
                                            etiquette={t('oeuvre.attribut.indication.titre')}
                                            requis={true}
                                            />
                                    </div>
                                    <div style={{marginTop: "20px"}} className="ui row">
                                        <BoutonsRadio 
                                            modele="type"
                                            etiquette={t('options.piece.titre')}
                                            actif={this.props.values.type} 
                                            requis={true}
                                            choix={[
                                                {
                                                    nom: t('options.piece.originale'),
                                                    valeur: ORIGINALE
                                                },
                                                {
                                                    nom: t('options.piece.arrangement'),
                                                    valeur: ARRANGEMENT
                                                },
                                                {
                                                    nom: t('options.piece.reprise'),
                                                    valeur: REPRISE
                                                }
                                            ]}
                                            onClick={(e) => {
                                                this.props.setFieldValue('type', e.target.value)                                                
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="ui column">
                                    <div style={{background: "#FAF8F9", borderRadius: "2px", minHeight: "112px", width: "100%"}}>                                        
                                        <p style={{
                                            fontFamily: "IBM Plex Sans",
                                            fontStyle: "normal",
                                            fontWeight: "bold",
                                            fontSize: "12px",
                                            lineHeight: "16px",                                            
                                            letterSpacing: "1px",
                                            textTransform: "uppercase",
                                            paddingTop: "16px",
                                            color: "#8DA0B3"
                                            
                                        }}>{t('titre.apercu')}</p>
                                        <div className="ui grid">
                                            <div className="ui two wide column">
                                                <i className="file image outline icon big grey" /> 
                                            </div>
                                            <div className="ui twelve wide column">
                                                <p>
                                                    {this.state.auteur && this.state.auteur.artistName}                                                    
                                                </p>
                                                <p>{this.props.values.titre}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    }                    
                </Translation>
            </React.Fragment>
        )
    }
}

export default class NouvelleOeuvre extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user: props.user
        }
        this.soumettre = this.soumettre.bind(this)
    }

    componentWillMount() {
        axios.get(`http://api.smartsplit.org:8080/v1/rightHolders/${this.state.user.username}`)
        .then(res=>{
            this.setState({auteur: res.data.Item})
        })
    }

    soumettre(titre) {
        // Envoi à l'api et redirection vers la documentation de l'oeuvre
        //axios.post('http://api.smartsplit.org:8080/')
        window.location.href=`/documenter/${titre}`
    }

    render() {
        return (
            <Translation>
                {
                    t=>
                        <Wizard
                            initialValues={{                                                                                                
                                titre: undefined,
                                type: undefined                    
                            }}
                            buttonLabels={{previous: t('navigation.precedent'), next: t('navigation.suivant'), submit: t('navigation.cest-parti')}}
                            debug={false}
                            onSubmit={(values)=>{this.soumettre(values.titre)}}                            
                        >
                            <Wizard.Page>                                
                                <PageNouvellePiece auteur={this.state.auteur} />                                
                            </Wizard.Page>
                            <Wizard.Page>                                
                                <Page2NouvellePiece auteur={this.state.auteur} />                                
                            </Wizard.Page>

                        </Wizard>
                }                
            </Translation>            
        )
    }
}