import React from 'react';

import TitreModifiable from "./titre-modifiable"
import { Translation } from 'react-i18next'
import deezerIconOrange from '../../../assets/svg/icons/deezer-orange.svg'
import appleIconOrange from '../../../assets/svg/icons/apple-orange.svg'
import youtubeIconOrange from '../../../assets/svg/icons/youtube-orange.svg'
import amazonIconOrange from '../../../assets/svg/icons/amazonmusic-orange.svg'
import googleIconOrange from '../../../assets/svg/icons/googleplaymusic-orange.svg'
import soundcloudIconOrange from '../../../assets/svg/icons/soundcloud-orange.svg'
import spotifyIconOrange from '../../../assets/svg/icons/spotify-orange.svg'
import deezerIconVert from '../../../assets/svg/icons/deezer-green.svg'
import appleIconVert from '../../../assets/svg/icons/apple-green.svg'
import youtubeIconVert from '../../../assets/svg/icons/youtube-green.svg'
import amazonIconVert from '../../../assets/svg/icons/amazonmusic-green.svg'
import googleIconVert from '../../../assets/svg/icons/googleplaymusic-green.svg'
import soundcloudIconVert from '../../../assets/svg/icons/soundcloud-green.svg'
import spotifyIconVert from '../../../assets/svg/icons/spotify-green.svg'

let deezerIcon, appleIcon, youtubeIcon, amazonIcon, googleIcon, soundcloudIcon, spotifyIcon

export default class SectionEcouter extends React.Component {

    constructor(props) {
        super(props)

        if(this.props.pochette) {
            deezerIcon = deezerIconOrange
            appleIcon = appleIconOrange
            youtubeIcon = youtubeIconOrange
            amazonIcon = amazonIconOrange
            googleIcon = googleIconOrange
            soundcloudIcon = soundcloudIconOrange
            spotifyIcon = spotifyIconOrange
        } else {
            deezerIcon = deezerIconVert
            appleIcon = appleIconVert
            youtubeIcon = youtubeIconVert
            amazonIcon = amazonIconVert
            googleIcon = googleIconVert
            soundcloudIcon = soundcloudIconVert
            spotifyIcon = spotifyIconVert
        }
        
        this.state={
            liens: this.props.media.streamingServiceLinks ? this.props.media.streamingServiceLinks.map(l=>{
                let name=l.name, icon, url = l.url
                switch(name) {
                    case "Spotify":
                        icon = spotifyIcon
                        break
                    case "Deezer":
                        icon = deezerIcon
                        break
                    case "Google Play":
                        icon = googleIcon
                        break
                    case "Apple Music":
                        icon = appleIcon
                        break
                    case "Amazon Music":
                        icon = amazonIcon
                        break
                    case "Youtube":
                        icon = youtubeIcon
                        break
                    case "Pandora":
                        icon = null
                        break
                    case "SoundCloud":
                        icon = soundcloudIcon
                        break
                    default:

                }
                return {
                    name: name, icon: icon, url: url
                }
            }) : []
        }

    }

    links = [
        {
            icon: appleIcon,
            label: 'Apple Music',
            url: '#'
        },
        {
            icon: youtubeIcon,
            label: 'Youtube',
            url: '#'
        },
        {
            icon: amazonIcon,
            label: 'Amazon',
            url: '#'
        },
        {
            icon: googleIcon,
            label: 'Google Music',
            url: '#'
        },
        {
            icon: soundcloudIcon,
            label: 'Soundcloud',
            url: '#'
        },
        {
            icon: spotifyIcon,
            label: 'Spotify',
            url: '#'
        },
    ];

    renderLink(link) {
        return (
            <a key={`${link.label}-${link.url}`} target="_blank" href={ link.url } rel="noopener noreferrer">
                <img className={'listen-icon'} src={ link.icon } alt={ link.label }/>
            </a>
        );
    }

    render() {
        return (
            <Translation>
                {
                    (t, i18n) =>
                    <>
                        <TitreModifiable
                            edition={this.props.edition} 
                            pageNo={7}
                            mediaId={this.props.media.mediaId}
                        >
                            <h4 className={ 'corps-title-2' }>Écouter</h4>
                        </TitreModifiable>

                        <div className={ 'listen-icons' }>
                            { this.state.liens.map(link => this.renderLink(link)) }
                        </div>
                    </>
                }
                </Translation>
        );
    }
}
