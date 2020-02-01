import { AyantsDroit } from '../../utils/application'
import React, { Component } from 'react'
import { Wizard } from '../formulaires/assistant'
import { Form } from 'semantic-ui-react'
import ModifyUser from '../auth/ModifyUser'
import { withTranslation } from 'react-i18next'
import '../../assets/scss/page-assistant/champ.scss'

function required(value) {
    const result = value ? undefined : "Une sélection dans cette liste est obligatoire"
    return result
}

class ChampListeAssistant extends Component {

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
            options: props.options,
            ajout: true
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.etiquette !== nextProps.etiquette) {
            this.setState({ etiquette: nextProps.etiquette })
        }
        if (this.props.indication !== nextProps.indication) {
            this.setState({ indication: nextProps.indication })
        }
        if (this.props.options !== nextProps.options) {
            this.setState({ options: nextProps.options })
        }
        if (this.props.requis !== nextProps.requis) {
            this.setState({ requis: nextProps.requis })
        }
    }

    render() {
        let t = this.props.t
        return (            
            <div>
                <Wizard.Field
                    title={"Ajouter"}
                    name={this.state.modele}
                    component={Form.Dropdown}
                    componentProps={{
                        label: this.state.etiquette,
                        placeholder: t("flot.split.documente-ton-oeuvre.bouton.ajout"),
                        required: this.state.requis,
                        autoFocus: this.state.autoFocus,
                        fluid: this.state.fluid,
                        multiple: this.state.multiple,
                        search: this.state.recherche,
                        selection: this.state.selection,
                        options: this.state.options,
                        allowAdditions: true,
                        onAddItem: this.handleAddition,
                        clearable: true
                    }}
                    validate={this.state.requis && required}
                />
                <ModifyUser
                    open={this.state.open} />
                <i className="right info circle icon blue"></i>
            </div>
        )         
    }

}

export default withTranslation()(ChampListeAssistant)