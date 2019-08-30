import React, { Component } from 'react';
import '../../assets/scss/navbar.scss';
import placeholder from '../../assets/images/placeholder.png';
import { Translation } from 'react-i18next';

export class Navbar extends Component {
    render() {
        return (
            <Translation>
                {
                    (t, i18n)=>
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
                                {t('flot.etape.enregistrerEtQuitter')} 
                                </a>
                            </div>
                        </div>
                    </div>
                }
            </Translation>
        );
    }
}


