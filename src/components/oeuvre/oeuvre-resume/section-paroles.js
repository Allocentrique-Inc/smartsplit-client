import React from 'react';
import publicIcon from '../../../assets/svg/icons/eye.svg';
import TitreModifiable from "./titre-modifiable";

export default class SectionParoles extends React.Component {
    render() {
        let paroles = this.props.media.lyrics
        let texte = "Voir les paroles"
        if(paroles) {
            if(paroles.access === "public" && paroles.text.trim()) {
                texte = paroles.text
            }
        }        
        return (
            <>
                <TitreModifiable
                    pageNo={6}
                    mediaId={this.props.media.mediaId}
                >
                    <h4 className={ 'corps-title-2' }>Paroles</h4>
                </TitreModifiable>

                <div className={ 'download-section' }>
                    <img className={ 'download-icon' } src={ publicIcon } alt={ 'Verouillé' }/>

                    <div className={ 'download-texts' }>                        
                        <pre>{texte}</pre>
                    </div>
                </div>
            </>
        );
    }
}
