import React from 'react'
import downloadLockIcon from '../../../assets/svg/icons/download-lock.svg'
import downloadCloudIcon from '../../../assets/svg/icons/download-cloud.svg'
import lockFullIcon from '../../../assets/svg/icons/lock-full.svg'
import TitreModifiable from "./titre-modifiable"

export default class SectionParoles extends React.Component {

    iconeParAccess(type) {
        switch(type){
            case "public":
                return downloadCloudIcon
                break;
            case "private":
                return lockFullIcon
                break;
            case "on-invite":
                return downloadLockIcon
                break;
            default:
        }
    }

    render() {
        let paroles = this.props.media.lyrics
        let texte = "Voir les paroles"
        if(paroles) {
            texte = paroles.text
            /* if(paroles.access === "public" && paroles.text.trim()) {
                texte = paroles.text
            } */
        }
        return paroles && (
            <>
                <TitreModifiable
                    edition={this.props.edition} 
                    pageNo={6}
                    mediaId={this.props.media.mediaId}
                >
                    <h4 className={ 'corps-title-2' }>Paroles</h4>
                </TitreModifiable>

                <div className={ 'download-section' }>
                    <img className={ 'download-icon' } src={ this.iconeParAccess(paroles.access) } alt={ 'accès' }/>

                    <div className={ 'download-texts' }>                        
                        <pre>{texte}</pre>
                    </div>
                </div>
            </>
        );
    }
}
