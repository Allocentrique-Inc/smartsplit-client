import React, { Component } from 'react';
import { Dropdown } from "semantic-ui-react";
import { PersonneSelectionnee } from "./personne-selectionnee";

export class ChampSelection extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedValues: [],
        };
    }

    isSelectedItem = item => this.state.selectedValues.includes(item.value);
    isUnselectedItem = item => !this.isSelectedItem(item);

    selectedItems() {
        return this.props.items.filter(this.isSelectedItem);
    }

    unselectedItems() {
        return this.props.items.filter(this.isUnselectedItem);
    }

    renderSelectedItems() {
        return this.selectedItems().map(item => {
            return (
                <PersonneSelectionnee
                    key={ item.key }
                    image={ item.image.src }
                    nom={ item.text }
                    onClick={ (event) => {
                        this.unselectItem(event, item);
                    } }
                />
            );
        })
    }

    handleChange = (event, { value }) => {
        event.preventDefault();
        this.selectItem(value);
        this.setState({
            selectedValue: null
        });
    };

    selectItem(itemValue) {
        const selectedValues = this.state.selectedValues;

        if (!selectedValues.includes(itemValue)) {
            selectedValues.push(itemValue);
        }

        this.setState({
            selectedValues: selectedValues
        });
    }

    unselectItem(event, item) {
        event.preventDefault();
        const selectedValues = this.state.selectedValues.filter(value => value !== item.value);

        this.setState({
            selectedValues: selectedValues,
            selectedValue: null
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
                    value={ this.state.selectedValue }
                    onChange={ this.handleChange }
                    options={ this.unselectedItems() }
                />
            </label>
        );
    }
}
