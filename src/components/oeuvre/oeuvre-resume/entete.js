import React from "react";
import placeholder from "../../../assets/images/placeholder.png";
import "../../../assets/scss/oeuvre-resume/entete.scss";

import plusIcon from "../../../assets/svg/icons/plus-white.svg";
import editIcon from "../../../assets/svg/icons/edit.svg";
import { Translation } from "react-i18next";
import moment from "moment";

export default class Entete extends React.Component {
  
  constructor(props){
    super(props)
    this.avatars = []
    let _avatars = {}
    props.media.rightHolders.forEach(r=>{
      
      if(!this.avatars[r.id]) {        
        let nom, prenom, nomArtiste, avatar, uuid
        if(props.rightHolders[r.id]) {        
          uuid = props.rightHolders[r.id].rightHolderId   
          nom = props.rightHolders[r.id].lastName
          prenom = props.rightHolders[r.id].firstName
          nomArtiste = props.rightHolders[r.id].artistName
          avatar = `https://smartsplit-images.s3.us-east-2.amazonaws.com/${props.rightHolders[r.id].avatarImage}`
        } else {
          uuid = " "
          nom = " "
          prenom = " "
          nomArtiste = " "
          avatar = `https://smartsplit-images.s3.us-east-2.amazonaws.com/image.jpg`
        }
        _avatars[r.id] = {nom, prenom, nomArtiste, avatar, uuid}
      }
     
    })

    Object.keys(_avatars).forEach(a=>this.avatars.push(_avatars[a]))
  }  

  renderAvatars() {
    const maxDisplayedAvatars = 5;
    const displayedAvatars = Math.min(maxDisplayedAvatars, this.avatars.length);
    const undisplayedAvatars = this.avatars.length - displayedAvatars;
    const moreLabel = undisplayedAvatars ? (
      <div key={`more-tag-avatar`} className={"more-tag"}>+{undisplayedAvatars}</div>
    ) : (
      <></>
    );

    this.avatars = this.avatars
      .slice(0, maxDisplayedAvatars)
      .map((avatar, index) => {
        const zIndex = displayedAvatars + 2 - index;
        return (
          <div key={`avatar_${index}`} className={"avatar"} style={{ zIndex }}>
            <img src={avatar.avatar} alt={`${avatar.prenom} ${avatar.nom} ${avatar.nomArtiste ? `(${avatar.nomArtiste})` : ""}`} title={`${avatar.prenom} ${avatar.nom} ${avatar.nomArtiste ? `(${avatar.nomArtiste})` : ""}`} />
          </div>
        );
      })
      .concat([moreLabel])

      if(this.avatars.length > maxDisplayedAvatars) {

        let autres = ""
        this.avatars.slice(maxDisplayedAvatars - 1, this.avatars.length).forEach(e=>{
          autres = autres + `${e.prenom} ${e.nom} ${e.nomArtiste ? e.nomArtiste : ""}{"\n"}`
        })

        this.avatars = this.concat([
          <div key="plus-bouton-avatar">
            <div className={"plus-button"}>
              <img alt={autres} src={plusIcon} title={autres} />
            </div>
          </div>
        ])
      }

      return this.avatars

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
                  <div className={"edit-link"} style={{display: "inline"}}>
                    <img
                      className={"edit-icon"}
                      src={editIcon}
                      alt={"Éditer"}
                    />
                  </div>
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
