import React, { Component } from 'react';
import { Dropdown } from "semantic-ui-react";
import { FormulaireMusicien } from "./formulaire-musicien";

export class ChampSelectionInterprete extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedMusicians: this.props.values || [],
            dropdownValue: null
        };
    }

    selectedDropdownValues() {
        return this.props.values.map(value => value.uuid);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.selectedDropdownValues !== prevState.selectedDropdownValues) {
            this.props.onChange(this.state.selectedDropdownValues);
        }
    }

    selectedItems() {
        return this.props.items.filter(this.isSelectedItem);
    }

    isSelectedItem = item => this.selectedDropdownValues().includes(item.value);

    unselectedItems() {
        return this.props.items.filter(this.isUnselectedItem);
    }

    isUnselectedItem = item => !this.isSelectedItem(item);

    renderSelectedItems() {
        return this.selectedItems().map(item => {
            return (
                <FormulaireMusicien
                    key={ item }
                    pochette={ this.props.pochette }
                    item={ item }
                    onClick={ (event) => {
                        this.unselectItem(event, item);
                    } }
                />
            );
        });
    }

    handleChange = (event, { value }) => {
        event.preventDefault();
        this.selectItem(value);
    };

    selectItem(itemValue) {
        const selectedDropdownValues = [...this.state.selectedDropdownValues()];

        if (!selectedDropdownValues.includes(itemValue)) {
            selectedDropdownValues.push(itemValue);
        }

        this.setState({
            selectedDropdownValues: selectedDropdownValues,
            dropdownValue: null
        });
    }

    unselectItem(event, item) {
        event.preventDefault();
        const selectedDropdownValues = this.state.selectedDropdownValues.filter(value => value !== item.value);

        this.setState({
            selectedDropdownValues: selectedDropdownValues,
            dropdownValue: null
        });
    }


    render() {
        return (
            <label>
                <div className="input-label">
                    { this.props.label }
                </div>

                <p className="input-description">
                    { this.props.description }
                </p>

                { this.renderSelectedItems() }

                <Dropdown
                    placeholder={ this.props.placeholder }
                    fluid
                    search
                    selection
                    selectOnBlur={ false }
                    selectOnNavigation={ false }
                    value={ this.state.dropdownValue }
                    options={ this.unselectedItems() }
                    onChange={ this.handleChange }
                />
            </label>
        );
    }
}
