import React, { Component } from 'react';
import { Dropdown } from "semantic-ui-react";
import { ItemSelectionne } from "./item-selectionne";
import plusCircleGreen from '../../assets/svg/icons/plus-circle-green.svg';
import plusCircleOrange from '../../assets/svg/icons/plus-circle-orange.svg';

export class ChampSelectionPersonne extends Component {
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

    plusCircle() {
        return this.props.pochette ? plusCircleOrange : plusCircleGreen;
    }

    additionLabelClasses() {
        const pochetteClass = this.props.pochette ? ' pochette' : '';
        return 'addition-label' + pochetteClass;
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

    handleAddItem = (event, { value }) => {
        console.log('Calling modal');
    };


    render() {
        return (
            <div className="champ">
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
                        allowAdditions
                        additionLabel={ <span className={ this.additionLabelClasses() }><img src={ this.plusCircle() }/> Ajouter comme collaborateur :</span> }
                        value={ this.state.dropdownValue }
                        options={ this.unselectedItems() }
                        onChange={ this.handleChange }
                        onAddItem={ this.handleAddItem }
                    />
                </label>
            </div>
        );
    }
}
