import React, {Component} from 'react'
import { Modal, Label, Button } from 'semantic-ui-react'
import { withTranslation } from 'react-i18next'

const etiquetteStyle = {
    fontFamily: "IBM Plex Sans",
    backgroundColor: 'transparent',
    fontSize: "16px",
    margin: "0"
}

class ModaleAnalyseAudio extends Component {

    constructor(props) {
        super(props)
        this.state = {
            open: props.open,
            onClose: props.onClose,
            action: props.action,
            analyse: props.analyse
        }
    }

    render() {
        let t = this.props.t
        return (
            <Modal
                open={this.state.open}
                onClose={this.state.onClose}>
                <Modal.Header>{t('flot.acr.titre')}</Modal.Header>
                <Modal.Content>
                    <Label style={etiquetteStyle}>{t('oeuvre.attribut.etiquette.titre')}</Label><span>{this.state.analyse.title}</span><p />
                    <Label style={etiquetteStyle}>{t('oeuvre.attribut.etiquette.artiste')}</Label><span>{this.state.analyse.artists && this.state.analyse.artists[0] && this.state.analyse.artists[0].name}</span><p />
                    <Label style={etiquetteStyle}>{t('oeuvre.attribut.etiquette.editeur')}</Label><span>{this.state.analyse.label}</span><p />
                    <Label style={etiquetteStyle}>{t('oeuvre.attribut.etiquette.album')}</Label><span>{this.state.analyse.album && this.state.analyse.album.name}</span><p />
                    <Label style={etiquetteStyle}>{t('oeuvre.attribut.etiquette.isrc')}</Label><span>{this.state.analyse.external_ids && this.state.analyse.external_ids.isrc}</span><p />
                    <Label style={etiquetteStyle}>{t('oeuvre.attribut.etiquette.datePublication')}</Label><span>{this.state.analyse.release_date}</span><p />
                </Modal.Content>
                <Modal.Actions>
                    <h3>{t('flot.acr.importer')}</h3>
                    <Button onClick={() => this.state.onClose(false)} negative>{t('flot.acr.non')}</Button>
                    <Button onClick={() => { this.state.action();; this.state.onClose(false) }} positive icon='checkmark' labelPosition='right' content={t('flot.acr.oui')} />
                </Modal.Actions>
            </Modal>
        )
    }
}

export default withTranslation()(ModaleAnalyseAudio)