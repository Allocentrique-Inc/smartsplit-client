/**
 * Saisie du collaborateur principal de l'oeuvre
 */

import React, { Component } from "react"
import { Translation } from 'react-i18next'

// Composantes
import Beignet from '../visualisation/partage/beignet'
import ChampGradateurAssistant from '../formulaires/champ-gradateur'

import { FieldArray } from "formik";
import PartageCollaborateur from "./partage-collaborateur";

const MODES = {manuel: 0, egal: 1}

class PageAssistantPartageEnregistrement extends Component {

    constructor(props) {
        super(props)
        this.state = {
            parts: {vincent: 100},
            mode: MODES.egal
        }
    }
    
    render() {

        return (
            <Translation>
                {
                    (t) =>
                        <React.Fragment>                            
                            <h1>Partage du droit d'enregistrement</h1>

                            <div className="conteneur--beignet">
                                <Beignet key="1" data={this.state.parts}/>
                            </div>

                            <FieldArray
                                name="droitEnregistrement"
                                render={arrayHelpers => (
                                    <div>
                                        {
                                            this.props.values.droitEnregistrement.map((part, index)=>{                                                

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
                                                                <PartageCollaborateur modele={`droitEnregistrement[${index}]`} />
                                                                <ChampGradateurAssistant modele={`droitEnregistrement[${index}].pourcent`} pourcent={100} changement={()=>{
                                                                    console.log('Changement du gradateur...')
                                                                }}/>
                                                            </div>                                                            
                                                        </div>                                                                                                                                                    
                                                    </div>
                                                )
                                            })
                                        }
                                        <button
                                            type="button"                                                
                                            onClick={
                                                () => {
                                                    arrayHelpers.insert()
                                                    // Crééer un objet convenable
                                                    let idx = this.props.values.droitEnregistrement.length - 1
                                                    this.props.values.droitEnregistrement[idx] = {nom: "", pourcent: 50}
                                                }
                                            }
                                        >
                                            <i className="plus circle icon big green"></i>
                                        </button>
                                    </div>
                                )}
                            />
                        </React.Fragment>
                }
            </Translation>    
        )
    }
}

export default PageAssistantPartageEnregistrement