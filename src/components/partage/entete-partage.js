/**
 * Saisie du collaborateur principal de l'oeuvre
 */

import React, { Component } from "react"
import { Translation } from 'react-i18next'

import MenuProfil from '../entete/menu-profil'

class EntetePartage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            media: this.props.media,
            user: this.props.user
        }
    }   
    
    render() {

        return (
            <Translation>
                {
                    (t) =>
                        <div className="ui row">                                                               
                            <div className="ui sixteen wide column">
                                <i className="image icon huge grey"></i>
                                {this.state.media && (<span style={{marginLeft: "15px"}} className="ui small-300">{this.state.media.title}</span>)}
                                <span className="ui heading5" style={{marginLeft: "50px"}}>{t('flot.etape.partage-titre')}</span>
                                <span style={{cursor: "pointer", position: "absolute", right: "100px"}} className="entete--partage__enregistrerEtQuitter">
                                    <div style={{marginTop: "10px"}} class="ui medium button">
                                        {t('flot.etape.enregistrerEtQuitter')}
                                    </div> <MenuProfil user={this.state.user} />
                                </span>
                            </div>                            
                        </div>
                }
            </Translation>    
        )
    }
}

export default EntetePartage