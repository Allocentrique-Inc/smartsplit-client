import React from "react"
import { Dropdown } from "semantic-ui-react"
import TitreChamp from "./titre-champ"
import "../../assets/scss/page-assistant/champ-acces.scss"
import DownloadCloudIcon from "../../assets/svg/icons/download-cloud.svg"
import OptionAcces from "./option-acces"
import DownloadLockIcon from "../../assets/svg/icons/download-lock.svg"
import LockFullIcon from "../../assets/svg/icons/lock-full.svg"
import { Translation } from "react-i18next"
import "../formulaires.css";

export default class ChampAccesTelechargement extends React.Component {

  options = [
    {
      key: "public",
      value: "public",
      text: "Public",
      "icon-image": DownloadCloudIcon,
      content: (
        <OptionAcces
          icon={DownloadCloudIcon}
          title={"Public – Téléchargeable par tous"}
          description={
            "Tous les utilisateurs pourront télécharger le fichier original."
          }
        />
      )
    },

    {
      key: "on-invite",
      value: "on-invite",
      text: "Sur invitation",
      "icon-image": DownloadLockIcon,
      content: (
        <OptionAcces
          icon={DownloadLockIcon}
          title={"Sur invitation - Téléchargeable par certains"}
          description={
            "Les utilisateurs disposant du lien de partage unique pourront télécharger le fichier original. Pratique pour les journalistes et les professionnels !"
          }
        />
      )
    },

    {
      key: "private",
      value: "private",
      text: "Privé",
      "icon-image": LockFullIcon,
      content: (
        <OptionAcces
          icon={LockFullIcon}
          title={"Privé - Empêcher le téléchargement"}
          description={
            "Personne ne pourra télécharger l’image originale, sauf vous."
          }
        />
      )
    }
  ];
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value || this.options[0].value,
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.value !== prevState.value && this.props.onChange) {
      this.props.onChange(this.state.value);
    }
  }

  trigger() {
    const selectedOption = this.options.find(
      option => option.value === this.state.value
    );
    const iconSrc = selectedOption["icon-image"];
    const iconText = selectedOption.text;

    return <img src={iconSrc} alt={iconText} />;
  }

  handleChange = value => {
    this.setState({ value: value });
  };

  render() {
    return (
      <Translation>
        {t => (
          <div className="champ champ-acces">
            <label>
              <TitreChamp
                label={t("flot.split.documente-ton-oeuvre.documenter.acces")}
              />
              <Dropdown
                style={{ width: "85px" }}
                trigger={this.trigger()}
                fluid
                selection
                direction="right"
                options={this.options}
                onChange={(event, { value }) => this.handleChange(value)}
              />
            </label>
          </div>

        )}
      </Translation>
    );
  }
}
