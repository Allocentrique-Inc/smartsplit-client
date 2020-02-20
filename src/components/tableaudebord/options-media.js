import React, {Component} from 'react'
import moreVertical from '../../assets/svg/icons/more-vertical.svg'
import { withTranslation } from 'react-i18next'
import { Dropdown } from 'semantic-ui-react'
import {config, utils} from '../../utils/application'
import { toast } from 'react-toastify'
import axios from "axios"

class OptionsMedia extends Component {

    constructor(props) {
        super(props)
        this.state = {
            ayantDroit: props.ayantDroit,
            media: props.media,
            user: props.user,
            etat: props.etat
        }
    }

    // TODO: Déplacer à un endroit qui fait du sense, faut vraiment arrêter de tout mettre dans les composantes...
    dupliquerMedia = async () => {
        try {
            const newMedia = await axios.post(
                `${config.API_URL}media/${this.state.media.mediaId}/duplicate`,
                {proposals: true}
            )

            this.props.modaleDupliquerOeuvre(newMedia.data, true)
        } catch(e) {
            console.error("Erreur lors de la duplication de l'oeuvre", e)
            toast.error(this.props.t("media.erreurs.duplication"))
        }
    }

    render() {
        const t = this.props.t
        return (            
            <div>
                <Dropdown text="" icon={<img alt="options" src={moreVertical}/>} className="pointing top right">
                    <Dropdown.Menu style={{right: "0", left: "auto"}}>
                        <Dropdown.Item
                            text={t("media.options.sommaire")}
                            onClick={()=>utils.naviguerVersSommaire(this.state.media.mediaId)}
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
                        <Dropdown.Item
                            text={t("media.options.dupliquer")}
                            onClick={this.dupliquerMedia}
                        />
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        )
    }
}

export default withTranslation()(OptionsMedia)
