import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import { Wizard } from '../formulaires/assistant'
import { Form } from 'semantic-ui-react'
import ModifyUser from '../auth/ModifyUser'
import {Entites} from '../../utils/application'

class ChampListeEntiteMusicaleAssistant extends Component {

    constructor(props) {
        super(props)
        if (this.props.onRef)
            this.props.onRef(this)
        this.state = {
            rightHolderId: props.rightHolderId, // uuid de l'ayant-droit qui consulte la liste
            etiquette: props.etiquette,
            indication: props.indication,
            modele: props.modele,
            autoFocus: props.autoFocus,
            requis: props.requis,
            fluid: props.fluid,
            multiple: props.multiple,
            recherche: props.recherche,
            selection: props.selection,
            onInput: props.onInput,
            ajout: props.ajout,
            nomCommeCle: props.nomCommeCle
        }
        this.OPTIONS = []
        this.listeAyantsDroit = this.listeEntites.bind(this)
        this.onChange = props.onChange
        this.surAjout = this.surAjout.bind(this)
    }

    componentWillMount() {
        this.listeEntites()
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.etiquette !== nextProps.etiquette) {
            this.setState({ etiquette: nextProps.etiquette })
        }
        if (this.props.indication !== nextProps.indication) {
            this.setState({ indication: nextProps.indication })
        }
        if (this.props.collaborateurs !== nextProps.collaborateurs) {
            this.recalculerOptions(nextProps.collaborateurs)
        }
    }

    listeEntites() {
        // Récupérer la liste des ayant-droits
        let aOptions = []
        Entites.entites.forEach((elem) => {
            if (!this.state.rightHolderId || elem.members.includes(this.state.rightHolderId)) {
                aOptions.push({
                    key: elem.uuid,
                    text: elem.name,
                    value: elem.name
                })
            }
        })
        if (!this.OPTIONS) {
            this.OPTIONS = aOptions
        }
        if(aOptions) {
            this.setState({ options: aOptions })
        }
    }

    surAjout(e) {
        this.props.surAjout(e, () => { this.listeEntites() })
    }

    render() {
        let t = this.props.t
        return (            
            <div>
                {
                    this.state.options && (
                        <Wizard.Field
                            title={"Ajouter"}
                            name={this.state.modele}
                            component={Form.Dropdown}
                            componentProps={{
                                id: "artist",
                                label: this.state.etiquette,
                                placeholder: t("flot.split.collaborateur.attribut.etiquette.ajout"),
                                required: this.state.requis,
                                autoFocus: this.state.autoFocus,
                                fluid: true,
                                search: true,
                                selection: false,
                                multiple: false,
                                options: this.state.options,
                                allowAdditions: this.state.ajout,
                                onAddItem: this.surAjout,
                                clearable: false
                            }} />
                    )
                }
                <ModifyUser
                    open={this.state.open}
                    firstName={this.state.firstName}
                    close={() => {
                        this.setState({ open: false }, () => {
                            if (this.props.close) {
                                this.props.close()
                            }
                        })
                    }}
                    fn={() => {
                        this.listeEntites()
                    }}
                />
            </div>
        )
    }
}

export default withTranslation()(ChampListeEntiteMusicaleAssistant)