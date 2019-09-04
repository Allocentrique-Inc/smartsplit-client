import React from 'react';
import DownloadCloudIcon from "../../assets/svg/icons/download-cloud.svg";
import OptionAcces from "./option-acces";
import DownloadLockIcon from "../../assets/svg/icons/download-lock.svg";
import LockFullIcon from "../../assets/svg/icons/lock-full.svg";
import ChampAcces from "./champ-acces";

export default class ChampAccesTelechargement extends React.Component {
    accessOptions = [
        {
            key: 'public',
            value: 'public',
            text: 'Public',
            'icon-image': DownloadCloudIcon,
            content: (
                <OptionAcces
                    icon={ DownloadCloudIcon }
                    title={ 'Public – Téléchargeable par tous' }
                    description={ 'Tous les utilisateurs pourront télécharger le fichier original.' }
                />
            )
        },

        {
            key: 'on-invite',
            value: 'on-invite',
            text: 'Sur invitation',
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
            text: 'Privé',
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

    render() {
        return (
            <ChampAcces
                options={ this.accessOptions }
                value={ this.props.value }
            />
        )
    }
}
