// eslint-disable-next-line
import {AyantsDroit, journal} from '../../utils/application'
import React, { Component } from 'react'
import { Wizard } from '../formulaires/assistant'
import { Form } from 'semantic-ui-react'
import ModifyUser from '../auth/ModifyUser'
import { withTranslation } from 'react-i18next'
import plusCircleGreen from "../../assets/svg/icons/plus-circle-green.svg"
import plusCircleOrange from "../../assets/svg/icons/plus-circle-orange.svg"
// eslint-disable-next-line
const NOM = "ChampListeCollaborateurAssistant"

class ChampListeCollaborateurAssistant extends Component {

    constructor(props) {
        super(props)
        this.state = {
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
            ajout: true,
            nomCommeCle: props.nomCommeCle,
            selectionne: props.selection
        }
        this.OPTIONS = undefined
        this.listeAyantsDroit = this.listeAyantsDroit.bind(this)
        this.onChange = props.onChange
    }

    componentWillMount() {
        this.listeAyantsDroit()
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.requis !== nextProps.requis) {
            this.setState({ requis: nextProps.requis })
        }
        if (this.props.etiquette !== nextProps.etiquette) {
            this.setState({ etiquette: nextProps.etiquette })
        }
        if (this.props.indication !== nextProps.indication) {
            this.setState({ indication: nextProps.indication })
        }
        if (this.props.collaborateurs !== nextProps.collaborateurs) {
            this.recalculerOptions(nextProps.collaborateurs)
        }
        if (this.props.selection !== nextProps.selection) {
            this.setState({ selectionne: nextProps.selection })
        }
    }

    listeAyantsDroit() {
        // Récupérer la liste des ayant-droits 
        let _adParId = AyantsDroit.ayantsDroit
        let _options = []
        let nomsConnus = []
        Object.keys(_adParId).forEach((id, idx) => {
            let elem = _adParId[id]   
            let nom = AyantsDroit.affichageDuNom(elem)
            nomsConnus.push(nom)           
            _options.push (
                {
                    key: this.state.nomCommeCle ? nom : elem.rightHolderId,
                    text: nom,
                    value: this.state.nomCommeCle ? nom : elem.rightHolderId,
                    image: { avatar: true, src: elem.avatar.dataUri }
                }
            )
        })
        this.OPTIONS = _options
        this.setState({ nomsConnus: nomsConnus })
        this.setState({ ayantDroit: _adParId }, () => { if (this.props.onRef) this.props.onRef(_adParId) })
        this.setState({ options: _options }, () => {
            // recalcul des options
            if (this.props.collaborateurs)
                this.recalculerOptions(this.props.collaborateurs)
        })
    }

    recalculerOptions(collaborateurs) {
        // collaborateurs est une liste de collaborateurs à exclure
        let options = Object.assign([], this.OPTIONS)
        collaborateurs.forEach(elem => {
            options.forEach((_e, idx) => {
                if (elem.nom === _e.text) {
                    options.splice(idx, 1)
                }
            })
        })
        this.setState({ options: options })
    }

    handleAddition = (e, { value }) => {
        this.ajoutEnCours = true
        this.setState({ open: true })
        this.setState({ firstName: value })
    }

    triggerLabel(indication) {
        return this.plusCircleLabel(indication)
    }

    additionLabelClasses() {
        const pochetteClass = this.props.pochette ? " pochette" : "";
        return "addition-label" + pochetteClass;
    }

    plusCircle() {
        return this.props.pochette ? plusCircleOrange : plusCircleGreen;
    }

    plusCircleLabel(labelString) {
        return (
            <span className={this.additionLabelClasses()}>
                <img alt="" src={this.plusCircle()} /> {labelString}
            </span>
        )
    }

    additionLabel(t) {
        return this.plusCircleLabel(t("collaborateur.titre2"));
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
                            validate={(val) => {
                                if (this.state.requis) {
                                    const result = val ? undefined : t('validation.requis');
                                    return result;
                                }
                            }}
                            componentProps={{
                                id: "collaborateur",
                                label: this.state.etiquette,
                                placeholder: t("flot.split.documente-ton-oeuvre.bouton.ajout"),
                                autoFocus: this.state.autoFocus,
                                fluid: true,
                                search: true,
                                selection: this.state.selection,
                                multiple: this.state.multiple,
                                options: this.state.options,
                                onAddItem: this.handleAddition,
                                allowAdditions: this.state.ajout,
                                required: this.state.requis,
                                additionLabel: this.additionLabel(t),
                                selectOnBlur: false,
                                selectOnNavigation: false,
                                trigger: this.triggerLabel(t("flot.split.documente-ton-oeuvre.bouton.ajout")),                                            
                                onSelect: (e) => {                                                
                                    if (!this.ajoutEnCours) {
                                        let _nom = e.target.parentElement.getElementsByClassName("text")[0] &&
                                                    e.target.parentElement.getElementsByClassName("text")[0].innerText
                                        if (this.props.fnSelect && this.state.nomsConnus.includes(_nom)) {
                                            this.ouvertureListe = false
                                            this.clicZone = false
                                            this.selection = true
                                            this.props.fnSelect()
                                        }
                                    }                                                
                                },
                                clearable: false
                            }}

                        />
                    )
                }
                <ModifyUser
                    open={this.state.open}
                    firstName={this.state.firstName}
                    close={() => {
                        this.ajoutEnCours = false
                        this.setState({ open: false }, () => {
                            if (this.props.close) {
                                this.props.close()
                            }
                        })
                    }}
                    fn={(uuid) => {
                        if (this.props.fn) {
                            this.props.fn(uuid)
                        }
                        this.ouvertureListe = false
                    }}
                />
            </div>
        )
    }
}

export default withTranslation()(ChampListeCollaborateurAssistant)