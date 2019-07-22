/**
 * Saisie du collaborateur principal de l'oeuvre
 */

import React, { Component } from "react"
import { Translation } from 'react-i18next'

// Composantes
import Beignet from '../visualisation/partage/beignet'
import { FieldArray } from "formik";

class PageAssistantPartageAuteur extends Component {

    constructor(props) {
        super(props)
        this.state = {
            parts: []
        }
    }
    
    render() {

        return (
            <Translation>
                {
                    (t) =>
                        <React.Fragment>                            
                            <h1>Partage du droit d'auteur</h1>

                            <FieldArray
                                name="droitAuteur"
                                render={arrayHelpers => (
                                    <div>
                                        {
                                            this.props.values.droitAuteur.map((part, index)=>(
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
                                                            Collaborateur ici
                                                        </div>                                                            
                                                    </div>                                                                                                                                                    
                                                </div>
                                            ))
                                        }
                                        <button
                                            type="button"                                                
                                            onClick={() => arrayHelpers.insert()}
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

export default PageAssistantPartageAuteur