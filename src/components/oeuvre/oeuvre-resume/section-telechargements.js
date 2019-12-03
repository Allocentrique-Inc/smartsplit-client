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

                    <div className={ 'download-url' }>
                        { download.urls }
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
                downloads.push({
                    icon: downloadLockIcon,
                    label: 'Visuel de l\'œuvre',
                    urls: `https://s3.console.aws.amazon.com/s3/buckets/smartsplit-artist-storage/${this.props.media.mediaId}/audio/?region=us-east-2&tab=overview` 
                })
            }
            if(this.props.media.files.cover) {
                downloads.push({
                    icon: downloadCloudIcon,
                    label: 'Fichier audio',
                    urls: `https://s3.console.aws.amazon.com/s3/buckets/smartsplit-artist-storage/${this.props.media.mediaId}/cover/?region=us-east-2&tab=overview` 
                })
            }
            if(this.props.media.files.midi) {
                downloads.push({
                    icon: downloadCloudIcon,
                    label: 'Fichier MIDI',
                    urls: `https://s3.console.aws.amazon.com/s3/buckets/smartsplit-artist-storage/${this.props.media.mediaId}/midi/?region=us-east-2&tab=overview` 
                })
            }
            if(this.props.media.files.score) {
                downloads.push({
                    icon: downloadCloudIcon,
                    label: 'Partition/Tablature',
                    urls: `https://s3.console.aws.amazon.com/s3/buckets/smartsplit-artist-storage/${this.props.media.mediaId}/score/?region=us-east-2&tab=overview` 
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
