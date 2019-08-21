import React, { Component } from 'react';
import { Dropdown } from "semantic-ui-react";
import { ItemSelectionne } from "./item-selectionne";

export class ChampSelectionMultiple extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedValues: this.props.value || [],
            dropdownValue: null
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.selectedValues !== prevState.selectedValues) {
            this.props.onChange(this.state.selectedValues);
        }
    }

    selectedItems() {
        return this.props.items.filter(this.isSelectedItem);
    }

    isSelectedItem = item => this.state.selectedValues.includes(item.value);

    unselectedItems() {
        return this.props.items.filter(this.isUnselectedItem);
    }

    isUnselectedItem = item => !this.isSelectedItem(item);

    renderSelectedItems() {
        return this.selectedItems().map(item => {
            return (
                <ItemSelectionne
                    key={ item.key }
                    image={ item.image.src }
                    nom={ item.text }
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
        const selectedValues = [...this.state.selectedValues];

        if (!selectedValues.includes(itemValue)) {
            selectedValues.push(itemValue);
        }

        this.setState({
            selectedValues: selectedValues,
            dropdownValue: null
        });
    }

    unselectItem(event, item) {
        event.preventDefault();
        const selectedValues = this.state.selectedValues.filter(value => value !== item.value);

        this.setState({
            selectedValues: selectedValues,
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
                    /*trigger={ <span>Auteur <img src={ chevronDown } alt="chevron-down"/></span> }*/
                    placeholder={ this.props.placeholder }
                    fluid
                    search
                    selection
                    selectOnBlur={false}
                    selectOnNavigation={false}
                    value={ this.state.dropdownValue }
                    options={ this.unselectedItems() }
                    onChange={ this.handleChange }
                />
            </label>
        );
    }
}
