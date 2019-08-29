import React, { Component } from 'react';
import { Dropdown } from "semantic-ui-react";
import { FormulaireMusicien } from "./formulaire-musicien";
import Musician from "../../model/musician/musician";

export class ChampSelectionInterprete extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedMusicians: this.props.values || [],
            dropdownValue: null
        };
    }

    rightHolderOptions() {
        return this.props.rightHolders.map(this.makeRightHolderOptions);
    }

    makeRightHolderOptions = rightHolder => {
        return {
            key: rightHolder.rightHolderId,
            value: rightHolder.rightHolderId,
            text: this.makeRightHolderText(rightHolder),
            image: {
                avatar: true,
                src: this.makeRightHolderAvatarUrl(rightHolder)
            }
        };
    };

    makeRightHolderText = rightHolder => {
        return rightHolder.artistName ?
            rightHolder.artistName :
            [rightHolder.firstName, rightHolder.lastName]
                .filter(text => text)
                .join(' ');
    };

    makeRightHolderAvatarUrl = rightHolder => {
        const avatarImage = rightHolder.avatarImage;

        return avatarImage ?
            'https://smartsplit-images.s3.us-east-2.amazonaws.com/' + avatarImage :
            'https://smartsplit-images.s3.us-east-2.amazonaws.com/faceapp.jpg';
    };

    selectedDropdownValues() {
        return this.state.selectedMusicians.map(value => value.uuid);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.selectedDropdownValues !== prevState.selectedDropdownValues) {
            this.props.onChange(this.state.selectedDropdownValues);
        }
    }

    selectedItems() {
        return this.rightHolderOptions().filter(this.isSelectedItem);
    }

    isSelectedItem = item => this.selectedDropdownValues().includes(item.value);

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

    handleChange = (event, { value }) => {
        event.preventDefault();
        this.selectItem(value);
    };

    selectItem(itemValue) {
        let musicians = [... this.state.selectedMusicians];

        if (!musicians.find(musician => musician.uuid === itemValue)) {
            const newMusician = new Musician({'uuid' : itemValue});
            musicians.push(newMusician);
        }

        this.setState({
            selectedMusicians: musicians,
            dropdownValue: null
        });
    }

    unselectItem(event, item) {
        event.preventDefault();
        let musicians = [... this.state.selectedMusicians];

        const selectedMusicians = musicians.filter(musician => musician.uuid !== item.value);

        this.setState({
            selectedMusicians: selectedMusicians,
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
