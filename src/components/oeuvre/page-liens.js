import React from 'react';
import Page from '../page-assistant/page';
import { ChampDate } from "../page-assistant/champ-date";
import LinkCircleOrange from '../../assets/svg/icons/link-circle-orange.svg';
import LinkCircleGreen from '../../assets/svg/icons/link-circle-green.svg';
import Colonne from "../page-assistant/colonne";
import Entete from "../page-assistant/entete";
import TitreChamp from "../page-assistant/titre-champ";
import SpotifyIcon from '../../assets/svg/icons/spotify.svg';
import GooglePlayIcon from '../../assets/svg/icons/googleplaymusic.svg';
import AppleIcon from '../../assets/svg/icons/apple.svg';
import AmazonMusicIcon from '../../assets/svg/icons/amazonmusic.svg';
import YoutubeIcon from '../../assets/svg/icons/youtube.svg';
import { Translation } from 'react-i18next'
import ChampStreaming from "../page-assistant/champ-streaming";
import DotIcon from '../../assets/svg/icons/dot.svg';
import SoundCloudIcon from '../../assets/svg/icons/soundcloud.svg';
import DeezerIcon from '../../assets/svg/icons/deezer.svg';
import ChampTexte from "../page-assistant/champ-texte";

export default class PageLiens extends React.Component {

    streamingApps = [
        {
            icon: SpotifyIcon,
            label: 'Spotify'
        },
        {
            icon: GooglePlayIcon,
            label: 'Google Play',
        },
        {
            icon: AppleIcon,
            label: 'Apple Music',
        },
        {
            icon: AmazonMusicIcon,
            label: 'Amazon Music',
        },
        {
            icon: YoutubeIcon,
            label: 'Youtube',
        },
        {
            icon: null,
            label: 'Pandora',
        },
        {
            icon: SoundCloudIcon,
            label: 'SoundCloud',
        },
        {
            icon: DeezerIcon,
            label: 'Deezer',
        }
    ];

    icon() {
        return this.props.pochette ? LinkCircleOrange : LinkCircleGreen;
    }

    renderStreamingFields() {
        return this.streamingApps.map(app => (
            <ChampStreaming
                icon={ app.icon || DotIcon }
                label={ app.label }
                placeholder={ 'Coller un lien...' }
            />)
        );
    }

    render() {
        return (
            <Translation>
                {
                    (t) =>
                        <Page
                            pochette={ this.props.pochette }
                        >
                            <Colonne>
                                <Entete
                                    pochette={ this.props.pochette }
                                    icon={ this.icon() }
                                    label={ 'Liens d\'écoute' }
                                    question={ 'La pièce musicale est-elle déjà diffusée?' }
                                    description={ 'Pour augmenter les chances que ta pièce soit découverte et écoutée, documente ses liens d’écoute et de vente en ligne.' }
                                />

                                <TitreChamp
                                    label={ this.props.values.title + ' sur...' }
                                />

                                { this.renderStreamingFields() }
                            </Colonne>
                        </Page>
                }
            </Translation>
        )
    }
}
