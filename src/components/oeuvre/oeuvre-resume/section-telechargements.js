import React from 'react';
import downloadLockIcon from '../../../assets/svg/icons/download-lock.svg';
import downloadCloudIcon from '../../../assets/svg/icons/download-cloud.svg';
import lockIcon from '../../../assets/svg/icons/lock-full.svg';
import TitreModifiable from "./titre-modifiable";

export default class SectionTelechargements extends React.Component {
    downloads = [
        {
            icon: downloadLockIcon,
            label: 'Visuel de l\'œuvre',
            urls: (<><a href={ '#' }>Copier le lien</a></>)
        },
        {
            icon: downloadCloudIcon,
            label: 'Fichier audio',
            urls: (<><a href={ '#' }>Télécharger</a>&nbsp;&middot;&nbsp;<a href={ '#' }>Copier le lien</a></>)
        },
        {
            icon: downloadLockIcon,
            label: 'Partition/Tablature',
            urls: (<><a href={ '#' }>Télécharger</a></>)

        },
        {
            icon: lockIcon,
            label: 'Fichier MIDI',
            urls: (<><a href={ '#' }>Télécharger</a>&nbsp;&middot;&nbsp;<a href={ '#' }>Copier le lien</a></>)
        },
    ];

    renderDownload(download) {
        return (
            <div className={ 'download-section' }>
                <img className={ 'download-icon' } src={ download.icon } alt={ download.label }/>

                <div className={ 'download-texts' }>
                    <div className={ 'download-label' }>
                        { download.label }
                    </div>

                    <div className={ 'download-url' }>
                        { download.urls }
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <>
                <TitreModifiable>
                    <h4 className={ 'corps-title-2' }>Téléchargements</h4>
                </TitreModifiable>

                { this.downloads.map(download => this.renderDownload(download)) }
            </>
        );
    }
}
