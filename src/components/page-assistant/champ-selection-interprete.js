import React, { Component } from 'react';
import { Dropdown } from "semantic-ui-react";
import FormulaireMusicien from "./formulaire-musicien";
import '../../assets/scss/page-assistant/champ.scss';
import TitreChamp from "./titre-champ";
import RightHolderOptions from "./right-holder-options";
import * as roles from '../../assets/listes/role-uuids.json';
import { isUnique, updateRightHolders } from "./right-holder-helpers";
import { Translation } from 'react-i18next';
import ModifyUser from '../auth/ModifyUser';

import plusCircleGreen from '../../assets/svg/icons/plus-circle-green.svg';
import plusCircleOrange from '../../assets/svg/icons/plus-circle-orange.svg';

export class ChampSelectionInterprete extends Component {

    musicianRoles = [
        roles.musician,
        roles.principal,
        roles.accompaniment,
        roles.singer,
        roles.leadVocal,
        roles.spokenVocal,
        roles.backVocal
    ];

    constructor(props) {
        super(props);

        this.state = {
            dropdownValue: null,
            selectedValues: []
        };
    }

    rightHolderOptions() {
        return RightHolderOptions(this.props.rightHolders);
    }

    selectedItems() {
        //console.log(this.props, this.state)
        return this.rightHolderOptions().filter(this.isSelectedItem)

        // Construire items de sorte que ce soit un tableau contenant uniquement les éléments sélectionnés
        // (qui ont le rôle d'interprète)
        
        /* 
        let _items = {}
        let itemsOrdonnes = []    
        items.forEach(e=>_items[e.value] = e)    
        this.props.rightHolders.forEach((e,idx)=>{      
          if(Object.keys(_items).includes(this.state.selectedValues[idx])) {
            itemsOrdonnes.push(_items[this.state.selectedValues[idx]])
          }
        })
        return itemsOrdonnes.reverse() */
      }

    isSelectedItem = item => this.props.musicians.map(musician => musician.id).includes(item.value);

    unselectedItems() {
        return this.rightHolderOptions().filter(this.isUnselectedItem);
    }

    isUnselectedItem = item => !this.isSelectedItem(item);

    renderSelectedItems(langue) {
        return this.selectedItems().map(item => {
            const musician = this.props.musicians.find(musician => musician.id === item.value);

            return (
                <FormulaireMusicien
                    langue={langue}
                    key={item.value}
                    pochette={this.props.pochette}
                    item={item}
                    rightHolder={musician}
                    onClick={(event) => {
                        this.unselectItem(event, item);
                    }}
                    onChange={this.updateRightHolder}
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
        const id = item.value;
        const musician = this.props.values.rightHolders.find(rightHolder => rightHolder.id === id);
        const existingRoles = musician.roles || [];
        const newRoles = existingRoles.filter(this.isNotMusicianRole);
        const newMusician = Object.assign({}, musician, { roles: newRoles });

        const newRightHolders = updateRightHolders(this.props.values.rightHolders, newMusician);

        this.props.onChange(newRightHolders);

        this.setState({
            dropdownValue: null
        });
    }

    isNotMusicianRole = role => {
        return this.musicianRoles.every(musicianRole => role !== musicianRole);
    }

    handleChange = (event, { value }) => {
        event.preventDefault();
        this.selectItem(value);
    };

    selectItem(id) {
        const existingMusician = this.props.values.rightHolders.find(rightHolder => rightHolder.id === id) || {};
        const existingRoles = existingMusician.roles || [];
        const newRoles = existingRoles.concat([roles.principal]).filter(isUnique);
        const emptyMusician = { id: id, roles: [], instruments: [] };

        const newMusician = Object.assign({}, emptyMusician, existingMusician, { roles: newRoles });
        const newRightHolders = updateRightHolders(this.props.values.rightHolders, newMusician);

        this.props.onChange(newRightHolders);
        
        this.setState({            
            dropdownValue: null
        })

    }

    additionLabelClasses() {
        const pochetteClass = this.props.pochette ? " pochette" : "";
        return "addition-label" + pochetteClass;
    }

    plusCircle() {
        return this.props.pochette ? plusCircleOrange : plusCircleGreen;
    }

    plusCircleLabel(labelString) {
        return (
            <span className={this.additionLabelClasses()}>
                <img alt="" src={this.plusCircle()} /> {labelString}
            </span>
        );
    }

    triggerLabel() {
        return this.state.searchQuery
            ? ""
            : this.plusCircleLabel(this.props.placeholder);
    }

    handleSearchChange = (event, { searchQuery }) => {
        this.setState({ searchQuery: searchQuery });
    };

    handleBlur = () => {
        this.setState({ searchQuery: "" });
    };

    handleAddItem = (event, { value }) => {
        event.preventDefault()
        this.setState({
            modalOpen: true,
            modalFirstName: value
        });
    };

    render() {
        return (
            <Translation>
                {
                    (t, i18n) =>
                        <label>

                            {
                                i18n &&
                                <>
                                    <TitreChamp
                                        label={this.props.label}
                                        description={this.props.description}
                                    />                                    

                                    <Dropdown
                                        trigger={this.triggerLabel()}
                                        placeholder={this.props.placeholder}
                                        fluid
                                        search
                                        selection
                                        selectOnBlur={false}
                                        selectOnNavigation={false}
                                        value={this.state.dropdownValue}
                                        options={this.unselectedItems()}
                                        onChange={this.handleChange}
                                        allowAdditions={true}
                                        onAddItem={this.handleAddItem}
                                        onBlur={this.handleBlur}
                                        onSearchChange={this.handleSearchChange}
                                    />

                                    <br />
                                    {this.renderSelectedItems(i18n.lng.substring(0, 2))}

                                    <ModifyUser
                                        open={this.state.modalOpen}
                                        pochette={this.props.pochette}
                                        firstName={this.state.modalFirstName}
                                        close={() =>
                                            this.setState({ modalOpen: false, modalFirstName: "" })
                                        }
                                        fn={
                                            (e) => {
                                                this.selectItem(e)
                                                /* let values = this.state.selectedValues
                                                values.push(e)
                                                this.setState({ selectedValues: values }) */
                                                if (this.props.fn) {
                                                    this.props.fn(e)
                                                }
                                            }
                                        }
                                    />
                                </>
                            }

                        </label>
                }
            </Translation>
        );
    }
}
