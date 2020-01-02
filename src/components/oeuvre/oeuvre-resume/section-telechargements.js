import React from 'react';
import downloadLockIcon from '../../../assets/svg/icons/download-lock.svg'
import downloadCloudIcon from '../../../assets/svg/icons/download-cloud.svg'
import lockFullIcon from '../../../assets/svg/icons/lock-full.svg'
import TitreModifiable from "./titre-modifiable";

export default class SectionTelechargements extends React.Component {   

    renderDownload(download) {

        let pochette = this.props.pochette ? 'pochette' : 'smartsplit'

        return (
            <div key={`download-${download.label}`} className={ `download-section cliquable` } >
                <img className={ 'download-icon' } src={ download.icon } alt={ download.label } />

                <div className={ 'download-texts' }>
                    <div className={ `download-url ${pochette}` }>
                        <a className={`${pochette}`} target="_blank" rel="noopener noreferrer" href={ download.urls }>{ download.label }</a>
                    </div>
                </div>
            </div>
        );
    }

    iconeParAcces(acces) {
        switch (acces) {
            case "on-invite":
                return downloadLockIcon
                break;
            case "private":
                return lockFullIcon
                break;
            case "public":
                return downloadCloudIcon
                break;
            default:
        }
    }

    render() {

        // Check if current rightHolder is in media.rightHolders array, display the links
        let audio = [], cover = [], midi = [], score = []
        if(this.props.media.files) {
            if(this.props.media.files.audio) {
                this.props.media.files.audio.files.forEach(elem=>{
                    let nomfichierS3 = elem.file
                    audio.push({
                        icon: this.iconeParAcces(elem.access),
                        label: elem.file,
                        urls: `https://smartsplit-artist-storage.s3.us-east-2.amazonaws.com/${this.props.media.mediaId}/audio/${nomfichierS3}`
                    })
                })
            }
            if(this.props.media.files.cover) {
                this.props.media.files.cover.files.forEach(elem=>{
                    let nomfichierS3 = elem.file
                    cover.push({
                        icon: this.iconeParAcces(elem.access),
                        label: elem.file,
                        urls: `https://smartsplit-artist-storage.s3.us-east-2.amazonaws.com/${this.props.media.mediaId}/cover/${nomfichierS3}`
                    })
                })                
            }
            if(this.props.media.files.midi) {
                this.props.media.files.midi.files.forEach(elem=>{
                    let nomfichierS3 = elem.file
                    midi.push({
                        icon: this.iconeParAcces(elem.access),
                        label: elem.file,
                        urls: `https://smartsplit-artist-storage.s3.us-east-2.amazonaws.com/${this.props.media.mediaId}/midi/${nomfichierS3}`
                    })
                })                
            }
            if(this.props.media.files.score) {
                this.props.media.files.score.files.forEach(elem=>{
                    let nomfichierS3 = elem.file
                    score.push({
                        icon: this.iconeParAcces(elem.access),
                        label: elem.file,
                        urls: `https://smartsplit-artist-storage.s3.us-east-2.amazonaws.com/${this.props.media.mediaId}/score/${nomfichierS3}`
                    })
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

                <span className="corps-table" style={{color: "#687A8B", marginBottom: "5px;"}}>Visuels de l'oeuvre</span>
                { cover && cover.map(download => this.renderDownload(download)) }
                <p style={{height: "15px"}}/>
                <span className="corps-table" style={{color: "#687A8B", marginBottom: "5px;"}}>Fichiers audio</span>
                { audio && audio.map(download => this.renderDownload(download)) }                
                <p style={{height: "15px"}}/>
                <span className="corps-table" style={{color: "#687A8B", marginBottom: "5px;"}}>Fichiers MIDI</span>
                { midi && midi.map(download => this.renderDownload(download)) }
                <p style={{height: "15px"}}/>
                <span className="corps-table" style={{color: "#687A8B", marginBottom: "5px;"}}>Partitions/Tablatures</span>
                <p style={{height: "15px"}}/>
                { score && score.map(download => this.renderDownload(download)) }
            </>
        );
    }
}
