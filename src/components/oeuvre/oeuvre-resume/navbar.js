import React from 'react';
import '../../../assets/scss/page-assistant/bouton.scss';
import '../../../assets/scss/oeuvre-resume/navbar.scss';
import placeholder from '../../../assets/images/placeholder.png';
import { Translation } from "react-i18next";
import arrowLeftIcon from '../../../assets/svg/icons/arrow-left.svg';
import MenuProfil from '../../entete/menu-profil';

export class Navbar extends React.Component {
    render() {

        let membreEquipe = false
        if(this.props.profil) {
            if(this.props.profil.username === this.props.media.createur) {
                membreEquipe = true
            } else {
                let _rH = this.props.media.rightHolders
                Object.keys(_rH).forEach(e=>{                    
                    if(_rH[e].id === this.props.profil.username) {
                        membreEquipe = true
                    }
                })
            }
        }        

        let boutonPartager
        if(membreEquipe) {
            boutonPartager = 
                <div className={`ui button medium ${this.props.pochette ? "pochette" : ""}`}>
                    Partager
                </div>
        }

        let imageSrc = placeholder

        if(this.props.media.files && this.props.media.files.cover && this.props.media.files.cover.files.length > 0) {
            this.props.media.files.cover.files.forEach(e=>{
                if(e.access === 'public') {
                imageSrc = `https://smartsplit-artist-storage.s3.us-east-2.amazonaws.com/${this.props.media.mediaId}/cover/${e.file}`
                }
            })
        }

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
                                        <img className={ 'song-image' } src={ imageSrc } alt={ this.props.media.title }/>

                                        <div className={ 'medium-500-style' }>
                                            {this.props.media.title}
                                        </div>

                                        <div className={ 'medium-400-style' }>
                                            &nbsp;·&nbsp;Documentation
                                        </div>
                                    </div>

                                    <div className={ 'right' }>
                                        {boutonPartager}
                                        {
                                            this.props.profil && (
                                                <MenuProfil   
                                                    pochette={this.props.pochette}               
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


