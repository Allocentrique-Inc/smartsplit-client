import React, { Component } from 'react';
import { Dropdown } from "semantic-ui-react";
import { FormulaireMusicien } from "./formulaire-musicien";
import '../../assets/scss/page-assistant/champ.scss';
import TitreChamp from "./titre-champ";
import RightHolderOptions from "./right-holder-options";
import * as roles from '../../assets/listes/role-uuids.json';

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

    isSelectedItem = item => Object.keys(this.props.musicians).includes(item.value);

    unselectedItems() {
        return this.rightHolderOptions().filter(this.isUnselectedItem);
    }

    isUnselectedItem = item => !this.isSelectedItem(item);

    renderSelectedItems() {
        return this.selectedItems().map(item => {
            return (
                <FormulaireMusicien
                    key={ item.value }
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
        const newMusicianUuid = item.value;
        const newMusicians = Object.assign(this.props.musicians);
        const newMusician = Object.assign({ roles: [], instruments: [] }, newMusicians[newMusicianUuid]);

        newMusician.roles = newMusician.roles.filter(role => role !== roles.musician && role !== role.principal && role.accompaniment);
        newMusician.instruments = [];

        newMusicians[newMusicianUuid] = newMusician;

        this.props.onChange(newMusicians);

        this.setState({
            dropdownValue: null
        });
    }

    handleChange = (event, { value }) => {
        event.preventDefault();
        this.selectItem(value);
    };

    selectItem(uuid) {
        const musician = Object.assign(
            {},
            { roles: [], instruments: [] },
            this.props.values.rightHolders[uuid]
        );

        musician.roles = musician.roles.concat([roles.musician]);

        const newMusicians = Object.assign(
            {},
            this.props.musicians,
            { [uuid]: musician }
        );

        this.props.onChange(newMusicians);

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
