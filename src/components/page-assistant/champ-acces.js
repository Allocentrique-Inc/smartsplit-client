import React from 'react';
import { Dropdown, Header } from "semantic-ui-react";
import DownloadCloudIcon from '../../assets/svg/icons/download-cloud.svg';
import DownloadLockIcon from '../../assets/svg/icons/download-lock.svg';
import LockFullIcon from '../../assets/svg/icons/lock-full.svg';
import TitreChamp from "./titre-champ";

export default class ChampAcces extends React.Component {
    accessOptions = [
        {
            key: 'public',
            value: 'public',
            text: 'Public',
            'icon-image': DownloadCloudIcon,
            content: (
                <div className={ 'access-option-content' }>
                    <div className={ 'title' }>
                        <img src={ DownloadCloudIcon }/>
                        Public – Téléchargeable par tous
                    </div>

                    <div className={ 'description' }>
                        Tous les utilisateurs pourront télécharger le fichier original.
                    </div>
                </div>

            )
        },
        {
            key: 'on-invite',
            value:
                'on-invite',
            text:
                'Sur invitation',
            'icon-image':
            DownloadLockIcon,
            content:
                (
                    <Header
                        icon='mobile'
                        content='Sur invitation - Téléchargeable par certains'
                        subheader='Les utilisateurs disposant du lien de partage unique pourront télécharger le fichier original. Pratique pour les journalistes et les professionnels !'
                    />
                )
        }
        ,
        {
            key: 'private',
            value:
                'private',
            text:
                'Privé',
            'icon-image':
            LockFullIcon,
            content:
                (
                    <Header
                        icon='mobile'
                        content='Privé - Empêcher le téléchargement'
                        subheader='Personne ne pourra télécharger l’image originale, sauf vous.'
                    />
                )
        }
    ]
    ;

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
