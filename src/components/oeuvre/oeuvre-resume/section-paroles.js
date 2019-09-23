import React from 'react';
import downloadLock from '../../../assets/svg/icons/download-lock.svg';
import downloadCloud from '../../../assets/svg/icons/download-cloud.svg';
import TitreModifiable from "./titre-modifiable";

export default class SectionParoles extends React.Component {
    render() {
        return (
            <>
                <TitreModifiable
                    href={'#'}
                >
                    <h4 className={ 'corps-title-2' }>Paroles</h4>
                </TitreModifiable>

                <div className={ 'download-section' }>
                    <img className={ 'download-icon' } src={ downloadLock } alt={ 'Verouillé' }/>

                    <div className={ 'download-texts' }>
                        <a href={'#'}>Voir les paroles</a>
                    </div>
                </div>
            </>
        );
    }
}
