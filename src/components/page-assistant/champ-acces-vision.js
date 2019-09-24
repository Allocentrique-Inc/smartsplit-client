import React from 'react';
import OptionAcces from "./option-acces";
import DownloadLockIcon from "../../assets/svg/icons/download-lock.svg";
import LockFullIcon from "../../assets/svg/icons/lock-full.svg";
import EyeIcon from "../../assets/svg/icons/eye.svg";
import TitreChamp from "./titre-champ";
import { Dropdown } from "semantic-ui-react";

export default class ChampAccesVision extends React.Component {
    accessOptions = [
        {
            key: 'public',
            value: 'public',
            text: 'Public - Rendre l’information visible de tous',
            'icon-image': EyeIcon,
            content: (
                <OptionAcces
                    icon={ EyeIcon }
                    title={ 'Public - Rendre l’information visible de tous' }
                    description={ 'Tous les utilisateurs pourront avoir accès à cette information.' }
                />
            )
        },

        {
            key: 'on-invite',
            value: 'on-invite',
            text: 'Sur invitation - Téléchargeable par certains',
            'icon-image': DownloadLockIcon,
            content: (
                <OptionAcces
                    icon={ DownloadLockIcon }
                    title={ 'Sur invitation - Téléchargeable par certains' }
                    description={ 'Les utilisateurs disposant du lien de partage unique pourront télécharger le fichier original. Pratique pour les journalistes et les professionnels !' }
                />
            )
        },

        {
            key: 'private',
            value: 'private',
            text: 'Privé - Empêcher le téléchargement',
            'icon-image': LockFullIcon,
            content: (
                <OptionAcces
                    icon={ LockFullIcon }
                    title={ 'Privé - Empêcher le téléchargement' }
                    description={ 'Personne ne pourra télécharger l’image originale, sauf vous.' }
                />
            )
        }
    ];

    constructor(props) {
        super(props);

        this.state = {
            value: this.props.value || this.accessOptions[0].value
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.value !== prevState.value && this.props.onChange) {
            this.props.onChange(this.state.value);
        }
    }

    trigger() {
        const selectedOption = this.accessOptions.find(option => option.value === this.state.value);
        const iconSrc = selectedOption['icon-image'];
        const iconText = selectedOption.text;

        return (<><img src={ iconSrc } alt={ iconText }/> { iconText }</>);
    }

    handleChange = value => {
        this.setState({ value: value });
    }

    render() {
        return (
            <div className="champ">
                <label>
                    <TitreChamp
                        label={ 'Accès' }
                    />

                    <Dropdown
                        trigger={ this.trigger() }
                        fluid
                        selection
                        options={ this.accessOptions }
                        onChange={ (event, { value }) => this.handleChange(value) }
                    />
                </label>
            </div>
        );
    }
}
