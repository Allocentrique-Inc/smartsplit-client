import React, { Component } from "react"
import { Translation } from 'react-i18next'

import { ChampListeEditeurAssistant } from "../formulaires/champ-liste"

import avatar from '../../assets/images/elliot.jpg'

class PageAssistantPartageChoixEditeur extends Component {

    constructor(props) {
        super(props)
        this.state = {            
            song: "",
            editeur: undefined  // Éditeur sélectionné
        }        
        this.ajouterEditeur = this.ajouterEditeur.bind(this)
        this.setEditeurs = this.setEditeurs.bind(this)
    }

    componentDidMount() {
        this.setState({song: this.props.values.song})
    }

    ajouterEditeur() {

        let _ed = this.props.values.editeurListe
                                                            
        let editeur = {
            nom: _ed, 
            pourcent: "0"
        }

        this.props.setFieldValue('editeur', editeur)
        this.setState({editeur: editeur})

    }

    setEditeurs(editeurs) {
        this.props.setFieldValue('editeurs', editeurs)
    }

    render() {        
        
        let descriptif

        if(this.props.i18n.lng.substring(0,2) === 'en') {
            descriptif = (<div className="medium-400">
                The music publisher is the representative of the creator's works. 
                It helps the creator to value, exploit and market his works. 
                You can read <u>this article</u> to learn more about its role.
            </div>)
        } else {
            descriptif = (<div className="medium-400">
                L’éditeur musical est le représentant des oeuvres d’un créateur. Il aide le 
                créateur à valoriser, exploiter et monnayer ses oeuvres. <p />
                Tu peux lire <u>cet article</u> pour en apprendre plus sur son rôle.
            </div>)
        }

        let index, part

        return (
            <Translation>
                {
                    (t) =>                                   
                        <div className="ui grid">          
                            <div className="ui row">
                                <div className="ui seven wide column">
                                    <div className="wizard-title">{t('flot.partage.auteur.titre')}</div>
                                    <br/>
                                    <div className="mode--partage__auteur">
                                    <div className="who-invented-title">
                                        { t('partage.editeur.titre', {oeuvre: this.state.song}) }
                                    </div>
                                    <br/>
                                    {descriptif}
                                    <br/>
                                    <div className="fields">                                        
                                        {
                                            this.state.editeur && (
                                                <div className="twelve wide field gray-fields">
                                                    <div className="holder-name">
                                                        <img className="ui spaced avatar image" src={avatar}/>
                                                        <i className="delete icon" onClick={() => {
                                                            this.props.setFieldValue('editeur', undefined)
                                                            this.setState({editeur: undefined})
                                                        }}></i>
                                                        {this.state.editeur.nom}
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </div>
                                    
                                    {!this.state.editeur && (
                                        <div style={{margin: "0 auto", height: "100px"}}>                                    
                                            <div>
                                                <ChampListeEditeurAssistant
                                                    indication={t('flot.editeur.ajout')}
                                                    modele="editeurListe"
                                                    autoFocus={false}
                                                    requis={true}
                                                    fluid={true}
                                                    multiple={false}
                                                    recherche={true}
                                                    selection={false}
                                                    ajout={false}
                                                    parent={this}
                                                />
                                            </div>
                                            <button 
                                                className="ui medium button"
                                                onClick={(e)=>{
                                                e.preventDefault()
                                                this.ajouterEditeur()
                                                }}>{ t('flot.bouton.ajout') }
                                            </button>
                                        </div>
                                    )}                                    

                                </div>
                                    </div>
                                    <div className="ui seven wide column">                                    
                                        <div className="nine wide field">
                                            &nbsp;
                                        </div>
                                    </div>
                                </div>
                        </div>
                }
            </Translation>    
        )
    }
}

export default PageAssistantPartageChoixEditeur