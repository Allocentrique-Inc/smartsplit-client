import React, { Component } from 'react';
import '../../assets/scss/navbar.scss';
import placeholder from '../../assets/images/placeholder.png';

export class Navbar extends Component {
    render() {
        return (
            <div className={ 'Navbar ' + (this.props.pochette ? 'pochette' : '') }>
                <div className="left">
                    <div className="song-image">
                        <img src={ placeholder }/>
                    </div>

                    <div className="song-title">
                        { this.props.songTitle }
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


