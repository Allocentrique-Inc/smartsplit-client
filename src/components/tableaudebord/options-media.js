import React, {Component} from 'react'

import moreVertical from '../../assets/svg/icons/more-vertical.svg'
import { Translation } from 'react-i18next'
import { Dropdown } from 'semantic-ui-react'

import Utilitaires from '../../utils/utilitaires'

export default class OptionsMedia extends Component {

    constructor(props) {
        super(props)
        this.state = {
            ayantDroit: props.ayantDroit,
            media: props.media,
            user: props.user,
            etat: props.etat
        }
        this.utils = new Utilitaires(1) // Créé un utilitaire avec le contexte WEB
    }

    render() {
        return (
            <Translation>
                {
                    t =>
                        <div>
                            <Dropdown text="" icon={<img alt="options" src={moreVertical}/>} className="pointing top right">
                                <Dropdown.Menu style={{right: "0", left: "auto"}}>
                                    <Dropdown.Item
                                        text={t("media.options.sommaire")}
                                        onClick={()=>this.utils.naviguerVersSommaire(this.state.media.mediaId)}
                                    />
                                    {
                                        this.state.media.propositions.length > 0 && 
                                        this.state.media.propositions[0].initiatorUuid === this.state.user.username &&
                                        this.state.media.propositions[0].etat === "VOTATION" &&
                                        (
                                            <Dropdown.Item
                                                text={t("media.options.reenvoyer")}
                                                onClick={()=>this.props.reenvoi(this.state.media)}
                                            />
                                        )
                                    }                                    
                                    {/* À venir ...
                                    <Dropdown.Item
                                        text={t("media.options.supprimer")}
                                        onClick={()=>this.props.supprimer(this.state.media)}
                                    /> 
                                    */}
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                }                
            </Translation>
        )
    }
}