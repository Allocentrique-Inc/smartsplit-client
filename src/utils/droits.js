import AideRoles from "./roles";
// eslint-disable-next-line
import { journal } from '../utils/application'

const PAROLES = "lyrics", 
      MUSIQUE = "music",
      AUTEUR = "workCopyrightSplit"      
// eslint-disable-next-line
const NOM = "AideDroits"

export default class AideDroits {

  constructor(){
    this.PAROLES = PAROLES
    this.MUSIQUE = MUSIQUE
  }

  droitAuteur() {
    return AUTEUR
  }

  nomSousTypeParoles() {
    return PAROLES
  }
  
  nomSousTypeMusique() {
    return MUSIQUE
  }
  
  arborescenceDroits() {
    return {
      workCopyrightSplit: [
        this.nomSousTypeParoles(),
        this.nomSousTypeMusique()
      ],
      performanceNeighboringRightSplit: ["accompaniment", "principal"],
      masterNeighboringRightSplit: ["split"]
    };
  }
  
  listeSousType(droit) {
    return this.arborescenceDroits()[droit];
  }
  
  listeDroits() {
    return Object.keys(this.arborescenceDroits());
  }
  
  donneesVisualisation(_p) {
    // Retourner les données de visualisation, par ayant-droit
    let _aD = {}
    let ROLES = AideRoles.listeRoles()
    Object.keys(_p).forEach(_e => {
      _p[_e].forEach(__e => {
        // Ajoute une structure d'ayant-droit si non existante
        if (!_aD[__e.rightHolder.rightHolderId]) {
          _aD[__e.rightHolder.rightHolderId] = { roles: [], sommePct: 0.0 };
        }

        let _donnees = _aD[__e.rightHolder.rightHolderId]
        _donnees.nom = __e.rightHolder.name
        _donnees.vote = __e.voteStatus
        _donnees.raison = __e.comment
        _donnees.color = __e.rightHolder.color
        _donnees.rightHolderId = __e.rightHolder.rightHolderId
        _donnees.sommePct = (
          parseFloat(_donnees.sommePct) + parseFloat(__e.splitPct)
        ).toFixed(4)

        // Les rôles dépendent du type de droit
        function ajouterRolesReconnus(roles) {
          Object.keys(roles).forEach(_roleId => {
            if (
              ROLES.includes(_roleId) &&
              !_donnees.roles.includes(roles[_roleId])
            ) {
              _donnees.roles.push(roles[_roleId])
            }
          })
        }
        switch (_e) {
          case "principal":
            _donnees.roles.push("principal");
            ajouterRolesReconnus(__e.contributorRole);
            break;
          case "accompaniment":
            _donnees.roles.push("accompaniment");
            ajouterRolesReconnus(__e.contributorRole);
            break;
          case "lyrics":
            ajouterRolesReconnus(__e.contributorRole);
            break;
          case "music":
            ajouterRolesReconnus(__e.contributorRole);
            break;
          case "split":
            ajouterRolesReconnus(__e.contributorRole);
            break;
          default:
        }
      })
    })
    return _aD
  }

  donneesVisualisationParType(_p, type, ayantsDroit) {
    // Structure finale de retour, données par sous-type de droit
    let donnees = {};
    let sousTypes = this.listeSousType(type);
    sousTypes.forEach(_sType => {
      let roles = AideRoles.rolesParSousType(_sType);
      // Retourner les données de visualisation, par ayant-droit
      let _aD = [];
      Object.keys(_p).forEach(_e => {
        _p[_e].forEach(__e => {
          // Traitement seulement si l'individu a un des rôles désirés pour le sous-type de droit
          let aRole = false;
          Object.keys(__e.contributorRole).forEach(_r => {
            if (roles.includes(_r)) {
              aRole = true;
            }
          });
          if (aRole) {
            // Ajoute une structure d'ayant-droit si non existante
            let _donnees = {};
            _donnees.nom = __e.rightHolder.name;
            _donnees.vote = __e.voteStatus;
            _donnees.raison = __e.comment;
            _donnees.color = __e.rightHolder.color;
            _donnees.ayantDroit = ayantsDroit[__e.rightHolder.rightHolderId];
            _donnees.pourcent = parseFloat(__e.splitPct).toFixed(4);
            _donnees.roles = Object.keys(__e.contributorRole);
            _aD.push(_donnees);
          }
        });
      });
      donnees[_sType] = _aD;
    });
    return donnees;
  }

}
