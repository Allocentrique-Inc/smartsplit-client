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
            urls: (<><div className="ui medium button">Copier le lien</div></>)
        },
        {
            icon: downloadCloudIcon,
            label: 'Fichier audio',
            urls: (<><div className="ui button medium">Télécharger</div>&nbsp;&middot;&nbsp;<button>Copier le lien</button></>)
        },
        {
            icon: downloadLockIcon,
            label: 'Partition/Tablature',
            urls: (<><div className="ui medium button">Télécharger</div></>)

        },
        {
            icon: lockIcon,
            label: 'Fichier MIDI',
            urls: (<><div className="ui medium button">Télécharger</div>&nbsp;&middot;&nbsp;<div className="ui medium button">Copier le lien</div></>)
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
                <TitreModifiable
                    href={'#'}
                >
                    <h4 className={ 'corps-title-2' }>Téléchargements</h4>
                </TitreModifiable>

                { this.downloads.map(download => this.renderDownload(download)) }
            </>
        );
    }
}
