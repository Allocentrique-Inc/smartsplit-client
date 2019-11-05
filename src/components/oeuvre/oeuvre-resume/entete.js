import React from "react";
import placeholder from "../../../assets/images/placeholder.png";
import "../../../assets/scss/oeuvre-resume/entete.scss";
import avatar1 from "../../../assets/images/compact-cassette.png";
import avatar2 from "../../../assets/images/elliot.jpg";
import avatar3 from "../../../assets/images/steve.jpg";
import avatar4 from "../../../assets/images/stevie.jpg";
import avatar5 from "../../../assets/images/positive.png";
import plusIcon from "../../../assets/svg/icons/plus-white.svg";
import editIcon from "../../../assets/svg/icons/edit.svg";
import { Translation } from "react-i18next";
import moment from "moment";

export default class Entete extends React.Component {
  
  avatars = [
    avatar1,
    avatar2,
    avatar3,
    avatar4,
    avatar5,
    "dummy",
    "dummy",
    "dummy"
  ];

  renderAvatars() {
    const maxDisplayedAvatars = 5;
    const displayedAvatars = Math.min(maxDisplayedAvatars, this.avatars.length);
    const undisplayedAvatars = this.avatars.length - displayedAvatars;
    const moreLabel = undisplayedAvatars ? (
      <div key={`more-tag-avatar`} className={"more-tag"}>+{undisplayedAvatars}</div>
    ) : (
      <></>
    );

    return this.avatars
      .slice(0, maxDisplayedAvatars)
      .map((avatar, index) => {
        const zIndex = displayedAvatars + 2 - index;
        return (
          <div key={`avatar_${index}`} className={"avatar"} style={{ zIndex }}>
            <img src={avatar} alt="avatar" />
          </div>
        );
      })
      .concat([moreLabel])
      .concat([
        <div key="plus-bouton-avatar">
          <div className={"plus-button"}>
            <img alt="" src={plusIcon} />
          </div>
        </div>
      ]);
  }

  render() {
    return (
      <Translation>
        {(t, i18n) => (
          <header className="entete">
            <div className={"ui container flex"}>
              <img
                className={"song-image"}
                src={placeholder}
                alt={this.props.media.title}
              />

              <div className={"song-info"}>
                <h1 className={"h1-style"}>
                  {this.props.media.title}
                  {/* <div className={"edit-link"}>
                    <img
                      className={"edit-icon"}
                      src={editIcon}
                      alt={"Éditer"}
                    />
                  </div> */}
                </h1>

                <div className={"artist-line"}>
                  <div className={"left"}>
                    <span className={"tag"}>{t("oeuvre.piece")}</span>
                    {t("oeuvre.par")} <span>{this.props.media.artist}</span> {/* t("oeuvre.feat") */}{" "}
                    <span>{/* t("oeuvre.artistName") */}</span>
                  </div>

                  <div className={"right"}>
                    <div className={"avatars"}>{this.renderAvatars()}</div>
                  </div>
                </div>

                <div className={"header-divider"}></div>

                <div className={"other-info"}>
                  {t("oeuvre.creePar")} <span>{this.props.rightHolders[this.props.media.creator].artistName}</span> &middot; Mis
                  à jour {i18n.lng &&
                      moment(this.props.media.modificationDate ? this.props.media.modificationDate : this.props.media.creationDate)
                        .locale(i18n.lng.substring(0, 2))
                        .fromNow()}
                </div>
              </div>
            </div>
          </header>
        )}
      </Translation>
    );
  }
}
