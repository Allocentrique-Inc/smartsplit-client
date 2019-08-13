/**
 * Saisie du collaborateur principal de l'oeuvre
 */

import React, { Component } from "react"
import { Translation } from 'react-i18next'
import { ChampTexteAssistant } from "../formulaires/champ-texte"
import { ChampListeAssistant } from "../formulaires/champ-liste"
// Progression
import { Progress } from 'semantic-ui-react'

import { FieldArray } from 'formik'

class PageAssistantOeuvreDescription extends Component {

    constructor(props) {
        super(props);

        const ROLES = require('../../assets/listes/roles.json');
        const INSTRUMENTS = require(`../../assets/listes/${ props.i18n.lng.substring(0, 2) }/instruments.json`).instruments;

        let _roles = ROLES;

        // Charger la liste des instruments dans les rôles
        // Structure d'un élément d'option de liste Formik : [Clé|key;Texte|text;Valeur|value]
        INSTRUMENTS.forEach((elem) => {
            let id = `R${ ROLES.length + 1 }`
            _roles.push({
                key: id,
                text: elem.nom,
                value: id
            })
        })

        this.state = {
            pctProgression: props.pctProgression,
            roles: _roles
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.pctProgression !== nextProps.pctProgression) {
            this.setState({ pctProgression: nextProps.pctProgression })
        }
    }

    renderFieldArray(arrayHelpers) {
        return (
            <div>
                {
                    this.props.values.rightHolders.map((collaborateur, index) => (
                        <div key={ `collaborateur.${ index }` }>
                            <div className="fields">
                                <div className="field">
                                    <button
                                        type="button"
                                        onClick={ () => arrayHelpers.remove(index) }>
                                        <i className="remove icon"></i>
                                    </button>
                                </div>

                                <div className="four wide field">
                                    <ChampTexteAssistant
                                        etiquette={ this.t('collaborateur.attribut.etiquette.prenom') }
                                        indication={ this.t('collaborateur.attribut.indication.prenom') }
                                        modele={ `rightHolders[${ index }].prenom` }
                                        requis={ true } autoFocus={ true }
                                    />
                                </div>

                                <div className="four wide field">
                                    <ChampTexteAssistant
                                        etiquette={ this.t('collaborateur.attribut.etiquette.nom') }
                                        indication={ this.t('collaborateur.attribut.indication.nom') }
                                        modele={ `rightHolders[${ index }].nom` }
                                        requis={ true } autoFocus={ false }
                                    />
                                </div>

                                <div className="four wide field">
                                    <ChampTexteAssistant
                                        etiquette={ this.t('collaborateur.attribut.etiquette.artiste') }
                                        indication={ this.t('collaborateur.attribut.indication.artiste') }
                                        modele={ `rightHolders[${ index }].artiste` }
                                        requis={ false } autoFocus={ false }
                                    />
                                </div>

                                <div className="four wide field">
                                    <ChampListeAssistant
                                        etiquette={ this.t('collaborateur.attribut.etiquette.role') }
                                        indication={ this.t('collaborateur.attribut.indication.role') }
                                        modele={ `rightHolders[${ index }].role` }
                                        requis={ true } fluid={ true } multiple={ true }
                                        recherche={ true } selection={ true } autoFocus={ true }
                                        options={ this.state.roles }
                                    />
                                </div>
                            </div>
                        </div>
                    ))
                }

                <button
                    type="button"
                    onClick={ () => arrayHelpers.insert() }
                >
                    <i className="plus circle icon big"></i>
                </button>
            </div>
        );
    }

    render() {
        return (
            <Translation>
                {
                    (t) =>
                        <React.Fragment>
                            <Progress percent={ this.state.pctProgression } indicating></Progress>
                            <h2>{ t('flot.collaborateurs.titre') }</h2>

                            <FieldArray
                                name="rightHolders"
                                render={ this.renderFieldArray }
                            />
                        </React.Fragment>
                }
            </Translation>
        )
    }
}

export default PageAssistantOeuvreDescription
