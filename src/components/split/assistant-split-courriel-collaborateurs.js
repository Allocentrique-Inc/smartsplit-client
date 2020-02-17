/**
 * Saisie du collaborateur principal de l'oeuvre
 */
import React, { Component } from "react"
import { withTranslation } from "react-i18next"
import { Input, Label } from "semantic-ui-react"
import axios from "axios"
import { AyantsDroit, journal, utils, config } from '../../utils/application'

const divEmail = {
  position: "relative",
  display: "block",
  margin: "0 20px 0 10px"
}

const NOM = "PageAssistantSplitCourrielsCollaborateurs"

class PageAssistantSplitCourrielsCollaborateurs extends Component {
  constructor(props) {
    super(props)
    props.onRef(this)
    this.state = {
      open: false,
      ayantDroits: props.ayantDroits,
      propositionId: props.propositionId
    }
    this._courrielsModifies = []
    this.onChange = this.onChange.bind(this)
  }

  componentWillMount() {
    let _aDs = this.state.ayantDroits;
    let cpt = 0,
      taille = Object.keys(this.props.ayantDroits).length
    Object.keys(this.props.ayantDroits).forEach(rhId => {
      let _aD = AyantsDroit.ayantsDroit[rhId]      
      if (_aD) {
        let _nom =
          _aD.artistName !== ""
            ? _aD.artistName
            : `${_aD.firstName} ${_aD.lastName}`;
        _aDs[rhId] = {
          name: _nom,
          rightHolderId: _aD.rightHolderId,
          email: _aD.email
        };
        cpt = cpt + 1;
        if (cpt >= taille) {
          this.setState({ ayantDroits: _aDs });
        }
      }
    })
  }

  handleSubmit() {

    if (!this.props.onSubmit) {
      let _aDs = {}
      Object.keys(this.state.ayantDroits).forEach(elem => {
        let _aD = this.state.ayantDroits[elem]
        let __aD = {}
        if (this._courrielsModifies[elem]) {
          __aD.email = this._courrielsModifies[elem]
        } else {
          __aD.email = _aD.email
        }
        __aD.name = _aD.name
        __aD.rightHolderId = _aD.rightHolderId
        _aDs[_aD.rightHolderId] = __aD
      })
      let body = {
        proposalId: this.state.propositionId,
        rightHolders: _aDs
      }
      axios
        .post(`${config.API_URL}proposal/invite`, body)
        .then(resp => {
          this.props.close(() => {
            utils.naviguerVersSommaireOeuvre(this.props.mediaId, true)
          })
        })
        .catch(error => {
          journal.error(NOM, error);
        })
    } else {
      this.props.onSubmit()
    }
    
  }

  onChange(e) {
    this._courrielsModifies[e.target.id] = e.target.value;
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  render() {
    const t = this.props.t
    // Construction de la liste à afficher
    let ayantDroits = [];
    Object.keys(this.state.ayantDroits).forEach(elem => {
      let _aD = this.state.ayantDroits[elem]
      ayantDroits.push(
        <div key={`champ--courriel__${elem}`}>
          <Label htmlFor={`champ--courriel__${elem}`}
            style={{
              fontSize: "16px",
              background: "transparent",
              margin: "10px 0px 0px 0px"
            }}>
            {_aD.name}
          </Label>          
            <Input
              style={divEmail}
              name={`champ--courriel__${elem}`}
              id={_aD.rightHolderId}
              defaultValue={_aD.email}
              placeholder={t("flot.split.inscription.exemple")}
              required={this.state.requis}
              autoFocus={this.state.autoFocus}
              type="email"
              onChange={this.onChange}
            />            
        </div>
      )
    })
    return (
      <div>
        {ayantDroits}
      </div>
    )
  }
}

export default withTranslation()(PageAssistantSplitCourrielsCollaborateurs)
