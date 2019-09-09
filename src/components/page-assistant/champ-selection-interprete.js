import React, { Component } from 'react';
import { Dropdown } from "semantic-ui-react";
import { FormulaireMusicien } from "./formulaire-musicien";
import '../../assets/scss/page-assistant/champ.scss';
import TitreChamp from "./titre-champ";
import RightHolderOptions from "./right-holder-options";

export class ChampSelectionInterprete extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedMusicians: this.props.values || [],
            dropdownValue: null
        };
    }

    rightHolderOptions() {
        return RightHolderOptions(this.props.rightHolders);
    }

    selectedDropdownValues() {
        return Object.keys(this.state.selectedMusicians);
    }

    componentDidUpdate(prevProps, prevState) {

    }

    selectedItems() {
        return this.rightHolderOptions().filter(this.isSelectedItem);
    }

    isSelectedItem = item => Object.keys(this.state.selectedMusicians).includes(item.value);

    unselectedItems() {
        return this.rightHolderOptions().filter(this.isUnselectedItem);
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

    unselectItem(event, item) {
        event.preventDefault();

        const addMusician = (newObject, uuid) => {
            newObject[uuid] = this.state.selectedMusicians[uuid];
            return newObject;
        };

        const selectedUuids = Object.keys(this.state.selectedMusicians).filter(uuid => uuid !== item.value);
        const newMusicians = selectedUuids.reduce(addMusician, {});

        this.setState({
            selectedMusicians: newMusicians,
            dropdownValue: null
        });
    }

    handleChange = (event, { value }) => {
        event.preventDefault();
        this.selectItem(value);
    };

    selectItem(itemValue) {
        const newMusician = {
            [itemValue]: {
                roles: [],
                instruments: []
            }
        };

        const musiciansToAdd = this.isSelectedItem({ value: itemValue }) ? {} : newMusician;
        const newMusicians = Object.assign({}, this.state.selectedMusicians, musiciansToAdd);

        this.setState({
            selectedMusicians: newMusicians,
            dropdownValue: null
        });
    }


    render() {
        return (
            <label>
                <TitreChamp
                    label={ this.props.label }
                    description={ this.props.description }
                />

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
