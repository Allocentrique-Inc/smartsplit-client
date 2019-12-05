import React from 'react';
import downloadLockIcon from '../../../assets/svg/icons/download-lock.svg';
import downloadCloudIcon from '../../../assets/svg/icons/download-cloud.svg';
import TitreModifiable from "./titre-modifiable";

export default class SectionTelechargements extends React.Component {   

    renderDownload(download) {

        let pochette = this.props.pochette ? 'pochette' : 'smartsplit'

        return (
            <div key={`download-${download.label}`} className={ `download-section cliquable` } >
                <img className={ 'download-icon' } src={ download.icon } alt={ download.label } />

                <div className={ 'download-texts' }>
                    <div className={ `download-label ${pochette}` }>
                        { download.label }
                    </div>

                    <div className={ `download-url` }>
                        <a className={`${pochette}`} target="_blank" href={ download.urls }>Télécharger</a>
                    </div>
                </div>
            </div>
        );
    }

    render() {

        // Check if current rightHolder is in media.rightHolders array, display the links
        let  downloads = []
        console.log(this.props.media.files)

        if(this.props.media.files) {
            if(this.props.media.files.audio) {
                let nomfichierS3 = this.props.media.files.audio.file
                downloads.push({
                    icon: downloadLockIcon,
                    label: 'Fichier audio',
                    urls: `https://smartsplit-artist-storage.s3.us-east-2.amazonaws.com/${this.props.media.mediaId}/audio/${nomfichierS3}`                     
                })
            }
            if(this.props.media.files.cover) {
                let nomfichierS3 = this.props.media.files.cover.file
                downloads.push({
                    icon: downloadCloudIcon,
                    label: 'Visuel de l\'œuvre',
                    urls: `https://smartsplit-artist-storage.s3.us-east-2.amazonaws.com/${this.props.media.mediaId}/cover/${nomfichierS3}` 
                })
            }
            if(this.props.media.files.midi) {
                let nomfichierS3 = this.props.media.files.midi.file
                downloads.push({
                    icon: downloadCloudIcon,
                    label: 'Fichier MIDI',
                    urls: `https://smartsplit-artist-storage.s3.us-east-2.amazonaws.com/${this.props.media.mediaId}/midi/${nomfichierS3}` 
                })
            }
            if(this.props.media.files.score) {
                let nomfichierS3 = this.props.media.files.score.file
                downloads.push({
                    icon: downloadCloudIcon,
                    label: 'Partition/Tablature',
                    urls: `https://smartsplit-artist-storage.s3.us-east-2.amazonaws.com/${this.props.media.mediaId}/score/${nomfichierS3}`
                })
            }
        }        

        return (
            <>
                <TitreModifiable
                    edition={this.props.edition} 
                    pageNo={4}
                    mediaId={this.props.media.mediaId}
                >
                    <h4 className={ 'corps-title-2' }>Téléchargements</h4>
                </TitreModifiable>

                { downloads && downloads.map(download => this.renderDownload(download)) }
            </>
        );
    }
}
