import {config, AyantsDroit, journal, utils} from '../../utils/application'
import React, { Component } from 'react'
import { Wizard } from 'semantic-ui-react-formik-iptoki'
import axios from 'axios'
import { withTranslation } from 'react-i18next'
import Base from './tableaudebord-nouvelle-oeuvre-base'
import Page2NouvellePiece from './tableaudebord-nouvelle-piece-page2'
import "../../assets/scss/assistant-form.scss";

const NOM = "NouvelleOeuvre"

class NouvelleOeuvre extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user: props.user,
            pochette: props.pochette
        }
        this.soumettre = this.soumettre.bind(this)
        this.changementPage = this.changementPage.bind(this)
        this.changement = this.changement.bind(this)
    }

    componentWillMount() {
        let res = AyantsDroit.ayantsDroitBrut        
        // Ordonnancement simple uuid -> nom d'artiste
        let assocUuidArtiste = {}
        res.forEach(e => {
            assocUuidArtiste[e.rightHolderId] = e.artistName || `${e.firstName} ${e.lastName}`
        })
        this.setState({ assocUuidArtiste: assocUuidArtiste },
            () => this.setState({ rightHolders: res })
        )
    }

    changement(values) {
        this.setState({ valeurs: values })
    }

    changementPage(no, t) {
        if (no === 1 && !this.state.mediaId) {
            // On arrive sur la page 1 de la page 0
            // Création de l'oeuvre avec uniquement le titre et le type
            let title = this.state.valeurs.title
            let type
            if (this.state.valeurs.type === "0") {
                type = "ORIGINALE"
            }
            if (this.state.valeurs.type === "1") {
                type = "ARRANGEMENT"
            }
            if (this.state.valeurs.type === "2") {
                type = "REPRISE"
            }
            axios.put(`${config.API_URL}media`, { title: title, type: type, creator: this.state.user.username })
            .then(res => {
                // Enregistrement du mediaId pour sauvegarde des données dans handleSubmit
                this.setState({ mediaId: res.data.id })
                this.props.parent.setState({ mediaId: res.data.id }) // Condition d'apparition du lecteur audio
            })
            .catch(err=>journal.error(NOM, err))
        }
    }

    soumettre(values) {

        let rHs = []

        // Participants créés avec le rôle d'interprète principal par défaut.
        if (values.rightHolders)
            values.rightHolders.forEach(rH => rHs.push({ id: rH, roles: ["45745c60-7b1a-11e8-9c9c-2d42b21b1a38"] }))

        let body = {
            creator: this.props.user.username,
            mediaId: `${this.state.mediaId}`,
            title: values.title,
            album: values.album,
            artist: values.artist,
            vedettes: values.vedettes,
            msDuration: values.durationMs,
            type: values.type,
            publishDate: values.publishDate,
            publisher: values.publisher,
            rightHolders: rHs,
            socialMediaLinks: values.socialMediaLinks,
            streamingServiceLinks: values.streamingServiceLinks,
            pressArticleLinks: values.pressArticleLinks,
            playlistLinks: values.playlistLinks,
            files: values.files,
            remixer: values.arrangeur
        }
        this.props.parent.state.audio.stop()

        axios.post(`${config.API_URL}media`, body)
            .then(res => {
                if (this.state.pochette) {
                    utils.naviguerVersDocumentation(body.mediaId)                    
                } else {
                    utils.naviguerVersNouveauPartage(body.mediaId)
                }
            })
            .catch(err => console.log(err))

    }

    setFichier(fichier) {
        this.setState({ fichier: fichier })
    }

    render() {
        if (this.state.rightHolders) {
            let t = this.props.t
            return (                
                <div className={`${this.state.pochette ? "pochette" : ""}`}>
                    {this.state.patience && (
                        <div style={{ width: "100%" }} className="container ui active dimmer">
                            <div className="ui text loader">{t("entete.encours")}</div>
                        </div>
                    )}

                    <Wizard
                        initialValues={{
                            title: undefined,
                            type: undefined,
                            vedettes: []
                        }}
                        buttonLabels={{ previous: t('navigation.precedent'), next: t('navigation.suivant'), submit: t('flot.split.navigation.cest-parti') }}
                        debug={false}
                        onPageChanged={no => this.changementPage(no, t)}
                        onSubmit={(values, { setSubmitting }) => { this.soumettre(values, t); setSubmitting(false) }}
                        style={{ width: "80%" }}
                    >
                        <Wizard.Page
                            validate={values => {
                                this.changement(values)
                                const errors = {};
                                if (!values.title) {
                                    errors.title = t("obligatoire")
                                }
                                return errors
                            }}>
                            <PageNouvellePiece parent={this} rightHolders={this.state.rightHolders} />
                        </Wizard.Page>
                        <Wizard.Page>
                            <Page2NouvellePiece pochette={this.props.pochette} parent={this} rightHolders={this.state.rightHolders} assocUuidArtiste={this.state.assocUuidArtiste} />
                        </Wizard.Page>
                    </Wizard>
                </div>
            )
        } else {
            return (<></>)
        }
    }
}

class PageNouvellePiece extends Component {
    render() {
        return (
            <React.Fragment>
                <Base values={this.props.values} setFieldValue={this.props.setFieldValue} />
            </React.Fragment>
        )
    }
}

export default withTranslation()(NouvelleOeuvre)