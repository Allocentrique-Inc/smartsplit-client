import React, { Component } from 'react';
import '../../assets/scss/navbar.scss';
import placeholder from '../../assets/images/placeholder.png';
import { Trackbar } from "./trackbar";
import { Translation } from "react-i18next";
import MenuProfil from '../entete/menu-profil';

export class Navbar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            profil: props.profil
        }
    }

    render() {
        return (
            <Translation>
                {
                    (t, i18n) =>
                        <div className="fixed-top">
                            <div className={ 'smartsplit-navbar ' + (this.props.pochette ? 'pochette' : '') }>
                                <div className="left">
                                    <div className="song-image">
                                        <img alt="oeuvre" src={ placeholder }/>
                                    </div>

                                    <div className="song-title">
                                        { this.props.songTitle }
                                    </div>

                                    <div className="documentation-label">
                                        Documentation
                                    </div>
                                </div>

                                <div className="right">
                                    {this.state.profil && <MenuProfil user={this.state.profil} />}
                                    <div className="save-and-quit-label">
                                        <a href="#">
                                            { t('flot.etape.enregistrerEtQuitter') }
                                        </a>
                                    </div>                                    
                                </div>
                                
                            </div>

                            <Trackbar
                                percentage={ this.props.progressPercentage }
                                pochette={ this.props.pochette }
                            />
                        </div>
                }
            </Translation>
        );
    }
}


