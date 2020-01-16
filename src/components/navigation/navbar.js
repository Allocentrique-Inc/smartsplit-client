import React from 'react';
import '../../assets/scss/page-assistant/bouton.scss';
import '../../assets/scss/oeuvre-resume/navbar.scss';
import placeholder from '../../assets/images/placeholder.png';
import { Translation } from "react-i18next";
import arrowLeftIcon from '../../assets/svg/icons/arrow-left.svg';
import MenuProfil from './menu-profil';
import ModalePartage from "../modales/modale-partage";
import Utilitaires from '../../utils/utilitaires'

export class Navbar extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            partage: false,
            resume: props.resume,
            proposition: props.proposition,
            media: props.media,
            acces: props.acces,
            membreEquipe: props.membreEquipe,
            menuProfil: props.menuProfil
        }
        this.utils = new Utilitaires(1) // Contexte WEB
    }

    render() {                

        let imageSrc = placeholder

        if(this.props.media.files && this.props.media.files.cover && this.props.media.files.cover.files && this.props.media.files.cover.files.length > 0) {
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
                                            &nbsp;·&nbsp;{!this.state.proposition && t('flot.split.documente-ton-oeuvre.etape.documentation')}{this.state.proposition && t('flot.split.documente-ton-oeuvre.etape.partage-titre')}
                                        </div>
                                    </div>

                                    <div className={ 'right' }>
                                        {this.state.membreEquipe && (
                                            <div onClick={()=>{this.setState({partage: true})}} className={`ui button medium ${this.props.pochette ? "pochette" : ""}`}>
                                                {t('entete.partage')}
                                            </div>
                                        )}
                                        {this.state.resume && (
                                            <div onClick={()=>this.utils.naviguerVersSommaire(this.state.media.mediaId) } className={`ui button medium ${this.props.pochette ? "pochette" : ""}`}>
                                                {t('entete.sommaire')}
                                            </div>
                                        )}                               
                                        {
                                            this.props.profil && this.state.menuProfil && (
                                                <MenuProfil   
                                                    pochette={this.props.pochette}               
                                                    user={this.props.profil}
                                                />
                                            )
                                        }
                                    </div>

                                </div>
                            </div>
                            {this.state.media && 
                                <ModalePartage
                                    open={this.state.partage}
                                    onClose={() => this.setState({ partage: false })}
                                    pochette={this.props.pochette}
                                    media={this.state.media}
                                />
                            }                            
                        </div>                        
                }
            </Translation>
        );
    }
}


