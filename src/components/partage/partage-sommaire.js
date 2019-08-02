import React, { Component } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import Beignet from '../visualisation/partage/beignet'
import { Translation } from 'react-i18next';

const ROLES = [
        "principal",
        "accompaniment",
        "producer",
        "director",
        "studio",
        "graphist",
        "arranger",
        "songwriter",
        "composer",
        "singer",
        "musicien"
    ]

class SommaireDroit extends Component {

    constructor(props){
        super(props)
        this.state = {
            parts: props.parts,
            titre: props.titre,
            icone: props.icon,
            donnees: []
        }
    }

    componentWillMount() {
        this.organiserDonnees()
    }

    organiserDonnees() {
        let _p = this.state.parts
        let _aD = {} // Structure résumé de l'ayant-droit
        Object.keys(_p).forEach(_e=>{
            _p[_e].forEach(__e=>{
                
                // Ajoute une structure d'ayant-droit si non existante
                if(!_aD[__e.rightHolder.rightHolderId]) {
                    _aD[__e.rightHolder.rightHolderId] = { roles: [], sommePct: 0.0000 }
                }
                
                let _donnees = _aD[__e.rightHolder.rightHolderId]
                _donnees.nom = __e.rightHolder.name
                _donnees.vote = __e.voteStatus                
                _donnees.sommePct = (parseFloat(_donnees.sommePct) + parseFloat(__e.splitPct)).toFixed(4)
                
                // Les rôles dépendent du type de droit

                function ajouterRolesReconnus (roles) {
                    Object.keys(roles).forEach(_roleId=>{
                        if(ROLES.includes(roles[_roleId]) && !_donnees.roles.includes(roles[_roleId])) {
                            _donnees.roles.push(roles[_roleId])
                        }
                    })
                }

                switch(_e) {
                    case "principal":
                        _donnees.roles.push('principal')
                        ajouterRolesReconnus(__e.contributorRole)
                        break;
                    case "accompaniment":
                        _donnees.roles.push('accompaniment')
                        ajouterRolesReconnus(__e.contributorRole)
                        break;
                    case "lyrics":
                        ajouterRolesReconnus(__e.contributorRole)
                        break;
                    case "music":
                        ajouterRolesReconnus(__e.contributorRole)
                        break;
                    case "split":
                        ajouterRolesReconnus(__e.contributorRole)
                        break;
                    default:
                }                            

            })
        })
        this.setState({donnees: _aD})
    }

    render() {

        let _parts = []
        let _data = []        

        Object.keys(this.state.donnees).forEach(uuid=>{
            let part = this.state.donnees[uuid]
            _data.push({nom: part.nom, pourcent: part.sommePct})            
            _parts.push( (
                <div key={`part_${uuid}`}>
                    <div className="field">
                        <i className="user outline icon big"></i>
                    </div>
                    <div className="seven wide field">
                        <p className="big">
                            {part.nom}
                        </p>
                        <p>
                            { part.roles.map((_e, idx)=>{
                                return `${_e}${idx === part.roles.length - 1 ? '' : ', '}`
                            })}
                        </p>
                    </div>
                    <div className="three wide field">
                        <p className="big">
                            {parseFloat(part.sommePct).toFixed(2)} %
                        </p>
                        <p>
                            {part.vote}
                        </p>
                    </div>

                    <p/>
                    <hr/>
                    <p/>
                </div>
            ))
        })

        return (
            <div className="fields">
                <h2>{this.state.titre}</h2>
                <div className="eleven wide field">
                    {_parts}
                </div>
                <div className="seven wide field">
                    <Beignet uuid={`beignt_${this.state.titre}`} data={_data} />
                </div>
            </div>
        )
    }

}

export default class SommairePartage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            uuid: props.uuid
        }
    }

    componentWillMount() {
        this.rafraichirDonnees()
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.uuid !== nextProps.uuid) {
            this.setState({uuid: nextProps.uuid}, ()=>{
                this.rafraichirDonnees()
            })
        }
    }

    rafraichirDonnees() {
        axios.get(`http://api.smartsplit.org:8080/v1/proposal/${this.state.uuid}`)
        .then(res=>{
            this.setState({proposition: res.data.Item})
        })
        .catch(err=>{
            toast.error(err)
        })
    }

    render() {

        let droits = []

        if(this.state.proposition) {
            Object.keys(this.state.proposition.rightsSplits).forEach(elem=>{
                droits.push( <SommaireDroit 
                                key={`sommaire_${elem}`}
                                parts={this.state.proposition.rightsSplits[elem]}
                                titre={elem}
                                icone={undefined}                                
                                /> )
            })
        }        

        return (
            <div>
                {droits}
            </div>            
        )
    }
}