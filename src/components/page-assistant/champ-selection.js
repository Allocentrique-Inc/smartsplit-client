import React, { Component } from 'react';
import { Dropdown } from "semantic-ui-react";
import { Translation } from "react-i18next"
import plusCircleGreen from '../../assets/svg/icons/plus-circle-green.svg';
import plusCircleOrange from '../../assets/svg/icons/plus-circle-orange.svg';
import TitreChamp from "./titre-champ";
import '../../assets/scss/page-assistant/champ.scss';
import '../../assets/scss/page-assistant/champ-selection-multiple.scss';

export default class ChampSelection extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: this.props.value || '',
            options: this.props.items || []
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.value !== prevState.value) {
            this.props.onChange(this.state.value);
        }
    }

    plusCircle() {
        return this.props.pochette ? plusCircleOrange : plusCircleGreen;
    }

    additionLabelClasses() {
        const pochetteClass = this.props.pochette ? ' pochette' : '';
        return 'addition-label' + pochetteClass;
    }

    handleChange = (event, { value }) => {
        event.preventDefault();
        this.setState({ value: value });
    };

    handleAddItem = (event, { value }) => {
        event.preventDefault();

        const newOption = {
            key: value,
            value: value,
            text: value
        };

        const newOptions = [...this.state.options].concat([newOption]);

        this.setState({
            options: newOptions,
            value: value
        });
    }

    createLabel() {
        return (
            <Translation>
                {
                    (t) =>

                        this.props.createLabel || t('oeuvre.attribut.etiquette.ajouter-genre')
                }
            </Translation>
        )
    }

    render() {
        return (
            <div className="champ">
                <label>
                    <TitreChamp
                        label={this.props.label}
                        description={this.props.description}
                    />

                    <Dropdown
                        placeholder={this.props.placeholder}
                        fluid
                        search
                        selection
                        allowAdditions
                        additionLabel={<span className={this.additionLabelClasses()}><img alt=""
                            src={this.plusCircle()} /> {this.createLabel()}</span>}
                        value={this.state.value}
                        onChange={this.handleChange}
                        onAddItem={this.handleAddItem}
                        options={this.state.options}
                    />
                </label>
            </div>
        );
    }
}