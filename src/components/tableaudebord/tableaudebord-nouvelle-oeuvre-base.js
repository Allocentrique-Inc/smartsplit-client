import { withTranslation } from "react-i18next"
import React, { Component } from 'react'
import InfoBulle from '../partage/InfoBulle'
import { ChampTexteAssistant } from '../formulaires/champ-texte'
import BoutonsRadio from '../formulaires/champ-radio'

const ORIGINALE = 0, ARRANGEMENT = 1, REPRISE = 2

class Base extends Component {

    constructor(props) {
        super(props)
        this.state = {
            values: props.values
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.values !== nextProps.values) {
            this.setState({ values: nextProps.values })
        }
    }

    render() {
        let t = this.props.t
        return (          
            <>
                <div className="ui grid">
                    <div className="ui row">
                        <div className="ui column" />
                        <div className="ui fifteen wide column">
                            <label>{t('oeuvre.attribut.indication.titre')}
                                &nbsp;&nbsp;<InfoBulle pos={{ x: 300, y: 80 }} text={t('oeuvre.attribut.indication.titre-soustexte')} />
                            </label>
                        </div>
                    </div>
                    <div className="ui row">
                        <div className="ui column" />
                        <div className="ui twelve wide column">
                            <ChampTexteAssistant
                                style={{ marginLeft: "0" }}
                                modele="title"
                                requis={true}
                                autoFocus={true}
                            />
                        </div>
                    </div>
                    <div style={{ marginTop: "20px" }} className="ui row">
                        <div className="ui column" />
                        <div className="ui fifteen wide column">
                            <BoutonsRadio
                                modele="type"
                                etiquette={t('options.piece.titre')}
                                actif={this.state.values.type || 0}
                                requis={true}
                                choix={[
                                    {
                                        nom: t('options.piece.originale'),
                                        valeur: ORIGINALE,
                                    },
                                    {
                                        nom: t('options.piece.arrangement'),
                                        valeur: ARRANGEMENT
                                    },
                                    {
                                        nom: t('options.piece.reprise'),
                                        valeur: REPRISE
                                    }
                                ]}
                                onClick={(e) => {
                                    let valeur
                                    // Clic de la puce ou de l'étiquette ?
                                    if (e.target.nodeName === 'LABEL') {
                                        valeur = e.target.parentNode.childNodes[0].value
                                    }
                                    if (e.target.nodeName === 'INPUT') {
                                        valeur = e.target.value
                                    }
                                    this.props.setFieldValue('type', valeur)
                                }}
                            />
                        </div>
                    </div>
                </div>
            </>              
        )
    }
}

export default withTranslation()(Base)