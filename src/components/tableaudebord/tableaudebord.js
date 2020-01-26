import React, { Component } from "react"
import Navigation from "./tableaudebord-navigation"
import Panneau from "./tableaudebord-panneau"
import Entete from "../entete/entete"
import "../../assets/scss/tableaudebord/tableaudebord.scss"
import "react-confirm-alert/src/react-confirm-alert.css"
import ModaleConnexion from "../auth/Connexion"
import { Identite } from '../../utils/application'

export default class TableauDeBord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navigation: 0,
      pochette: props.pochette
    };
  }

  componentWillMount() {
    if(Identite.usager) {
      this.setState({ user: Identite.usager })
    } else {
      this.setState({ modaleConnexion: true })
    }    
  }

  render() {
    let accueil = "accueil";
    if (this.props.pochette) {
      accueil = "accueil-pochette";
    }
    if (this.state.user) {
      let contenu = <div className="ui seven wide column"></div>;
      let entete = <Entete style={{marginLeft: "0px", backgroundColor: "#FAF8F9"}} pochette={this.props.pochette} contenu={contenu} profil={this.state.user} />;
      return (
        <div className="tdb--cadre ui row">
          <Navigation parent={this} pochette={this.state.pochette} />
          <Panneau
            pochette={this.state.pochette}
            entete={entete}
            selection={this.state.navigation}
            user={this.state.user}
          />
        </div>
      );
    } else {
      return (
        <div className={`tdb--cadre ui row ${accueil}`}>
          <ModaleConnexion
            pochette={this.state.pochette}
            parent={this}
            isOpen={this.state.modaleConnexion}
          />
        </div>
      )
    }
  }
}
