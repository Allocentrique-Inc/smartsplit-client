import React from "react";
import OptionAcces from "./option-acces";
import DownloadLockIcon from "../../assets/svg/icons/download-lock.svg";
import LockFullIcon from "../../assets/svg/icons/lock-full.svg";
import EyeIcon from "../../assets/svg/icons/eye.svg";
import TitreChamp from "./titre-champ";
import { Dropdown } from "semantic-ui-react";
import { Translation } from "react-i18next";

class ChampAccesVision extends React.Component {  

  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value || this.accessOptions[0].value
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.value !== prevState.value && this.props.onChange) {
      this.props.onChange(this.state.value);
    }
  }

  trigger() {
    const selectedOption = this.accessOptions.find(
      option => option.value === this.state.value
    );
    const iconSrc = selectedOption["icon-image"];
    const iconText = selectedOption.text;

    return (
      <>
        <img src={iconSrc} alt={iconText} /> {iconText}
      </>
    );
  }

  handleChange = value => {
    this.setState({ value: value });
  };

  accessOptions(t) {
    return [
      {
        key: "public",
        value: "public",
        text: t("flot.split.documente-ton-oeuvre.documenter.prive"),
        "icon-image": EyeIcon,
        content: (
          <OptionAcces
            icon={EyeIcon}
            title={t(
              "flot.split.documente-ton-oeuvre.documenter.public"
            )}
            description={t(
              "flot.split.documente-ton-oeuvre.documenter.prive"
            )}
          />
        )
      },
      {
        key: "on-invite",
        value: "on-invite",
        text: t("flot.split.documente-ton-oeuvre.documenter.invite"),
        "icon-image": DownloadLockIcon,
        content: (
          <OptionAcces
            icon={DownloadLockIcon}
            title={t(
              "flot.split.documente-ton-oeuvre.documenter.invite"
            )}
            description={t(
              "flot.split.documente-ton-oeuvre.documenter.invite-description"
            )}
          />
        )
      },
      {
        key: "private",
        value: "private",
        text: t("flot.split.documente-ton-oeuvre.documenter.invite"),
        "icon-image": LockFullIcon,
        content: (
          <OptionAcces
            icon={LockFullIcon}
            title={t(
              "flot.split.documente-ton-oeuvre.documenter.prive"
            )}
            description={t(
              "flot.split.documente-ton-oeuvre.documenter.prive-description"
            )}
          />
        )
      }
    ];
  }

  render() {
    return (
      <Translation>
        {
          t=>
            <div className="champ">
              <label>
                <TitreChamp
                  label={t(
                    "flot.split.documente-ton-oeuvre.documenter.acces"
                  )}
                />
      
                <Dropdown
                  trigger={this.trigger()}
                  fluid
                  selection
                  options={this.accessOptions(t)}
                  onChange={(event, { value }) => this.handleChange(value)}
                />
              </label>
            </div>
        }
      </Translation>      
    );
  }
}

export default ChampAccesVision;
