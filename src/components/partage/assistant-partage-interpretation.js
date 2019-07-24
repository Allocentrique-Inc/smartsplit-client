import React, { Component } from "react"
import { Translation } from 'react-i18next'

// Composantes
import Beignet from '../visualisation/partage/beignet'
import ChampGradateurAssistant from '../formulaires/champ-gradateur'

import { FieldArray } from "formik";

import axios from 'axios'
import { ChampListeCollaborateurAssistant } from "../formulaires/champ-liste";

const MODES = {manuel: 0, egal: 1}

class PageAssistantPartageInterpretation extends Component {

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
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.values.droitInterpretation !== nextProps.values.droitInterpretation) {
            this.setState({parts: nextProps.values.droitInterpretation})
        }
    }

    pourcentRestant() {
        let _pctDelta = 100
        this.props.values.droitInterpretation.forEach(elem=>{
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
                            <h1>Partage du droit d'interprétation</h1>

                            <div className="conteneur--beignet">
                                <Beignet key="1" data={this.state.parts}/>
                            </div>

                            <FieldArray
                                name="droitInterpretation"
                                render={arrayHelpers => (
                                    <div>
                                        {
                                            this.props.values.droitInterpretation.map((part, index)=>{                                                

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
                                                                <ChampGradateurAssistant etiquette={part.nom} modele={`droitInterpretation[${index}].pourcent`}/>
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
                                                            e.preventDefault()
                                                            arrayHelpers.insert()
                                                            // Crééer un objet convenable
                                                            //let idx = this.props.values.droitInterpretation.length > 0 ? this.props.values.droitInterpretation.length - 1 : 0
                                                            // setFieldValue() déclenche un rafraichissement du formulaire
                                                            console.log('champ droitInterpretation', this.props.values.droitInterpretation)
                                                            this.props.setFieldValue(`droitInterpretation[0]`, {nom: this.props.values.collaborateur, pourcent: this.pourcentRestant()})
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

export default PageAssistantPartageInterpretation