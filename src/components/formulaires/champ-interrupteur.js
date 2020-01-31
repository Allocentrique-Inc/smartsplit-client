import React, { Component } from 'react'
import { Wizard } from 'semantic-ui-react-formik-iptoki'
import { Checkbox } from 'semantic-ui-react'

export class ChampInterrupteurAssistant extends Component {

    constructor(props) {
        super(props)
        this.state = {
            etiquette: props.etiquette,
            modele: props.modele,
            actif: false       
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.etiquette !== nextProps.etiquette) {
            this.setState({etiquette: nextProps.etiquette})
        }
    }

    render() {
        return(
            <Wizard.Field
                name={this.state.modele}
                component={Checkbox}
                componentProps={{
                    label: this.state.etiquette,
                    toggle: true,
                    value: `${this.state.actif}`,
                    onClick: ()=>{                        
                        this.setState({actif: !this.state.actif}, ()=>{                            
                            this.props.changement(this.state.actif)                            
                        })
                    }

                }}
            />
        )        
    }
}