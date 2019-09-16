import React from 'react';
import placeholder from '../../../assets/images/placeholder.png';
import '../../../assets/scss/oeuvre-resume/entete.scss';

export default class Entete extends React.Component {
    render() {
        return <header className="entete">
            <div className={'ui container flex'}>
                <img className={ 'song-image' }
                     src={ placeholder }
                     alt={ 'Love you baby' }
                />

                <div className={'song-info'}>
                    <h1 className={'h1-style'}>
                        Love You Baby (Remix)
                    </h1>

                    <span className={'tag'}>Pièce originale</span>

                    Par <a href={'#'}>Band or ArtistName</a> feat. <a href={'#'}>ArtistName</a>

                    <div className={'section-divider'}></div>
                </div>
            </div>


        </header>
    }
}
