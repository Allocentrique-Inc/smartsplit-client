import React from 'react';
import downloadLockIcon from '../../../assets/svg/icons/download-lock.svg';
import downloadCloudIcon from '../../../assets/svg/icons/download-cloud.svg';
import lockIcon from '../../../assets/svg/icons/lock-full.svg';
import TitreModifiable from "./titre-modifiable";

export default class SectionTelechargements extends React.Component {   

    renderDownload(download) {
        return (
            <div key={`download-${download.label}`} className={ 'download-section' }>
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

        let  downloads = []

        if(this.props.media.files) {
            if(this.props.media.files.audio) {
                downloads.push({
                    icon: downloadLockIcon,
                    label: 'Visuel de l\'œuvre',
                    urls: ""
                })
            }
            if(this.props.media.files.cover) {
                downloads.push({
                    icon: downloadCloudIcon,
                    label: 'Fichier audio',
                    urls: ""
                })
            }
            if(this.props.media.files.midi) {
                downloads.push({
                    icon: downloadCloudIcon,
                    label: 'Fichier MIDI',
                    urls: ""
                })
            }
            if(this.props.media.files.score) {
                downloads.push({
                    icon: downloadCloudIcon,
                    label: 'Partition/Tablature',
                    urls: ""
                })
            }
        }        

        return (
            <>
                <TitreModifiable
                    href={'#'}
                >
                    <h4 className={ 'corps-title-2' }>Téléchargements</h4>
                </TitreModifiable>

                { downloads && downloads.map(download => this.renderDownload(download)) }
            </>
        );
    }
}
