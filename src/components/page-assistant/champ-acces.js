import React from 'react';
import { Dropdown } from "semantic-ui-react";
import TitreChamp from "./titre-champ";
import '../../assets/scss/page-assistant/champ-acces.scss';


export default class ChampAcces extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            value: this.props.value || this.props.options[0].value
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.value !== prevState.value && this.props.onChange) {
            this.props.onChange(this.state.value);
        }
    }

    trigger() {
        const selectedOption = this.props.options.find(option => option.value === this.state.value);
        const iconSrc = selectedOption['icon-image'];
        const iconText = selectedOption.text;

        return (<img src={ iconSrc } alt={ iconText }/>);
    }

    handleChange = value => {
        this.setState({ value: value });
    }

    render() {
        return (
            <div className="champ champ-acces">
                <label>
                    <TitreChamp
                        label={ 'Accès' }
                    />

                    <Dropdown
                        trigger={ this.trigger() }
                        fluid
                        selection
                        direction='right'
                        options={ this.props.options }
                        onChange={ (event, { value }) => this.handleChange(value) }
                    />
                </label>
            </div>
        );
    }
}
