import React, {Component} from 'react'

import { ChampListeCollaborateurAssistant } from '../formulaires/champ-liste'

export default class PartageCollaborateur extends Component {

    constructor(props) {
        super(props)
        this.state = {
            rightHolder: props.rightHolder,
            modele: props.modele
        }
    }

    render() {    

        if(this.state.rightHolder) {
            // Si un collaborateur est choisi, afficher sa 'fiche'
            return (
                <div>{JSON.stringify(this.state.rightHolder)}</div>
            )
        } else {
            // Sinon, permettre de choisir un collaborateur avec une liste déroulante
            return (
                <div>                                        
                    <ChampListeCollaborateurAssistant
                        modele={`${this.state.modele}.nom`} 
                        etiquette={`Sélection du collaborateur`} 
                        indication={`Choisis le collaborateur à lier à ce droit de l'oeuvre`} 
                        requis={true} autoFocus={true} 
                        multiple={false}
                        close={()=>{
                            this.props.setFieldValue('collaborateur', [])
                        }}/>
                </div>
            )
        }
        
    }
}