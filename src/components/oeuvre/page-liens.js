import React from "react";
import Page from "../page-assistant/page";
import LinkCircleOrange from "../../assets/svg/icons/link-circle-orange.svg";
import LinkCircleGreen from "../../assets/svg/icons/link-circle-green.svg";
import Colonne from "../page-assistant/colonne";
import Entete from "../page-assistant/entete";
import TitreChamp from "../page-assistant/titre-champ";
import SpotifyIcon from "../../assets/svg/icons/spotify.svg";
import GooglePlayIcon from "../../assets/svg/icons/googleplaymusic.svg";
import AppleIcon from "../../assets/svg/icons/apple.svg";
import AmazonMusicIcon from "../../assets/svg/icons/amazonmusic.svg";
import YoutubeIcon from "../../assets/svg/icons/youtube.svg";
import { withTranslation } from "react-i18next";
import ChampStreaming from "../page-assistant/champ-streaming";
import DotIcon from "../../assets/svg/icons/dot.svg";
import SoundCloudIcon from "../../assets/svg/icons/soundcloud.svg";
import DeezerIcon from "../../assets/svg/icons/deezer.svg";
import { Dropdown } from "semantic-ui-react";
import plusCircleOrange from "../../assets/svg/icons/plus-circle-orange.svg";
import plusCircleGreen from "../../assets/svg/icons/plus-circle-green.svg";
import "../../assets/scss/page-assistant/champ.scss";
import SauvegardeAutomatiqueMedia from "./SauvegardeAutomatique";

class PageLiens extends React.Component {
  defaultStreamingApps = [
    {
      icon: SpotifyIcon,
      label: "Spotify"
    },
    {
      icon: GooglePlayIcon,
      label: "Google Play"
    },
    {
      icon: AppleIcon,
      label: "Apple Music"
    },
    {
      icon: AmazonMusicIcon,
      label: "Amazon Music"
    },
    {
      icon: YoutubeIcon,
      label: "Youtube"
    },
    {
      icon: null,
      label: "Pandora"
    },
    {
      icon: SoundCloudIcon,
      label: "SoundCloud"
    },
    {
      icon: DeezerIcon,
      label: "Deezer"
    }
  ];

  constructor(props) {
    super(props);

    this.state = {
      dropdownValue: null,
      searchQuery: null,
      streamingApps: this.defaultStreamingApps
    };
  }

  icon() {
    return this.props.pochette ? LinkCircleOrange : LinkCircleGreen;
  }

  plusCircle() {
    return this.props.pochette ? plusCircleOrange : plusCircleGreen;
  }

  additionLabelClasses() {
    const pochetteClass = this.props.pochette ? " pochette" : "";
    return "addition-label" + pochetteClass;
  }

  createLabel() {
    return this.props.createLabel || "Ajouter comme plateforme :";
  }

  plusCircleLabel(labelString) {
    return (
      <span className={this.additionLabelClasses()}>
        <img alt="" src={this.plusCircle()} /> {labelString}
      </span>
    );
  }

  triggerLabel() {
    return this.state.searchQuery
      ? ""
      : this.plusCircleLabel("Ajouter une plateforme...");
  }

  renderStreamingFields() {
    return this.state.streamingApps.map(app => {
      const service = this.props.values.streamingServiceLinks.find(
        service => service.name === app.label
      );
      const serviceUrl = service ? service.url : "";

      return (
        <ChampStreaming
          key={app.label}
          icon={app.icon || DotIcon}
          label={app.label}
          placeholder={"Coller un lien..."}
          value={serviceUrl}
          onChange={url => this.handleServiceChange(app.label, url)}
        />
      );
    });
  }

  handleServiceChange(name, url) {
    const services = [...this.props.values.streamingServiceLinks];
    const serviceIndex = services.findIndex(service => service.name === name);
    const newService = {
      name: name,
      url: url
    };

    serviceIndex === -1
      ? services.push(newService)
      : (services[serviceIndex] = newService);

    const servicesToPush = services.filter(service => service.url);

    this.props.setFieldValue("streamingServiceLinks", servicesToPush);
  }

  unselectedAppOptions() {
    return [];
  }

  handleChange = (event, { value }) => {
    this.addStreamingApp(value);
  };

  handleSearchChange = (event, { searchQuery }) => {
    this.setState({ searchQuery: searchQuery });
  };

  addStreamingApp(value) {
    const streamingApps = [...this.state.streamingApps];

    const newStreamingApps = streamingApps.find(app => app.label === value)
      ? streamingApps
      : streamingApps.concat([
        {
          icon: null,
          label: value
        }
      ]);

    this.setState({
      dropdownValue: null,
      streamingApps: newStreamingApps
    });
  }

  render() {
    let t = this.props.t
    return (
      <Page pochette={this.props.pochette}>
        <SauvegardeAutomatiqueMedia etat={true} values={this.props.values} interval={10000} />
        <Colonne>
          <Entete
            pochette={this.props.pochette}
            icon={this.icon()}
            label={t(
              "flot.split.documente-ton-oeuvre.documenter.entete.lien"
            )}
            question={t(
              "flot.split.documente-ton-oeuvre.documenter.titre7"
            )}
            description={t(
              "flot.split.documente-ton-oeuvre.documenter.titre7-description"
            )}
          />
          <TitreChamp
            label={
              <>{this.props.values.title}<br />
                {t("flot.split.documente-ton-oeuvre.documenter.entete.lien")}</>
            }
          />

          {this.renderStreamingFields()}

          <Dropdown
            className={"with-trigger-icon"}
            trigger={this.triggerLabel()}
            fluid
            search
            selection
            selectOnBlur={false}
            selectOnNavigation={false}
            allowAdditions
            additionLabel={this.plusCircleLabel(
              t("flot.split.documente-ton-oeuvre.documenter.entete.lien")
            )}
            value={this.state.dropdownValue}
            options={this.unselectedAppOptions()}
            onChange={this.handleChange}
            onSearchChange={this.handleSearchChange}
          />
        </Colonne>
      </Page>
    )
  }
}

export default withTranslation()(PageLiens)