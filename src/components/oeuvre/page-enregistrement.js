
import React from "react";
import { Search } from 'semantic-ui-react'
import { Translation } from "react-i18next";
import Page from "../page-assistant/page";
import RecordGreen from "../../assets/svg/icons/record-green.svg";
import RecordOrange from "../../assets/svg/icons/record-orange.svg";
import Colonne from "../page-assistant/colonne";
import Entete from "../page-assistant/entete";
import "../../assets/scss/assistant-form.scss";
import ChampSelectionMultipleAyantDroit from "../page-assistant/champ-selection-multiple-ayant-droit";
import RightHolderOptions from "../page-assistant/right-holder-options";
import ChampTexte from "../page-assistant/champ-texte";
import FormulaireDateSortie from "../page-assistant/formulaire-date-sortie";
import {
  addRightHolderIfMissing,
  getRightHolderIdsByRole,
  hasRoles,
  updateRole
} from "../page-assistant/right-holder-helpers";
import * as roles from "../../assets/listes/role-uuids.json";
import { SauvegardeAutomatiqueMedia } from "./SauvegardeAutomatique";
import InfoBulle from '../partage/InfoBulle'

/* global google */
import scriptLoader from 'react-async-script-loader';
const PLACES_URL = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDMqdhUeY8YrbkAaDp0VcYVsSk-NqWT65M&libraries=places"

class PageEnregistrement extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      directors: getRightHolderIdsByRole(
        roles.director,
        props.values.rightHolders
      ),
      soundRecordists: getRightHolderIdsByRole(
        roles.soundRecordist,
        props.values.rightHolders
      ),
      mixEngineers: getRightHolderIdsByRole(
        roles.mixEngineer,
        props.values.rightHolders
      ),
      masterEngineers: getRightHolderIdsByRole(
        roles.masterEngineer,
        props.values.rightHolders
      ),
      producers: getRightHolderIdsByRole(
        roles.producer,
        props.values.rightHolders
      ),     
      value: '', 
      results: '', 
      selectedPlace: '',
      isLoading: false
    };
  }

  // componentWillReceiveProps ({ isScriptLoaded, isScriptLoadSucceed }) {
  //   if (isScriptLoaded && !this.props.isScriptLoaded) { // load finished
  //     if (isScriptLoadSucceed) {
  //       this.initEditor()
  //     }
  //     else this.props.onError()
  //   }
  // }

  // componentDidMount () {
  //   const { isScriptLoaded, isScriptLoadSucceed } = this.props
  //   if (isScriptLoaded && isScriptLoadSucceed) {
  //     this.initEditor()
  //   }
  // }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.directors !== prevState.directors ||
      this.state.soundRecordists !== prevState.soundRecordists ||
      this.state.mixEngineers !== prevState.mixEngineers ||
      this.state.masterEngineers !== prevState.masterEngineers ||
      this.state.producers !== prevState.producers
    ) {
      const recordingRightHolderIds = this.state.directors
        .concat(this.state.soundRecordists)
        .concat(this.state.mixEngineers)
        .concat(this.state.masterEngineers)
        .concat(this.state.producers);

      const updatedRightHolders = recordingRightHolderIds
        .reduce(addRightHolderIfMissing, [...this.props.values.rightHolders])
        .map(this.getUpdatedRightHolder)
        .filter(hasRoles);

      this.props.setFieldValue("rightHolders", updatedRightHolders);
    }
  }

  getUpdatedRightHolder = rightHolder => {
    const rightHolderRoles = rightHolder.roles || [];
    const id = rightHolder.id || null;

    const directorRoles = updateRole(
      roles.director,
      this.state.directors,
      id,
      rightHolderRoles
    );
    const soundRecordistRoles = updateRole(
      roles.soundRecordist,
      this.state.soundRecordists,
      id,
      directorRoles
    );
    const mixEngineerRoles = updateRole(
      roles.mixEngineer,
      this.state.mixEngineers,
      id,
      soundRecordistRoles
    );
    const masterEngineerRoles = updateRole(
      roles.masterEngineer,
      this.state.masterEngineers,
      id,
      mixEngineerRoles
    );
    const newRoles = updateRole(
      roles.producer,
      this.state.producers,
      id,
      masterEngineerRoles
    );

    return Object.assign({}, rightHolder, { roles: newRoles });
  };

  rightHolderOptions() {
    return RightHolderOptions(this.props.rightHolders);
  }

  icon() {
    return this.props.pochette ? RecordOrange : RecordGreen;
  }

  idsSiUUID(ids) {
    // Protéger la liste des valeurs non-uuid
    let _ids = []
    const UUID_REGEXP = new RegExp("[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}")
    if(ids) {
        ids.forEach(id=>{
            if(UUID_REGEXP.test(id)) {
                _ids.push(id)
            }
        })
        return _ids        
    }
  }

  resetComponent = () => {
    this.setState({ isLoading: false, results: [], value: "" });
  }

  handleResultSelect = (e, { result }) => {
    this.setState({ value: result.title, selectedPlace: result });
  }

  handleSearchChange = (e, { value }) => {
    if (value.length === 0) {
      return this.resetComponent();
    }

    this.setState({ isLoading: true, value });
    const autocompleteService = new google.maps.places.AutocompleteService();
    autocompleteService.getPlacePredictions(
      { input: value },
      this.handleAutocompleteResult
    );
  };

  handleAutocompleteResult = (predictions, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      this.setState({
        isLoading: false,
        results: predictions.map(prediction => {
          return {
            key: prediction.id,
            title: prediction.structured_formatting.main_text,
            description: prediction.structured_formatting.secondary_text,
            source: prediction
          };
        })
      });
    }
  };

  render() {
    const { isLoading, value, results, selectedPlace } = this.state;

    return (
      <Translation>
        {t => (
          <Page pochette={this.props.pochette}>
            <SauvegardeAutomatiqueMedia etat={true} values={this.props.values} interval={10000} />
            <Colonne>
              <Entete
                pochette={this.props.pochette}
                icon={this.icon()}
                label={t(
                  "flot.split.documente-ton-oeuvre.documenter.entete.enregistrement"
                )}
                question={
                  t("flot.split.documente-ton-oeuvre.documenter.titre3",
                    { titre: this.props.values.title })                  
                }
                description={t(
                  "flot.split.documente-ton-oeuvre.documenter.titre3-description"
                )}
              />

              <h3 className="section-title">
                {t(
                  "flot.split.documente-ton-oeuvre.documenter.entete.enregistrement"
                )}
              </h3>

              <ChampSelectionMultipleAyantDroit
                pochette={this.props.pochette}
                items={this.rightHolderOptions()}
                label={t(
                  "flot.split.documente-ton-oeuvre.documenter.realisation"
                )}
                info={<InfoBulle text={t("flot.split.documente-ton-oeuvre.documenter.realisation-description")} />}// -> ChampSelectionMultipleAyantDroit -> TitreChamp
                placeholder={t(
                  "flot.split.documente-ton-oeuvre.documenter.realisation-placeholder"
                )}
                value={this.state.directors}                
                onChange={ids => {
                  let _ids = this.idsSiUUID(ids)
                  this.setState({directors: _ids})
                }}
                fn={(nouveau)=>{
                  this.props.parent.nouvelAyantDroit(this.props.values.rightHolders, this.props.setFieldValue, nouveau, roles.director)                  
                }}
              />

              <ChampSelectionMultipleAyantDroit
                pochette={this.props.pochette}
                items={this.rightHolderOptions()}
                label={t("flot.split.documente-ton-oeuvre.documenter.son")}
                info={<InfoBulle text={t("flot.split.documente-ton-oeuvre.documenter.son-description")} />}
                placeholder={t(
                  "flot.split.documente-ton-oeuvre.documenter.son-placeholder"
                )}
                value={this.state.soundRecordists}
                onChange={ids => {
                  let _ids = this.idsSiUUID(ids)
                  this.setState({soundRecordists: _ids})
                }}
                fn={(nouveau)=>{
                  this.props.parent.nouvelAyantDroit(this.props.values.rightHolders, this.props.setFieldValue, nouveau, roles.soundRecordist)                  
                }}
              />

              <ChampSelectionMultipleAyantDroit
                pochette={this.props.pochette}
                items={this.rightHolderOptions()}
                label={t("flot.split.documente-ton-oeuvre.documenter.mix")}
                info={<InfoBulle text={t("flot.split.documente-ton-oeuvre.documenter.mix-description")} />}
                placeholder={t(
                  "flot.split.documente-ton-oeuvre.documenter.mix-placeholder"
                )}
                value={this.state.mixEngineers}
                onChange={ids => {
                  let _ids = this.idsSiUUID(ids)
                  this.setState({mixEngineers: _ids})
                }}
                fn={(nouveau)=>{
                  this.props.parent.nouvelAyantDroit(this.props.values.rightHolders, this.props.setFieldValue, nouveau, roles.mixEngineer)                  
                }}
              />

              <ChampSelectionMultipleAyantDroit
                pochette={this.props.pochette}
                items={this.rightHolderOptions()}
                label={t("flot.split.documente-ton-oeuvre.documenter.master")}
                info={<InfoBulle text={t("flot.split.documente-ton-oeuvre.documenter.master-description")} />}
                placeholder={t(
                  "flot.split.documente-ton-oeuvre.documenter.master-placeholder"
                )}
                value={this.state.masterEngineers}
                onChange={ids => {
                  let _ids = this.idsSiUUID(ids)
                  this.setState({masterEngineers: _ids})
                }}
                fn={(nouveau)=>{
                  this.props.parent.nouvelAyantDroit(this.props.values.rightHolders, this.props.setFieldValue, nouveau, roles.masterEngineer)                  
                }}
              />

              <ChampTexte
                pochette={this.props.pochette}
                label={t("flot.split.documente-ton-oeuvre.documenter.studio")}
                info={<InfoBulle text={t("flot.split.documente-ton-oeuvre.documenter.studio-description")} />}
                placeholder={t(
                  "flot.split.documente-ton-oeuvre.documenter.studio-placeholder"
                )}
                value={this.props.values.studio}
                onChange={value => this.props.setFieldValue("studio", value)}
              />

              <ChampTexte
                pochette={this.props.pochette}
                placeholder={t(
                  "flot.split.documente-ton-oeuvre.documenter.studio-adresse"
                )}
                value={this.props.values.studioAddress}
                onChange={value =>
                  this.props.setFieldValue("studioAddress", value)
                }
              />

             {/*  <Search
                loading={isLoading}
                onResultSelect={this.handleResultSelect}
                onSearchChange={this.handleSearchChange}
                results={results}
                value={value}
                {...this.props}
              /> */}

              <ChampSelectionMultipleAyantDroit
                pochette={this.props.pochette}
                items={this.rightHolderOptions()}
                label={t(
                  "flot.split.documente-ton-oeuvre.documenter.production"
                )}
                info={<InfoBulle text={t("flot.split.documente-ton-oeuvre.documenter.production-description")} />}
                placeholder={t(
                  "flot.split.documente-ton-oeuvre.documenter.production-placeholder"
                )}
                value={this.state.producers}
                onChange={ids => {
                  let _ids = this.idsSiUUID(ids)
                  this.setState({producers: _ids})
                }}
                fn={(nouveau)=>{
                  this.props.parent.nouvelAyantDroit(this.props.values.rightHolders, this.props.setFieldValue, nouveau, roles.producer)                  
                }}
              />

              <ChampTexte
                label={t("oeuvre.attribut.etiquette.isrc")}
                info={<InfoBulle text={t('oeuvre.attribut.indication.isrc')} />}
                placeholder={t(
                  "oeuvre.attribut.indication.isrc-placeholder"
                )}
                value={this.props.values.isrc}
                onChange={value => this.props.setFieldValue("isrc", value)}
              />
              <div className="section-divider"></div>

              <h3 className="section-title">
                {t("flot.split.documente-ton-oeuvre.documenter.entete.sortie")}
              </h3>

              <ChampTexte
                pochette={this.props.pochette}
                label={t(
                  "flot.split.documente-ton-oeuvre.documenter.etiquette"
                )}
                info={<InfoBulle text={t("flot.split.documente-ton-oeuvre.documenter.etiquette-description")} />}
                placeholder={t(
                  "flot.split.documente-ton-oeuvre.documenter.etiquette-placeholder"
                )}
                value={this.props.values.label}
                onChange={value => this.props.setFieldValue("label", value)}
              />

              <ChampTexte
                pochette={this.props.pochette}
                placeholder={t(
                  "flot.split.documente-ton-oeuvre.documenter.etiquette-adresse"
                )}
                value={this.props.values.labelAddress}
                onChange={value =>
                  this.props.setFieldValue("labelAddress", value)
                }
              />

              <ChampTexte
                pochette={this.props.pochette}
                label={t(
                  "flot.split.documente-ton-oeuvre.documenter.distribution"
                )}
                info={<InfoBulle text={t("flot.split.documente-ton-oeuvre.documenter.distribution-description")} />}
                placeholder={t(
                  "flot.split.documente-ton-oeuvre.documenter.distribution-placeholder"
                )}
                value={this.props.values.distributor}
                onChange={value =>
                  this.props.setFieldValue("distributor", value)
                }
              />

              <ChampTexte
                pochette={this.props.pochette}
                placeholder={t(
                  "flot.split.documente-ton-oeuvre.documenter.distribution-adresse"
                )}
                value={this.props.values.distributorAddress}
                onChange={value =>
                  this.props.setFieldValue("distributorAddress", value)
                }
              />

              <FormulaireDateSortie
                value={this.props.values.publishDate}
                onChange={value =>
                  {
                    this.props.setFieldValue("publishDate", value)
                  }
                }
              />

              <ChampTexte
                label={t("flot.split.documente-ton-oeuvre.documenter.codeupc")}
                info={<InfoBulle text={t("flot.split.documente-ton-oeuvre.documenter.codeupc-description")} />}
                placeholder={t(
                  "flot.split.documente-ton-oeuvre.documenter.codeupc-placeholder"
                )}
                value={this.props.values.upc}
                onChange={value => this.props.setFieldValue("upc", value)}
              />
            </Colonne>
          </Page>
        )}
      </Translation>
    );
  }
}

export default scriptLoader([PLACES_URL])(PageEnregistrement);

