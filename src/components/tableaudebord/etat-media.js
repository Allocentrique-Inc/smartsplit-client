import React, {Component} from 'react'
import {utils} from '../../utils/application'
import pendingIcon from '../../assets/svg/icons/pending.svg'
import checkCircle from '../../assets/svg/icons/check-circle.svg'
import xIcon from '../../assets/svg/icons/x.svg'
import { withTranslation } from 'react-i18next'

class EtatMedia extends Component {

    constructor(props) {
        super(props)
        this.state = {
            pochette: props.pochette,
            proposition: props.proposition,
            media: props.media
        }
    }

    render() {
        const t = this.props.t
        let image
        let etat = this.state.proposition.etat
        let fn
        switch(etat) {
            case "BROUILLON":
                image = pendingIcon
                fn = () => {
                    utils.naviguerVersPoursuivreDocumentation(this.state.proposition.uuid)
                }
                break;
            case "PRET":
                image = pendingIcon
                fn = () => {
                    utils.naviguerVersEnvoyerAuxCollaborateurs(this.state.media.mediaId)
                }
                break;
            case "VOTATION":
                image = pendingIcon
                fn = () => {
                    utils.naviguerVersSommairePartage(this.state.media.mediaId)
                }
                break;
            case "REFUSE":
                image = xIcon
                fn = () => {
                    utils.naviguerVersSommairePartage(this.state.media.mediaId)
                }
                break;
            case "ACCEPTE":
                image = checkCircle
                fn = () => {
                    utils.naviguerVersSommairePartage(this.state.media.mediaId)
                }
                break;
            default:
        }

        return (            
            <div>
                <div style={{display: "inline-flex"}}>
                    <img src={image} alt="État de la proposition la plus récente" />
                </div>
                <div style={{display: "inline-block", marginLeft: "10px"}}>
                    <div className="small-400-color">
                        {t(`flot.split.documente-ton-oeuvre.proposition.etat.${this.state.proposition.etat}`)}
                    </div>
                    <div onClick={fn} className={`cliquable small-500-color ${this.state.pochette ? 'pochette' : 'smartsplit' }`}>
                        {this.state.proposition.etat === "BROUILLON" && t('flot.split.documente-ton-oeuvre.proposition.editer')}
                        {this.state.proposition.etat === "PRET" && t('flot.split.documente-ton-oeuvre.proposition.envoyer')}
                        {this.state.proposition.etat === "VOTATION" && t('flot.split.documente-ton-oeuvre.proposition.sommaire')}
                        {this.state.proposition.etat === "ACCEPTE" && t('flot.split.documente-ton-oeuvre.proposition.sommaire')}
                        {this.state.proposition.etat === "REFUSE" && t('flot.split.documente-ton-oeuvre.proposition.sommaire')}
                    </div>
                </div>
            </div>
        )
    }
}

export default withTranslation()(EtatMedia)