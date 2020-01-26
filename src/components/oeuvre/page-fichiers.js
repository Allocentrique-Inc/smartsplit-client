import { config } from '../../utils/application'
import React from "react"
import { withTranslation } from "react-i18next"
import Page from "../page-assistant/page"
import FileCircleOrange from "../../assets/svg/icons/file-circle-orange.svg"
import FileCircleGreen from "../../assets/svg/icons/file-circle-green.svg"
import Colonne from "../page-assistant/colonne"
import Entete from "../page-assistant/entete"
import ChampTeleversement, { ListeFichiers } from "../page-assistant/champ-televersement"
import SauvegardeAutomatiqueMedia from "./SauvegardeAutomatique"
import ChampSelectionMultipleAyantDroit from "../page-assistant/champ-selection-multiple-ayant-droit"
import RightHolderOptions from "../page-assistant/right-holder-options";
import InfoBulle from "../partage/InfoBulle"
import * as roles from "../../assets/listes/role-uuids.json"
import axios from 'axios'
import {
  addRightHolderIfMissing,
  getRightHolderIdsByRole,
  hasRoles,
  updateRole
} from "../page-assistant/right-holder-helpers";

class PageFichiers extends React.Component {
  icon() {
    return this.props.pochette ? FileCircleOrange : FileCircleGreen
  }

  constructor(props) {
    super(props);

    this.state = {
      graphists: getRightHolderIdsByRole(
        roles.graphist,
        props.values.rightHolders
      ),
      open: props.open,
      terms: "Y"
    }

    this.televerser = this.televerser.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.graphists !== prevState.graphists
    ) {

      const creationRightHolderIds = this.state.graphists

      const updatedRightHolders = creationRightHolderIds
        .reduce(addRightHolderIfMissing, [...this.props.values.rightHolders])
        .map(this.getUpdatedRightHolder)
        .filter(hasRoles);

      this.props.setFieldValue("rightHolders", updatedRightHolders);
    }
  }

  getUpdatedRightHolder = rightHolder => {
    const rightHolderRoles = rightHolder.roles || [];
    const id = rightHolder.id || null;

    const graphistsRoles = updateRole(
      roles.graphist,
      this.state.graphists,
      id,
      rightHolderRoles
    );

    return Object.assign({}, rightHolder, { roles: graphistsRoles });
  };

  rightHolderOptions() {
    return RightHolderOptions(this.props.rightHolders);
  }

  televerser(value, chemin, elem) {
    if (value) {
      this.setState({ patience: true })
      let fichier = value
      let fd = new FormData()
      fd.append('file', fichier)                    
      let mediaId = this.props.values.mediaId                  
      fd.append('mediaId', mediaId)
      axios.post(`${config.FICHIERS_SRV_URL}${chemin}`, fd)
      .then(res => {
        
      })
      .catch(err => {
          if (err) {
              console.log(err)                                
          }
      })
      .finally(() => {
          this.setState({ patience: false })
      })
    }
  }  

  idsSiUUID(ids) {
    // Protéger la liste des valeurs non-uuid
    let _ids = []
    const UUID_REGEXP = new RegExp("[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}")
    if (ids) {
      ids.forEach(id => {
        if (UUID_REGEXP.test(id)) {
          _ids.push(id)
        }
      })
      return _ids
    }
  }

  render() {
    let t = this.props.t
    const { terms } = this.state
    
    let surSuppression = (type, idx)=>{
      let files = this.props.values.files
      files[type].files.splice(idx, 1)
      this.props.setFieldValue('files', files)
    }

    let surEdition = (type, idx, valeur)=>{
      let files = this.props.values.files
      if(files && files[type].files && files[type].files[idx]) {
        files[type].files[idx].access = valeur
      }
    }

    // Désactiver le comportement par défaut
    window.addEventListener("dragover",function(e){
      e.preventDefault();
    },true)
    window.addEventListener("drop",function(e){      
      e.preventDefault();
    },true)

    return (
      <Page pochette={this.props.pochette}>
          {
          this.state.patience &&
          (
            <div className="container ui active dimmer">
              <div className="ui text loader">{t("televersement.encours")}</div>
            </div>
          )
        }
        <SauvegardeAutomatiqueMedia etat={true} values={this.props.values} interval={10000} />
        <Colonne>
          <Entete
            pochette={this.props.pochette}
            icon={this.icon()}
            label={t(
              "flot.split.documente-ton-oeuvre.documenter.entete.fichier"
            )}
            question={t(
              "flot.split.documente-ton-oeuvre.documenter.titre4"
            )}
            description={t(
              "flot.split.documente-ton-oeuvre.documenter.titre4-description"
            )}
          />

          <div className="entete-section">
            <h3 className="section-title with-description">
              {t("flot.split.documente-ton-oeuvre.documenter.titre8")}
              <InfoBulle text={t("flot.split.documente-ton-oeuvre.documenter.titre8-description")} />
            </h3>
          </div>

          <ChampSelectionMultipleAyantDroit
            label={t("flot.split.documente-ton-oeuvre.documenter.graphiste")}
            pochette={this.props.pochette}
            items={this.rightHolderOptions()}
            info={<InfoBulle text={t("flot.split.documente-ton-oeuvre.documenter.graphiste-description")} />}
            placeholder={t(
              "flot.split.documente-ton-oeuvre.documenter.graphiste-placeholder"
            )}
            value={this.state.graphists}
            onChange={ids => {
              let _ids = this.idsSiUUID(ids)
              this.setState({ graphists: _ids })
            }}
            fn={(nouveau) => {
              this.props.parent.nouvelAyantDroit(this.props.values.rightHolders, this.props.setFieldValue, nouveau, roles.graphist)
            }}
          />
          <br />

          <ChampTeleversement
            label={t(
              "flot.split.documente-ton-oeuvre.documenter.titre8-etape1"
            )}
            info={<InfoBulle text={t("flot.split.documente-ton-oeuvre.documenter.titre8-etape2")} />}
            file={this.props.values.files && this.props.values.files.cover && this.props.values.files.cover.file}
            access={(this.props.values.files && this.props.values.files.cover && this.props.values.files.cover.access) || "public"}
            onFileChange={value => {
              let nom = value.name.replace(/ /g,'_')
              // Récupérer la liste de fichiers existante
              let fichiers = (this.props.values.files.cover && this.props.values.files.cover.files) || []
              let f = {file: nom}
              if(!this.state.accesCover) {
                f['access'] = 'public'
              } else {
                f['access'] = this.state.accesCover
              }
              fichiers.push(f)
              this.props.setFieldValue("files.cover.files", fichiers)
              this.televerser(value, 'uploadCoverArt')
            }}
            onAccessChange={value =>
              this.setState({accesCover: value})
              //this.props.setFieldValue("files.cover.access", value)
            }
          />
          <ListeFichiers 
            mediaId={this.props.values.mediaId}
            pochette={this.props.pochette}
            liste={this.props.values.files}
            type="cover"
            surEdition={surEdition}
            surSuppression={surSuppression}
          />

          <div className={"section-divider"}></div>

          <div className="entete-section">
            <h3 className="section-title with-description">
              {t("flot.split.documente-ton-oeuvre.documenter.titre9")}
              <InfoBulle text={t("flot.split.documente-ton-oeuvre.documenter.titre9-description")} />
            </h3>
          </div>

          <ChampTeleversement
            label={t(
              "flot.split.documente-ton-oeuvre.documenter.titre9-etape1"
            )}
            info={<InfoBulle text={t("flot.split.documente-ton-oeuvre.documenter.titre9-etape2")} />}
            access={(this.props.values.files && this.props.values.files.audio && this.props.values.files.audio.access) || "public"}
            onFileChange={value => {
              let nom                  
              if(value.name) {
                nom = value.name.replace(/ /g,'_')
                // Récupérer la liste de fichiers existante
                let fichiers = (this.props.values.files.audio && this.props.values.files.audio.files) || []
                let f = {file: nom}
                if(!this.state.accesAudio) {
                  f['access'] = 'public'
                } else {
                  f['access'] = this.state.accesAudio
                }
                // Lire le fichier pour en extraire la donnée et en calculer la somme de contrôle                
                fichiers.push(f)
                this.props.setFieldValue("files.audio.files", fichiers)
                this.televerser(value, 'upload')
              }                                    
            }}
            onAccessChange={value =>
              this.setState({accesAudio: value})                  
            }
          />

          <ListeFichiers 
            mediaId={this.props.values.mediaId}
            pochette={this.props.pochette}
            liste={this.props.values.files}
            surEdition={surEdition}
            surSuppression={surSuppression}
            type="audio"
          />

          <div className={"section-divider"}></div>

          <div className="entete-section">
            <h3 className="section-title with-description">
              {t("flot.split.documente-ton-oeuvre.documenter.autre")}
              <InfoBulle text={t("flot.split.documente-ton-oeuvre.documenter.autre-description")} />
            </h3>
          </div>

          <ChampTeleversement
            info={<InfoBulle text={t("flot.split.documente-ton-oeuvre.documenter.autre-etape2")} />}
            access={(this.props.values.files && this.props.values.files.score && this.props.values.files.score.access) || "public"}
            onFileChange={value => {
              let nom = value.name.replace(/ /g,'_')
              // Récupérer la liste de fichiers existante
              let fichiers = (this.props.values.files.score && this.props.values.files.score.files) || []
              let f = {file: nom}
              if(!this.state.accesScore) {
                f['access'] = 'public'
              } else {
                f['access'] = this.state.accesScore
              }
              fichiers.push(f)
              this.props.setFieldValue("files.score.files", fichiers)
              this.televerser(value, 'uploadScore')
            }}
            onAccessChange={value =>
              this.setState({accesScore: value})
            }
            label={t("flot.split.documente-ton-oeuvre.documenter.autre-etape1")
            }
            key={terms}
            value={this.state.terms}
          />
          <ListeFichiers 
            mediaId={this.props.values.mediaId}
            pochette={this.props.pochette}
            liste={this.props.values.files}
            type="score"
            surSuppression={surSuppression}
            surEdition={surEdition}
          />
          <ChampTeleversement
            extraStyle={{ marginTop: "70px" }}
            label={t(
              "flot.split.documente-ton-oeuvre.documenter.autre-etape3"
            )}
            info={<InfoBulle text={t("flot.split.documente-ton-oeuvre.documenter.autre-etape4")} />}
            access={(this.props.values.files && this.props.values.files.midi && this.props.values.files.midi.access) || "public"}
            onFileChange={value => {
              let nom = value.name.replace(/ /g,'_')
              // Récupérer la liste de fichiers existante
              let fichiers = (this.props.values.files.midi && this.props.values.files.midi.files) || []
              let f = {file: nom}
              if(!this.state.accesMidi) {
                f['access'] = 'public'
              } else {
                f['access'] = this.state.accesMidi
              }
              fichiers.push(f)
              this.props.setFieldValue("files.midi.files", fichiers)
              this.televerser(value, 'uploadMidi')
            }}
            onAccessChange={value =>
              this.setState({accesMidi: value})
            }
          />
          <ListeFichiers 
            mediaId={this.props.values.mediaId}
            pochette={this.props.pochette}
            liste={this.props.values.files}
            type="midi"
            surSuppression={surSuppression}
            surEdition={surEdition}
          />
        </Colonne>
      </Page>      
    )
  }
}

export default withTranslation()(PageFichiers)