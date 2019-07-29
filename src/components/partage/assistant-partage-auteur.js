import React, { Component } from "react"
import { Translation } from 'react-i18next'

// Composantes
import Beignet from '../visualisation/partage/beignet'
import ChampGradateurAssistant from '../formulaires/champ-gradateur'

import { FieldArray } from "formik"

import axios from 'axios'
import { toast } from 'react-toastify'

import { ChampListeCollaborateurAssistant } from "../formulaires/champ-liste"

const MODES = {manuel: 0, egal: 1}

class PageAssistantPartageAuteur extends Component {

    constructor(props) {
        super(props)
        this.state = {
            parts: {},
            mode: MODES.egal
        }
        this.pourcentRestant = this.pourcentRestant.bind(this)
    }

    componentWillMount() {
        // Récupérer la liste des ayant-droits
        axios.get(`http://api.smartsplit.org:8080/v1/rightHolders`)
        .then(res=>{            
            let _options = res.data.map(elem=>{
                return {key: `${elem.rightHolderId}`,text: `${elem.firstName} '${elem.artistName}' ${elem.lastName}`, value: `${elem.firstName} '${elem.artistName}' ${elem.lastName}`}
            })
            this.setState({options: _options})
        })
        .catch((error) => {
            toast.error(error)
            
        })
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.values.droitAuteur !== nextProps.values.droitAuteur) {
            this.setState({parts: nextProps.values.droitAuteur})
        }
    }

    calculParts() {
        let pourcent = 100.00
        switch(this.state.mode) {
            case MODES.egal:
                // Ajuster tous les collaborateurs au même pourcentage
                let _vals = this.props.values.droitAuteur
                
                pourcent = (pourcent / (_vals.length + 1)).toFixed(4)

                // Applique le pourcentage aux données existantes
                _vals = _vals.map(elem=>{
                    return {
                        nom: elem.nom,
                        pourcent: ""+pourcent
                    }
                })

                this.props.setFieldValue("droitAuteur", _vals)

                break;
            case MODES.manuel:
                pourcent = this.pourcentRestant()
                break;
            default:
        }
        return pourcent
    }

    pourcentRestant() {
        let _pctDelta = 100
        this.props.values.droitAuteur.forEach(elem=>{
            _pctDelta = _pctDelta - parseFloat(elem.pourcent)
        })
        return `${_pctDelta < 0 ? 0 : _pctDelta}`
    }

    render() {

        return (
            <Translation>
                {
                    (t) =>
                        <React.Fragment>                            
                            <h1>Partage du droit d'auteur</h1>

                            <div className="conteneur--beignet">
                                <Beignet key="1" data={this.state.parts}/>
                            </div>

                            <FieldArray
                                name="droitAuteur"
                                render={arrayHelpers => (
                                    <div>
                                        {
                                            this.props.values.droitAuteur.map((part, index)=>{                                                

                                                return (
                                                    <div key={`part-${index}`}>
                                                        <div className="fields">
                                                            <div className="field">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => arrayHelpers.remove(index)}>
                                                                    <i className="remove icon"></i>
                                                                </button>
                                                            </div>
                                                            <div className="twelve wide field">
                                                                <ChampGradateurAssistant etiquette={part.nom} modele={`droitAuteur[${index}].pourcent`}/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                        <div style={{width: "30%", margin: "0 auto", height: "100px"}}>
                                            <div>
                                                <button
                                                    className="btnCollaborateur"
                                                    onClick={
                                                        (e) => {                                                            
                                                            let part = this.calculParts()
                                                            e.preventDefault()
                                                            arrayHelpers.insert()                                                            
                                                            this.props.setFieldValue(`droitAuteur[0]`, {nom: this.props.values.collaborateur, pourcent: part})
                                                            this.props.setFieldValue('collaborateur', "")
                                                        }
                                                    }
                                                >
                                                    <i className="plus circle icon big green"></i>                                                    
                                                </button>
                                            </div>                                    
                                            <div>
                                                <ChampListeCollaborateurAssistant
                                                    indication={t('flot.collaborateurs.ajout')}
                                                    modele="collaborateur"
                                                    autoFocus={false}
                                                    requis={false}
                                                    fluid={true}
                                                    multiple={false}
                                                    recherche={true}
                                                    selection={true}
                                                    ajout={false}
                                                />                                               
                                            </div>
                                        </div>
                                    </div>
                                )}
                            />
                        </React.Fragment>
                }
            </Translation>    
        )
    }
}

export default PageAssistantPartageAuteur