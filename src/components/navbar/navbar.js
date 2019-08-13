import React from 'react';
import '../../assets/scss/navbar.scss';
import placeholder from '../../assets/images/placeholder.png';

export class Navbar extends React.Component {
    render() {
        return (
            <div className="Navbar">
                <div className="left">
                    <div className="song-image">
                        <img src={ placeholder }/>
                    </div>

                    <div className="songName">
                        [Nom de chanson]
                    </div>

                    <div className="documentation-label">
                        Documentation
                    </div>
                </div>

                <div className="right">
                    <div className="save-and-quit-label">
                        <a href="#">
                            Enregistrer et quitter
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}


