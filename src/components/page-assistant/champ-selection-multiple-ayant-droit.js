import React, { Component } from 'react';
import { Dropdown } from "semantic-ui-react";
import { ItemSelectionne } from "./item-selectionne";
import plusCircleGreen from '../../assets/svg/icons/plus-circle-green.svg';
import plusCircleOrange from '../../assets/svg/icons/plus-circle-orange.svg';
import ModifyUser from "../auth/ModifyUser";
import '../../assets/scss/page-assistant/champ.scss';
import TitreChamp from "./titre-champ";


export default class ChampSelectionMultipleAyantDroit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalOpen: false,
            modalFirstName: '',
            selectedValues: this.props.value || [],
            dropdownValue: null,
            searchQuery: '',
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

    plusCircleLabel(labelString) {
        return (
            <span className={ this.additionLabelClasses() }>
                <img src={ this.plusCircle() }/> { labelString }
            </span>
        );
    }

    triggerLabel() {
        return this.state.searchQuery ?
            '' :
            this.plusCircleLabel(this.props.placeholder);
    }

    additionLabel() {
        return this.plusCircleLabel('Ajouter comme collaborateur :');
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
        console.log('handleAddItem');
        this.setState({
            modalOpen: true,
            modalFirstName: value
        }, () => console.log(this.state));
    };

    handleSearchChange = (event, { searchQuery }) => {
        this.setState({ searchQuery: searchQuery });
    };

    handleBlur = () => {
        this.setState({ searchQuery: '' });
    };

    render() {
        return (
            <>
                <div className="champ">
                    <label>
                        <TitreChamp
                            label={ this.props.label }
                            description={ this.props.description }
                        />

                        { this.renderSelectedItems() }

                        <Dropdown
                            trigger={ this.triggerLabel() }
                            fluid
                            search
                            selection
                            selectOnBlur={ false }
                            selectOnNavigation={ false }
                            allowAdditions
                            additionLabel={ this.additionLabel() }
                            value={ this.state.dropdownValue }
                            options={ this.unselectedItems() }
                            onBlur={ this.handleBlur }
                            onChange={ this.handleChange }
                            onAddItem={ this.handleAddItem }
                            onSearchChange={ this.handleSearchChange }
                        />
                    </label>
                </div>

                <ModifyUser
                    open={ this.state.modalOpen }
                    firstName={ this.state.modalFirstName }                   
                    onClose={ () => this.setState({ modalOpen: false, modalFirstName: '' }) }
                />
            </>
        );
    }
}