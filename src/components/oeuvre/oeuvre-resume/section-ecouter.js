import React from 'react';
import appleIcon from '../../../assets/svg/icons/apple-green.svg';
import youtubeIcon from '../../../assets/svg/icons/youtube-green.svg';
import amazonIcon from '../../../assets/svg/icons/amazonmusic-green.svg';
import googleIcon from '../../../assets/svg/icons/googleplaymusic-green.svg';
import soundcloudIcon from '../../../assets/svg/icons/soundcloud-green.svg';
import spotifyIcon from '../../../assets/svg/icons/spotify-green.svg';
import TitreModifiable from "./titre-modifiable";

export default class SectionEcouter extends React.Component {
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
            <a key={`${link.label}-${link.url}`} href={ link.url }>
                <img className={'listen-icon'} src={ link.icon } alt={ link.label }/>
            </a>
        );
    }

    render() {
        return (
            <>
                <TitreModifiable
                    href={'#'}
                >
                    <h4 className={ 'corps-title-2' }>Écouter</h4>
                </TitreModifiable>

                <div className={ 'listen-icons' }>
                    { this.links.map(link => this.renderLink(link)) }
                </div>
            </>
        );
    }
}
