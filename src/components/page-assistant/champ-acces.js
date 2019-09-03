import React from 'react';
import { Dropdown, Header } from "semantic-ui-react";
import EyeIcon from '../../assets/svg/icons/eye.svg';
import TitreChamp from "./titre-champ";

export default class ChampAcces extends React.Component {
    accessOptions = [
        {
            key: 'public',
            value: 'public',
            text: 'Public',
            'icon-image': EyeIcon,
            content: (
                <Header icon='mobile' content='Public' subheader='The smallest size'/>
            )

        },
        {
            key: 'on-invite',
            value: 'on-invite',
            text: 'Sur invitation',
            'icon-image': EyeIcon,
            content: (
                <Header icon='mobile' content='Sur invitation' subheader='The smallest size'/>
            )
        },
        {
            key: 'private',
            value: 'private',
            text: 'Privé',
            'icon-image': EyeIcon,
            content: (
                <Header icon='mobile' content='Privé' subheader='The smallest size'/>
            )
        }
    ];

    constructor(props) {
        super(props);

        this.state = {
            value: this.accessOptions[0].value
        };
    }

    trigger() {
        const selectedOption = this.accessOptions.find(option => option.value === this.state.value);
        const iconSrc = selectedOption['icon-image'];
        const iconText = selectedOption.text;

        return (<img src={ iconSrc } alt={ iconText }/>);
    }

    handleChange = value => {
        this.setState({ value: value });
    }

    render() {
        return (
            <div className="champ champ-acces">
                <label>
                    <TitreChamp
                        label={ 'Accès' }
                    />

                    <Dropdown
                        trigger={ this.trigger() }
                        fluid
                        selection
                        direction='right'
                        options={ this.accessOptions }
                        onChange={ (event, { value }) => this.handleChange(value) }
                    />
                </label>
            </div>
        );
    }
}
