/**
 * Saisie du titre et de l'image de l'oeuvre.
 *
 * Cet écran apparaît sans progression au-dessus.
 */

import React, { Component } from 'react';
import { confirmAlert } from 'react-confirm-alert';

// Traduction
import { Translation } from 'react-i18next';

// Alertes
import { toast } from 'react-toastify';

// Champs de formulaire
import { ChampTexteAssistant } from '../formulaires/champ-texte';
import { ChampTeleversement } from '../formulaires/champ-televersement';
import { ChampInterrupteurAssistant } from '../formulaires/champ-interrupteur';

// Image de méditation
import image from '../../assets/images/meditation-ecouteurs-femme.jpg';

// CSS
import 'react-confirm-alert/src/react-confirm-alert.css';
import '../../assets/scss/assistant-form.scss';

class PageAssistantOeuvreEmbarquement extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pctProgression: props.pctProgression
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.pctProgression !== nextProps.pctProgression) {
            this.setState({ pctProgression: nextProps.pctProgression });
        }

        if (this.props.audio !== nextProps.audio) {
            this.setState({ audio: nextProps.audio });
        }
    }

    render() {
        return (
            <Translation>
                { (t) =>
                    <React.Fragment>
                        <div className="ui container assistant-container">
                            <div className="ui grid">
                                <div
                                    className="ui sixteen wide mobile eight wide tablet eight wide computer column"
                                >
                                    <div>
                                        { t('flot.documente-ton-oeuvre.preambule') }
                                    </div>

                                    <h1>
                                        { t('flot.documente-ton-oeuvre.titre') }
                                    </h1>

                                    <ChampTexteAssistant
                                        etiquette={ t('oeuvre.attribut.etiquette.titre') }
                                        indication={ t('oeuvre.attribut.indication.titre') }
                                        modele="title" requis={ true } autoFocus={ true } info={ true }
                                    />

                                    <br/>

                                    <ChampInterrupteurAssistant modele="cover"
                                                                etiquette={ t('oeuvre.attribut.etiquette.reprise') }
                                                                changement={ (a) => {
                                                                    this.props.setFieldValue('cover', `${ a }`, false)
                                                                } }/>

                                    <h2>{ t('composant.televersement.titre') }</h2>

                                    <p>
                                        { t('composant.televersement.preambule') }
                                    </p>

                                    <ChampTeleversement audio={ this.props.audio } values={ this.props.values }
                                                        indication={ t('composant.televersement.indication') }
                                                        chargement={ (f) => {
                                                            this.props.setFieldValue('fichiers', f, false)
                                                            this.props.setFieldValue('title', f[0].path, false)
                                                        } }
                                                        apres={ (f, t) => {

                                                            if (f.music.err) {
                                                                switch (f.music.err) {
                                                                    case "AUDIO-MAUVAISE-LECTURE":
                                                                        toast.warn(t('traitement.acr.erreur-mauvaise-lecture'))
                                                                        break;
                                                                    case "AUDIO-INCONNU":
                                                                        toast.warn(t('traitement.acr.erreur-inconnu'))
                                                                        break;
                                                                    default:
                                                                        toast.warn(f.music.err)
                                                                }
                                                            }

                                                            if (f && !f.music.err) {

                                                                this.props.setFieldValue('fichiers', f, false)

                                                                let analyse = f.music[0] // Il peut y avoir plus d'un résultat

                                                                toast(t('flot.envoifichier.reussi') + ` ${ f.nom }`)

                                                                confirmAlert({
                                                                    title: `Un résultat d'enregistrement est détecté pour ton œuvre!`,
                                                                    message: `Veux-tu que je remplisse tous les champs, pour voir ce que ça donne ?`,
                                                                    buttons: [
                                                                        {
                                                                            label: 'Oui, je le veux !!',
                                                                            onClick: () => {
                                                                                this.props.setFieldValue('title', analyse.title, false)
                                                                                this.props.setFieldValue('publisher', analyse.label ? analyse.label : analyse.artists[0].name, false)
                                                                                this.props.setFieldValue('artist', analyse.artists[0].name, false)

                                                                                // Création des ayant-droits
                                                                                let ayantDroits = []
                                                                                analyse.artists.forEach((artiste, idx) => {
                                                                                    let role = idx === 0 ? ['R1', 'R2'] : []
                                                                                    let prenom = artiste.name.split(" ").length === 2 ? artiste.name.split(" ")[0] : ""
                                                                                    let nom = artiste.name.split(" ").length === 2 ? artiste.name.split(" ")[1] : ""
                                                                                    ayantDroits.push({
                                                                                        prenom: prenom,
                                                                                        nom: nom,
                                                                                        artiste: artiste.name,
                                                                                        role: role
                                                                                    })
                                                                                })
                                                                                this.props.setFieldValue('rightHolders', ayantDroits, false)
                                                                                this.props.setFieldValue('instrumental', true, false)
                                                                                this.props.setFieldValue('album', analyse.album.name, false)
                                                                                this.props.setFieldValue('durationMs', `${ analyse.duration_ms }`, false)
                                                                                this.props.setFieldValue('isrc', analyse.external_ids.isrc, false)
                                                                                this.props.setFieldValue('upc', analyse.external_ids.upc, false)
                                                                                this.props.setFieldValue('publishDate', analyse.release_date, false)

                                                                                // Liens commerciaux
                                                                                let liensCommerciaux = []
                                                                                if (analyse.external_metadata.deezer) {
                                                                                    let _url = `https://www.deezer.com/${ this.props.i18n.lng.substring(0, 2) }/album/${ analyse.external_metadata.deezer.album.id }`
                                                                                    liensCommerciaux.push({
                                                                                        lien: _url,
                                                                                        type: "deezer"
                                                                                    })
                                                                                }
                                                                                if (analyse.external_metadata.spotify) {
                                                                                    let _url = `https://open.spotify.com/track/${ analyse.external_metadata.spotify.track.id }`
                                                                                    liensCommerciaux.push({
                                                                                        lien: _url,
                                                                                        type: "spotify"
                                                                                    })
                                                                                }
                                                                                if (analyse.external_metadata.youtube) {
                                                                                    let _url = `https://www.youtube.com/watch?v=${ analyse.external_metadata.youtube.vid }`
                                                                                    liensCommerciaux.push({
                                                                                        lien: _url,
                                                                                        type: "youtube"
                                                                                    })
                                                                                }

                                                                                this.props.setFieldValue('streamingServiceLinks', liensCommerciaux)

                                                                            }
                                                                        },
                                                                        {
                                                                            label: 'Non, merci mais ça va être correct.',
                                                                            onClick: () => {
                                                                            }
                                                                        }
                                                                    ]
                                                                })

                                                            }
                                                        }
                                                        }
                                    />
                                </div>

                                <div
                                    className="ui sixteen wide mobile eight wide tablet eight wide computer column"
                                >
                                    <img src={ image } alt={ t('image.embarquement.alt') }/>
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                }
            </Translation>
        );
    }
}

export default PageAssistantOeuvreEmbarquement
