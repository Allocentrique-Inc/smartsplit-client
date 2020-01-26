import {config, AyantsDroit, journal, Identite, utils} from '../../utils/application'
import React, { Component } from "react";
import { Wizard } from "semantic-ui-react-formik-iptoki";
import axios from "axios";
import PageCreation from "./page-creation";
import PageInterpretation from "./page-interpretation";
import PageInformationsGenerales from "./page-informations-generales";
import PageParoles from "./page-paroles";
import PageLiens from "./page-liens";
import PageEnregistrement from "./page-enregistrement";
import PageFichiers from "./page-fichiers";
import { withTranslation } from "react-i18next";
import Navbar from "../navigation/navbar";
import ModalFin from "./modal-fin";
import ModaleConnexion from "../auth/Connexion";
import "../../assets/scss/page-assistant/bouton.scss";

// eslint-disable-next-line
const NOM = "AssistantOeuvre"

class AssistantOeuvre extends Component {
  pageProgressPercentages = [10, 20, 30, 40, 50, 70, 80, 100];

  constructor(props) {
    super(props);

    this.state = {
      progressPercentage: this.pageProgressPercentages[0],
      title: props.titre,
      rightHolders: [],
      endModalOpen: false,
      modaleConnexion: false,
      mediaId: props.mediaId
    };
  }

  componentWillMount() {

    if(Identite.usager) {
      this.setState({user: Identite.usager}, ()=>{
        if (this.state.mediaId) {
          axios
            .get(
              `${config.API_URL}media/${this.state.mediaId}`
            )
            .then(res => {
              if (res.data.Item) {
                let media = res.data.Item
                if (Identite.usager.username === media.creator) {
                  this.setState({ media: media }, () =>
                    this.fetchApiRightHolders()
                  )
                } else {
                  utils.naviguerVersSommaire()                  
                }
              }
            });
        } else {
          this.fetchApiRightHolders()
        }
      })
    } else {
      journal.warn(NOM, "L'accès requiert une session active")
      this.setState({ modaleConnexion: true });
    }    
  }

  nouvelAyantDroit(rightHolders, fnSetValues, nouveau, role) {
    let _rHs = rightHolders;
    _rHs.push({ id: nouveau, roles: [role] });
    fnSetValues("rightHolders", _rHs);
    // recharger les ayant-droits
    this.fetchApiRightHolders();
  }

  fetchApiRightHolders() {
    let response = AyantsDroit.ayantsDroitBrut    
    let assocUuidArtiste = {}
    response.forEach(e => {      
      assocUuidArtiste[e.rightHolderId] = e.artistName || `${e.firstName} ${e.lastName}`
    })
    this.setState({ assocUuidArtiste: assocUuidArtiste }, () =>
      this.setState({ rightHolders: response })
    )
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.audio !== nextProps.audio) {
      this.setState({ audio: nextProps.audio })
    }
  }

  getInitialValues() {
    let _m = this.state.media;
    let valeurs = {};

    if (!_m) {
      valeurs = {
        mediaId: this.state.mediaId,
        title: "",
        album: "",
        artist: "",
        cover: "false",
        rightHolders: [],
        jurisdiction: "",
        lyrics: {
          text: "",
          languages: [],
          access: "private"
        },
        isrc: "",
        iswc: "",
        upc: "",
        msDuration: "",
        duration: "",
        bpm: "",
        influence: "",
        genre: "",
        secondaryGenres: [],
        socialMediaLinks: [],
        streamingServiceLinks: [],
        pressArticleLinks: [],
        playlistLinks: [],
        creationDate: "",
        publishDate: "",
        publisher: "",
        studio: "",
        studioAddress: "",
        label: "",
        labelAddress: "",
        distributor: "",
        distributorAddress: "",
        rightsSplit: {},
        files: {
          cover: {
            file: null,
            access: "private"
          },
          audio: {
            file: null,
            access: "private"
          },
          score: {
            file: null,
            access: "private"
          },
          midi: {
            file: null,
            access: "private"
          }
        }
      }
    } else {
      let lyrics = _m.lyrics

      if (lyrics && lyrics.text) lyrics.text = lyrics.text.trim()

      valeurs = {
        mediaId: this.state.mediaId,
        title: _m.title ? _m.title.trim() : "",
        album: _m.album ? _m.album.trim() : "",
        artist: _m.artist ? _m.artist.trim() : "",
        cover: _m.cover ? _m.cover : false,
        rightHolders: _m.rightHolders ? _m.rightHolders : [],
        jurisdiction: _m.jurisdiction ? _m.jurisdiction.trim() : "",
        lyrics: lyrics,
        isrc: _m.isrc ? _m.isrc.trim() : "",
        iswc: _m.iswc ? _m.iswc.trim() : "",
        upc: _m.upc ? _m.upc.trim() : "",
        msDuration: _m.msDuration ? _m.msDuration.trim() : "",
        bpm: _m.bpm ? _m.bpm.trim() : "",
        influence: _m.influence ? _m.influence.trim() : "",
        genre: _m.genre ? _m.genre.trim() : "",
        secondaryGenres: _m.secondaryGenre || [],
        socialMediaLinks: _m.socialMediaLinks || [],
        streamingServiceLinks: _m.streamingServiceLinks || [],
        pressArticleLinks: _m.pressArticleLinks || [],
        playlistLinks: _m.playlistLinks || [],
        creationDate: _m.creationDate
          ? new Date(parseInt(_m.creationDate))
          : new Date(),
        publishDate: _m.publishDate ? _m.publishDate : "",
        publisher: _m.publisher ? _m.publisher.trim() : "",
        studio: _m.studio ? _m.studio.trim() : "",
        studioAddress: _m.studioAddress ? _m.studioAddress.trim() : "",
        label: _m.label ? _m.label.trim() : "",
        labelAddress: _m.labelAddress ? _m.labelAddress.trim() : "",
        distributor: _m.distributor ? _m.distributor.trim() : "",
        distributorAddress: _m.distributorAddress
          ? _m.distributorAddress.trim()
          : "",
        files: _m.files
      };
    }
    return valeurs;
  }

  onPageChanged = value => {
    const newProgressPercentage = this.pageProgressPercentages[value] || 100;

    this.setState({
      progressPercentage: newProgressPercentage
    });

    window.scrollTo(0, 0);
  };

  onSubmit = (values, actions, t) => {
    this.setState({
      endModalOpen: true
    });
    axios
      .post(`${config.API_URL}media`, values)
      .then(response => {
        actions.setSubmitting(false);
        this.setState({ endModalOpen: true });
      })
      .catch(error => {
        console.log(error);
      });
  };

  boutonsCouleurPochette() {
    let boutons = document.getElementsByClassName(
      "ui right floated button pochette"
    );
    for (var i = 0; i < boutons.length; i++) {
      boutons[i].style.backgroundColor = "#F2724A";
    }
  }

  render() {
    if (this.state.user && this.state.media) {
      let t = this.props.t
      return (        
        <>
          <Navbar
            pochette={this.props.pochette}
            songTitle={this.state.title}
            progressPercentage={this.state.progressPercentage}
            profil={this.state.user}
            media={this.state.media}
            resume={true}
            menuProfil={false}
          />

          {this.state.rightHolders && (
            <div className="ui grid">
              <div className="ui row">
                <div className="ui two wide column" />
                <div className="ui twelve wide column">
                  <Wizard
                    pochette={this.props.pochette}
                    initialValues={this.getInitialValues()}
                    onPageChanged={this.onPageChanged}
                    onSubmit={this.onSubmit}
                    buttonLabels={{
                      pochette: this.props.pochette,
                      previous: t("navigation.precedent"),
                      next: t("navigation.suivant"),
                      submit: t("navigation.envoi")
                    }}
                    debug={false}
                    ButtonsWrapper={props => (
                      <div
                        style={{
                          position: "fixed",
                          bottom: 0,
                          left: 0,
                          right: 0,
                          paddingTop: "15px",
                          background: "#fff",
                          boxShadow: "0 0 5px rgba(0,0,0,0.5)",
                          pochette: this.props.pochette
                        }}
                      >
                        <div className="ui grid">
                          <div className="ui row">
                            <div className="ui nine wide column">
                              {props.children}
                              {this.props.pochette}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  >
                    <Wizard.Page>
                      <PageCreation
                        pochette={this.props.pochette}
                        rightHolders={this.state.rightHolders}
                        assocUuidArtiste={this.state.assocUuidArtiste}
                        parent={this}
                      />
                    </Wizard.Page>
                    <Wizard.Page>
                      <PageInterpretation
                        pochette={this.props.pochette}
                        rightHolders={this.state.rightHolders}
                        assocUuidArtiste={this.state.assocUuidArtiste}
                        parent={this}
                      />
                    </Wizard.Page>

                    <Wizard.Page>
                      <PageEnregistrement
                        pochette={this.props.pochette}
                        rightHolders={this.state.rightHolders}
                        assocUuidArtiste={this.state.assocUuidArtiste}
                        parent={this}
                      />
                    </Wizard.Page>

                    <Wizard.Page>
                      <PageFichiers
                        pochette={this.props.pochette}
                        rightHolders={this.state.rightHolders}
                        assocUuidArtiste={this.state.assocUuidArtiste}
                        parent={this}
                      />
                    </Wizard.Page>

                    <Wizard.Page>
                      <PageInformationsGenerales
                        pochette={this.props.pochette}
                      />
                    </Wizard.Page>

                    <Wizard.Page>
                      <PageParoles
                        pochette={this.props.pochette}
                      />
                    </Wizard.Page>

                    <Wizard.Page>
                      <PageLiens pochette={this.props.pochette} />
                    </Wizard.Page>
                  </Wizard>
                  {this.props.pochette &&
                    document.getElementsByClassName(
                      "ui right floated button pochette"
                    ).length > 0 &&
                    this.boutonsCouleurPochette()}
                  <ModalFin
                    mediaId={this.state.media.mediaId}
                    titre={this.state.media.title}
                    open={this.state.endModalOpen}
                    onClose={() => this.setState({ endModalOpen: false })}
                    pochette={this.props.pochette}
                  />
                </div>
              </div>
            </div>
          )}
        </>
      )
    } else {
      return (
        <ModaleConnexion
          pochette={this.props.pochette}
          parent={this}
          isOpen={this.state.modaleConnexion}
        />
      );
    }
  }
}

export default withTranslation()(AssistantOeuvre)
