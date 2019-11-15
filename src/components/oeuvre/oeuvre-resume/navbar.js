import React from 'react';
import '../../../assets/scss/page-assistant/bouton.scss';
import '../../../assets/scss/oeuvre-resume/navbar.scss';
import placeholder from '../../../assets/images/placeholder.png';
import { Translation } from "react-i18next";
import arrowLeftIcon from '../../../assets/svg/icons/arrow-left.svg';
import MenuProfil from '../../entete/menu-profil';

export class Navbar extends React.Component {
    render() {        
        return (
            <Translation>
                {
                    (t, i18n) =>
                        <div className="fixed-top">
                            <div className={ 'oeuvre-resume-navbar ' + (this.props.pochette ? 'pochette' : '') }>
                                <div className={ 'back-button-section' }>
                                    <div className="ui cliquable" onClick={()=>window.location.href="/accueil"}>
                                        <img src={ arrowLeftIcon } alt={ 'Retour' }/>
                                    </div>
                                </div>

                                <div className={ 'ui container' }>
                                    <div className={ 'left' }>
                                        <img className={ 'song-image' } src={ placeholder } alt={ this.props.media.title }/>

                                        <div className={ 'medium-500-style' }>
                                            {this.props.media.title}
                                        </div>

                                        <div className={ 'medium-400-style' }>
                                            &nbsp;·&nbsp;Documentation
                                        </div>
                                    </div>

                                    <div className={ 'right' }>
                                        {
                                            this.props.profil && (
                                                <MenuProfil                  
                                                    user={this.props.profil}
                                                />
                                            )
                                        }                                        
                                        {/* <Button basic>
                                            Aperçu
                                        </Button>

                                        <Button>
                                            Partager
                                        </Button> */}
                                    </div>

                                </div>
                            </div>
                        </div>
                }
            </Translation>
        );
    }
}


