import React, { Component } from 'react';
import { Dropdown } from "semantic-ui-react";
import { FormulaireMusicien } from "./formulaire-musicien";
import '../../assets/scss/page-assistant/champ.scss';
import TitreChamp from "./titre-champ";
import RightHolderOptions from "./right-holder-options";
import * as roles from '../../assets/listes/role-uuids.json';
import { hasRoles, isUnique } from "./right-holder-helpers";

export class ChampSelectionInterprete extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dropdownValue: null
        };
    }

    rightHolderOptions() {
        return RightHolderOptions(this.props.rightHolders);
    }

    selectedItems() {
        return this.rightHolderOptions().filter(this.isSelectedItem);
    }

    isSelectedItem = item => this.props.musicians.map(musician => musician.id).includes(item.value);

    unselectedItems() {
        return this.rightHolderOptions().filter(this.isUnselectedItem);
    }

    isUnselectedItem = item => !this.isSelectedItem(item);

    renderSelectedItems() {
        return this.selectedItems().map(item => {
            const musician = this.props.musicians.find(musician => musician.id === item.value);

            return (
                <FormulaireMusicien
                    key={ item.value }
                    pochette={ this.props.pochette }
                    item={ item }
                    rightHolder={ musician }
                    onClick={ (event) => {
                        this.unselectItem(event, item);
                    } }
                    onChange={ this.updateRightHolder }
                />
            );
        });
    }

    updateRightHolder = newRightHolder => {
        const newRightHolders = [...this.props.values.rightHolders]
            .filter(rightHolder => rightHolder.id !== newRightHolder.id)
            .concat([newRightHolder]);

        this.props.onChange(newRightHolders);
    }

    unselectItem(event, item) {
        event.preventDefault();
        const newMusicianUuid = item.value;
        const newMusicians = Object.assign(this.props.musicians);
        const newMusician = Object.assign({ roles: [], instruments: [] }, newMusicians[newMusicianUuid]);

        newMusician.roles = newMusician.roles.filter(this.isNotAMusicianRole);
        newMusicians[newMusicianUuid] = newMusician;

        this.props.onChange(newMusicians);

        this.setState({
            dropdownValue: null
        });
    }

    isNotAMusicianRole = role => {
        return (role !== roles.musician) &&
            (role !== roles.principal) &&
            (role !== roles.accompaniment);
    }

    handleChange = (event, { value }) => {
        event.preventDefault();
        this.selectItem(value);
    };

    selectItem(id) {
        const existingMusician = this.props.values.rightHolders.find(rightHolder => rightHolder.id === id) || {};
        const existingRoles = existingMusician.roles || [];
        const newRoles = existingRoles.concat([roles.musician]).filter(isUnique);
        const emptyMusician = { id: id, roles: [], instruments: [] };

        const newMusician = Object.assign({}, emptyMusician, existingMusician, { roles: newRoles });

        const newRightHolders = this.props.values.rightHolders
            .filter(musician => musician.id !== id)
            .concat([newMusician])
            .filter(hasRoles);

        this.props.onChange(newRightHolders);

        this.setState({
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
