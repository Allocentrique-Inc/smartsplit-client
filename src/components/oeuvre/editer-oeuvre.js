import {config, Identite, journal, AyantsDroit} from '../../utils/application'
import React, { Component } from "react"
import { Wizard } from "../formulaires/assistant"
import axios from "axios"
import PageCreation from "./page-creation"
import PageInterpretation from "./page-interpretation"
import PageInformationsGenerales from "./page-informations-generales"
import PageParoles from "./page-paroles"
import PageLiens from "./page-liens"
import PageEnregistrement from "./page-enregistrement"
import PageFichiers from "./page-fichiers"
import { withTranslation } from "react-i18next"
import Navbar from "../navigation/navbar"
import ModaleConnexion from "../auth/Connexion"
import moment from 'moment'

const NOM = "EditerOeuvre"

class EditerOeuvre extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rightHolders: [],
      endModalOpen: false,
      modaleConnexion: false,
      mediaId: props.mediaId,
      jeton: props.jeton
    }
  }

  componentWillMount() {
    if (this.state.jeton) {
      axios
      .post(`${config.API_URL}media/decodeMedia`, {
        jeton: this.state.jeton
      })
      .then(res => {
        if (
          this.state.mediaId &&
          parseInt(this.state.mediaId) === parseInt(res.data.mediaId) &&
          parseInt(res.data.acces) === 3
        ) {
          this.chargement(true)
        }
      })
      .catch(err => journal.erreur(NOM,err))
    } else {
      // Teste si l'usager est le créateur de l'oeuvre (dans le système)
      axios.get(`${config.API_URL}media/${this.state.mediaId}`)
      .then((_m)=>{
        this.chargement(Identite.usager.username === _m.data.Item.creator)        
      })
    }
  }

  getMedia(admin, response = false) {  
    if (this.state.mediaId) {
      axios
      .get(
        `${config.API_URL}media/${this.state.mediaId}`
      )
      .then(res => {
        if (res.data.Item) {
          let media = res.data.Item;
          if (admin || response.username === media.creator) {
            this.setState({ media: media }, () =>
              this.fetchApiRightHolders()
            );
            this.setState({ user: response });
          } else {
            window.location.href = `/oeuvre/${media.mediaId}/resume`;
          }
        }
      })
    } else {
      this.setState({ user: response });
      this.fetchApiRightHolders();
    }
  }

  chargement(admin = false) {    
    if(Identite.usager) {
      this.setState({user: Identite.usager}, ()=>this.getMedia(admin, Identite.usager))
    } else {
      if(!admin) {
        this.setState({ modaleConnexion: true })        
      } else {
        this.getMedia(admin)
      }
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
    let response = AyantsDroit.tousBrut
    let assocUuidArtiste = {}    
    response.forEach(e => {
      assocUuidArtiste[e.rightHolderId] =
        e.artistName || `${e.firstName} ${e.lastName}`
    })
    this.setState({ assocUuidArtiste: assocUuidArtiste }, () =>
      this.setState({ rightHolders: response })
    )    
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.audio !== nextProps.audio) {
      this.setState({ audio: nextProps.audio });
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
      };
    } else {
      let lyrics = _m.lyrics;

      if (lyrics && lyrics.text) lyrics.text = lyrics.text.trim();

      if (!_m.files) {
        _m.files = {};
      }
      if (!_m.files.cover || !_m.files.cover.files) {
        _m.files.cover = { files: [] };
      }
      if (!_m.files.midi || !_m.files.midi.files) {
        _m.files.midi = { files: [] };
      }
      if (!_m.files.score || !_m.files.score.files) {
        _m.files.score = { files: [] };
      }
      if (!_m.files.audio || !_m.files.audio.files) {
        _m.files.audio = { files: [] };
      }

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
          ? moment(new Date(parseInt(_m.creationDate))).format('DD-MM-YYYY')
          : moment(new Date()).format('DD-MM-YYYY'),
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
        if (this.state.jeton) {
          window.location.href = `/oeuvre/resume/${this.state.jeton}`;
        } else {
          window.location.href = `/oeuvre/${this.state.mediaId}/resume`;
        }
      })
      .catch(error => {
        journal.error(error);
      });
  }

  renduPage() {
    let page;
    switch (this.props.pageNo) {
      case "1":
        page = (
          <Wizard.Page>
            <PageCreation
              pochette={this.props.pochette}
              rightHolders={this.state.rightHolders}
              assocUuidArtiste={this.state.assocUuidArtiste}
              parent={this}
            />
          </Wizard.Page>
        );
        break;
      case "2":
        page = (
          <Wizard.Page>
            <PageInterpretation
              pochette={this.props.pochette}
              rightHolders={this.state.rightHolders}
              assocUuidArtiste={this.state.assocUuidArtiste}
              parent={this}
            />
          </Wizard.Page>
        );
        break;
      case "3":
        page = (
          <Wizard.Page>
            <PageEnregistrement
              pochette={this.props.pochette}
              rightHolders={this.state.rightHolders}
              assocUuidArtiste={this.state.assocUuidArtiste}
              parent={this}
            />
          </Wizard.Page>
        );
        break;
      case "4":
        page = (
          <Wizard.Page>
            <PageFichiers
              pochette={this.props.pochette}
              rightHolders={this.state.rightHolders}
              assocUuidArtiste={this.state.assocUuidArtiste}
              parent={this}
            />
          </Wizard.Page>
        );
        break;
      case "5":
        page = (
          <Wizard.Page>
            <PageInformationsGenerales
              pochette={this.props.pochette}
            />
          </Wizard.Page>
        );
        break;
      case "6":
        page = (
          <Wizard.Page>
            <PageParoles pochette={this.props.pochette} />
          </Wizard.Page>
        );
        break;
      case "7":
        page = (
          <Wizard.Page>
            <PageLiens pochette={this.props.pochette} />
          </Wizard.Page>
        );
        break;
      default:
        break;
    }
    return page;
  }

  render() {
    const t = this.props.t
    if ((this.state.user || this.state.jeton) && this.state.media) {
      return (        
        <>
          <Navbar
            songTitle={this.state.title}
            pochette={this.props.pochette}
            progressPercentage={this.state.progressPercentage}
            profil={this.state.user}
            media={this.state.media}
          />
          {this.state.rightHolders && this.props.pageNo && (
            <>
              <Wizard
                pochette={this.props.pochette}
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
                initialValues={this.getInitialValues()}
                onPageChanged={this.onPageChanged}
                onSubmit={this.onSubmit}
                buttonLabels={{
                  previous: t("navigation.precedent"),
                  next: t("navigation.suivant"),
                  submit: t("navigation.enregistrer")
                }}
                debug={false}
              >
                {this.renduPage()}
              </Wizard>
            </>
          )}         
        </>          
      )
    } else {
      return (
        <ModaleConnexion parent={this} isOpen={this.state.modaleConnexion} />
      );
    }
  }
}

export default withTranslation()(EditerOeuvre)
