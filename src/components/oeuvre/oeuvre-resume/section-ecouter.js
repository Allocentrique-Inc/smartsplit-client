import React from 'react';
import deezerIcon from '../../../assets/svg/icons/deezer.svg';
import appleIcon from '../../../assets/svg/icons/apple-green.svg';
import youtubeIcon from '../../../assets/svg/icons/youtube-green.svg';
import amazonIcon from '../../../assets/svg/icons/amazonmusic-green.svg';
import googleIcon from '../../../assets/svg/icons/googleplaymusic-green.svg';
import soundcloudIcon from '../../../assets/svg/icons/soundcloud-green.svg';
import spotifyIcon from '../../../assets/svg/icons/spotify-green.svg';
import TitreModifiable from "./titre-modifiable";
import { Translation } from 'react-i18next';

export default class SectionEcouter extends React.Component {

    constructor(props) {
        super(props)
        
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
            <a key={`${link.label}-${link.url}`} target="_blank" href={ link.url }>
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
                            href={'#'}
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
