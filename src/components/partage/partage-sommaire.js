import React, { Component } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import Beignet from '../visualisation/partage/beignet'
import { Translation } from 'react-i18next';

import avatar from '../../assets/images/elliot.jpg'

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

const ROLES_NAMES = {
        "principal":"Principal",
        "accompaniment":"Accompaniment",
        "producer":"Producer",
        "director":"Director",
        "studio":"Studio",
        "graphist":"Graphist",
        "arranger":"Arranger",
        "songwriter":"Songwriter",
        "composer":"Composer",
        "singer":"Singer",
        "musicien":"Musicien"
    }

const TYPE_SPLIT = ['workCopyrightSplit', 'performanceNeighboringRightSplit', 'masterNeighboringRightSplit']

const TITRES = {
    workCopyrightSplit: "Droits d'auteur", 
    performanceNeighboringRightSplit: "Interprétation", 
    masterNeighboringRightSplit: "Enregistrement sonore"
}

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
        let titre = TITRES[this.state.titre]       

        Object.keys(this.state.donnees).forEach(uuid=>{
            let part = this.state.donnees[uuid]
            _data.push({nom: part.nom, pourcent: part.sommePct})            
            _parts.push(
                <div key={`part_${uuid}`}>
                <div className="ui grid">
                <div className="ui row">
                    <div className="ui two wide column">
                        <div className="holder-name">
                            <img className="ui spaced avatar image" src={avatar}/>
                        </div>
                    </div>
                    <div className="ui ten wide column">
                        <div className="holder-name">
                            {part.nom}
                        </div>
                        <div className="small-400-color">
                            { part.roles.map((_e, idx)=>{
                                return ROLES_NAMES[_e]+`${idx === part.roles.length - 1 ? '' : ', '}`
                            })}
                        </div>
                    </div>
                    <div className="ui three wide column">
                        <p className="big">
                            {parseFloat(part.sommePct).toFixed(2)} %
                        </p>
                        <p>
                            {part.vote}
                        </p>
                    </div>
                </div>
                </div>
                    <hr/>
                </div>
            )
        })

        return (
            <div className="ui segment">
                <div className="wizard-title">{titre}</div>
                <br/><br/>
                <div className="ui grid">
                    <div className="ui row">
                        <div className="ui one wide column">
                        </div>
                        <div className="ui seven wide column">
                            {_parts}
                        </div>
                        <div className="ui five wide column">
                            <Beignet uuid={`beignt_${this.state.titre}`} data={_data} />
                        </div>
                        <div className="ui one wide column">
                        </div>
                    </div>
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
            Object.keys(this.state.proposition.rightsSplits).forEach(key=>{
                //console.log("Object key: "+key)
            })
        })
        .catch(err=>{
            toast.error(err)
        })
    }

    render() {

        let droits = []

        if(this.state.proposition) {
            TYPE_SPLIT.forEach(type=>{
                droits.push( <SommaireDroit 
                                key={`sommaire_${type}`}
                                parts={this.state.proposition.rightsSplits[type]}
                                titre={type}
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