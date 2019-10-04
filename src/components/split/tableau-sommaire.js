import React, {Component} from 'react'
import { confirmAlert } from 'react-confirm-alert'
// CSS
import 'react-confirm-alert/src/react-confirm-alert.css'
import axios from 'axios'
import Login from '../auth/Login'

import { toast } from 'react-toastify'

import { Translation, withTranslation } from 'react-i18next';

const DROITS = {
    auteur: 'workCopyrightSplit', 
    interpretation: 'performanceNeighboringRightSplit', 
    enregistrement: 'masterNeighboringRightSplit'
}

class TableauSommaireSplit extends Component {

    constructor(props){
        super(props)

        this.state = {
            jeton: this.props.jeton,            
            jetonAPI: this.props.jetonAPI, // Le jeton encodé
            votes: this.props.votes,
            transmis: false,
            voteClos: false,
            modifierVote: {
                workCopyrightSplit: {music: false, lyrics: false},
                performanceNeighboringRightSplit: {principal: false, accompaniment: false},
                masterNeighboringRightSplit: {split: false}
            }
        }
       
        this.boutonAccepter = this.boutonAccepter.bind(this)
        this.boutonRefuser = this.boutonRefuser.bind(this)
        this.changerVote = this.changerVote.bind(this)
        this.activerBoutonVote = this.activerBoutonVote.bind(this)
        this.estVoteTermine = this.estVoteTermine.bind(this)

        this.genererAffichage = this.genererAffichage.bind(this)        
        this.preEnvoi = this.preEnvoi.bind(this)        
        this.transmettre = this.transmettre.bind(this)        

    }

    componentWillMount() {
        if(this.state.jeton) {
            this.majListeVotes()
        }
    }

    majListeVotes() {

        // Construction de la structure des données
        let rightHolders = {}
        let rights = this.props.droits ? this.props.droits : {}

        // Calcul des droits et ayants-droits
        let proposal, propositionId
        let sommaire = {}
        
        if (this.props.jeton) {            
            propositionId = this.props.jeton.proposalId     
            // Récupère la prposition
            axios.get(`http://api.smartsplit.org:8080/v1/proposal/${propositionId}`)
            .then((res)=>{
                proposal = res.data.Item
                
                this.setState({voteClos: this.estVoteClos()})

                function extraireDroit (famille, type, partages) {
                    if(partages) {
                        partages.forEach(part=>{
                            let _r = part.rightHolder
                            if(!rightHolders[_r.rightHolderId]) {
                                rightHolders[_r.rightHolderId] = _r
                            }
    
                            if(!rights[famille]) {
                                rights[famille] = {}
                            }
    
                            if (!rights[famille][type]) {
                                rights[famille][type] = []
                            }
    
                            rights[famille][type].push(part)
    
                            // Ajout dans le sommaire
                            if(!sommaire[_r.rightHolderId]) {
                                sommaire[_r.rightHolderId] = { nom: rightHolders[_r.rightHolderId].name, droits: {} }
                            }
                            if(!sommaire[_r.rightHolderId].droits[famille]) {
                                sommaire[_r.rightHolderId].droits[famille] = {}
                            }
                            if (_r.uuid === proposal.initiator.id) {
                                sommaire[_r.rightHolderId].droits[famille][type] = "accept"
                            } else {
                                sommaire[_r.rightHolderId].droits[famille][type] = "active"
                            }
                        })
                    }                    
                }

                // Extraire les différents ayant-droits et ordonnancement dans un tableau
                Object.keys(DROITS).forEach(type=>{
                    if(!rights[DROITS[type]]) {
                        rights[DROITS[type]] = {}
                    }                    
                    if(proposal.rightsSplits[DROITS[type]]) {
                        let familleDroit = proposal.rightsSplits[DROITS[type]]
                        switch(DROITS[type]) {
                            case DROITS.auteur:
                                // musique
                                extraireDroit(DROITS[type], 'music', familleDroit.music)
                                // paroles
                                extraireDroit(DROITS[type], 'lyrics', familleDroit.lyrics)
                                break;
                            case DROITS.interpretation:
                                // principal
                                extraireDroit(DROITS[type], 'principal', familleDroit.principal)                                
                                // accompagnement
                                extraireDroit(DROITS[type], 'accompaniment', familleDroit.accompaniment)
                                break
                            case DROITS.enregistrement:
                                // split
                                extraireDroit(DROITS[type], 'split', familleDroit.split)
                                break
                            default:
                                // split
                                extraireDroit(DROITS[type], 'split', familleDroit.split)
                                break
                        }                                      
                    }
                })

                this.setState({sommaire: sommaire})
                this.setState({droits: rights})
                this.setState({proposition: proposal})
                               
                 // Récupère le titre du média
                axios.get(`http://api.smartsplit.org:8080/v1/media/${proposal.mediaId}`)
                .then(res=>{
                    let media = res.data.Item
                    this.setState({mediaTitle: media.title})
                })
                .catch((error) => {
                    toast.error(error)
                    
                })              
            })
            .catch((error) => {
                toast.error(error)                
            })
        }      
    }

    activerBoutonVote() {
        this.setState({
            transmission: true
        })
    }

    componentWillReceiveProps(nextProps) {     
        if(this.state.jeton !== nextProps.jeton) {
            this.setState({jeton: nextProps.jeton})
        }
        if(this.state.jetonAPI !== nextProps.jetonAPI) {
            this.setState({jetonAPI: nextProps.jetonAPI})
        }
    }

    justifierRefus(fn) {
        confirmAlert({
            title: `Tu refuses la proposition !`,
            message: `Es-tu certain ?`,
            closeOnClickOutside: false,
            style: {
                    position: "relative",
                    width: "640px",
                    height: "660px",
                    margin: "0 auto",
                    background: "#FFFFFF",
                    border: "1px solid rgba(0, 0, 0, 0.5)",
                    boxSizing: "border-box",
                    boxShadow: "inset 0px -1px 0px #DCDFE1"
                },
            customUI: ({ onClose }) => 
                <div>         
                    <h3>{t("flot.split.documente-ton-oeuvre.proposition.pourquoi")}</h3>               
                    <textarea 
                        cols={40} 
                        rows={5} 
                        id="raison"
                        placeholder={t("flot.split.documente-ton-oeuvre.proposition.refuse")} 
                        style={{
                        width: "546px",
                        height: "253px",
                        left: "436px",
                        top: "429px",                              
                        background: "#FFFFFF",
                        border: "1px solid rgba(0, 0, 0, 0.5)",
                        boxSizing: "border-box",
                        boxShadow: "inset 0px -1px 0px #DCDFE1"
                    }}></textarea><p/>
                    <button style={{
                        background: "rgb(45, 168, 79)",
                        borderRadius: "2px",
                        width: "100%",                                
                        fontWeight: "bold",
                        fontSize: "1.2rem"
                    }}
                    onClick={()=>{
                        // Justifier le refus
                        let refus = {
                            userId: `${this.state.jeton.rightHolderId}`, // Temporaire le temps de connecter le système d'identités
                            jeton: this.state.jetonAPI,
                            raison: document.getElementById('raison').value
                        }                                                                
                
                        axios.post('http://api.smartsplit.org:8080/v1/proposal/justifier-refus', refus)
                        .catch(err=>{console.log(err)})
                        .then(()=>{
                            fn()                            
                        })
                        .catch((error) => {
                            toast.error(error)
                            
                        })

                        }                                
                    }
                    >{t("flot.split.documente-ton-oeuvre.proposition.refuse2")}</button>
                </div>
        })        
    }

    droitsPourUtilisateurCourant() {
        let _id = this.state.jeton.rightHolderId
        let _d = this.state.sommaire[_id].droits        
        return {
            workCopyrightSplit: _d.workCopyrightSplit,
            performanceNeighboringRightSplit: _d.performanceNeighboringRightSplit,
            masterNeighboringRightSplit: _d.masterNeighboringRightSplit
        }
    }

    preEnvoi() {
        let _d = this.droitsPourUtilisateurCourant()
        let contientRefus = false
        Object.keys(_d).forEach(d => {
            if(_d[d]) {
                Object.keys(_d[d]).forEach(__d=>{
                    if(_d[d][__d] !== 'accept') {
                        contientRefus = true
                    }
                })
            }            
        })
        if(contientRefus) {
            this.justifierRefus(()=>{this.transmettre()})
        } else {
            this.transmettre()
        }
    }

    transmettre() {

        // Détection de l'identité ...        

        if(!this.props.auth.isAuthenticated()) {
            confirmAlert({
                title: this.props.t(`connexion`),
                message: this.props.t(`connecter`),
                closeOnClickOutside: false,
                style: {
                        position: "relative",
                        width: "640px",
                        height: "660px",
                        margin: "0 auto",
                        background: "#FFFFFF",
                        border: "1px solid rgba(0, 0, 0, 0.5)",
                        boxSizing: "border-box",
                        boxShadow: "inset 0px -1px 0px #DCDFE1"
                    },
                customUI: ({ onClose }) => 
                    <div>         
                        <Login auth={this.props.auth} fn={()=>{
                            let body = {
                                userId: `${this.state.jeton.rightHolderId}`,
                                droits: this.droitsPourUtilisateurCourant(),
                                jeton: this.state.jetonAPI
                            }
                    
                            axios.post('http://api.smartsplit.org:8080/v1/proposal/voter', body)
                            .then(()=>{
                                this.majListeVotes()
                            })
                            .catch((error) => {
                                toast.error(error)                                
                            })

                            onClose()
                        }} />
                </div>
            })       
        }
        
    }

    voter(droit, type, choix) {        
        let _etat = choix ? 'accept' : 'reject'
        let droits = this.state.droits
        let partages = droits[droit][type]
        partages.forEach((elem, idx)=>{
            if(elem.rightHolder.rightHolderId === this.state.jeton.rightHolderId) {
                elem.voteStatus = choix ? 'accept': 'reject'
                partages[idx] = elem
            }
        })
        droits[droit][type] = partages
        this.setState({droits: droits})
        let _m = this.state.modifierVote
        _m[droit][type] = false
        this.setState({modifierVote: _m})
        let sommaire = this.state.sommaire
        sommaire[this.state.jeton.rightHolderId].droits[droit][type] = _etat
    }

    boutonAccepter (droit, type) {
        return this.state.jeton && (
            <i className="thumbs up outline icon huge green" style={{cursor: "pointer"}} onClick={()=>{
                this.voter(droit, type, true)
                if(this.estVoteTermine()) {
                    this.activerBoutonVote()
                }
            }}></i>
        )
    }

    boutonRefuser (droit, type) {   
        return this.state.jeton && (
            <i className="thumbs down outline icon big red" style={{cursor: "pointer"}} onClick={()=>{                
                this.voter(droit, type, false)
                if(this.estVoteTermine()) {
                    this.activerBoutonVote()
                }
            }}></i>
        )
    }

    genererAffichage(droits, type, sousDroit, voteClos) {        

        // Générer l'affichage pour chaque droit
        // Doit gérer les partitions en sous-droits        
        let proposition = this.state.proposition
        let estInitiateur = false
        let elementsAffichage = []

        if(droits && proposition) {                    

            estInitiateur = (proposition.initiator.id === this.state.jeton.rightHolderId)

            // Affichage des boutons de votation
            let aVote = false, // A déjà voté ?            
                peutVoter = true,
                controleModification = false

            function getTextePourEtat(etat) {
                if(etat === "accept") {
                    etat = (<span style={{color: "green"}}>{this.props.t(`flot.split.etat.ACCEPTE`)}</span>)
                } else if(etat === "reject") {
                    etat = (<span style={{color: "red"}}>{this.props.t(`flot.split.etat.REFUSE`)}</span>)
                } else {
                    etat = (<span style={{color: "grey"}}>{this.props.t(`flot.split.etat.ATTENTE`)}</span>)
                }
                return etat
            }

            Object.keys(droits).forEach(_d=>{
                let voterPour, 
                    voterContre,
                    etat

                let droit = droits[_d]                
                etat = droit.voteStatus

                if(droit.rightHolder.rightHolderId === this.state.jeton.rightHolderId) {  // Est l'utilisateur enregistré
                
                    if ( 
                        etat === 'active' // Vote pour la première fois
                        || // ou
                        this.state.modifierVote[type][sousDroit] === true) { // Modifie son vote
                            voterPour = ( !voteClos && this.boutonAccepter(type, sousDroit))
                            voterContre = ( !voteClos && this.boutonRefuser(type, sousDroit))
                        }
                    aVote = (etat === 'accept' || etat === 'reject')

                    if (!voteClos && aVote && !this.state.modifierVote[type][sousDroit] && !estInitiateur && !this.estVoteFinal()) {
                        controleModification = (!this.state.modifierVote[type][sousDroit] && 
                            (<i className="pencil alternate icon big blue" style={{cursor: "pointer"}} onClick={()=>{this.changerVote(type, sousDroit)}}></i>))
                    }                    

                    etat = getTextePourEtat(etat)

                    elementsAffichage.push( (
                        <div key={`droit_${droit.rightHolder.name}_${droit}_${type}`}>
                            {droit.rightHolder.name} : {parseInt(droit.splitPct).toFixed(2)}% {voterPour} {voterContre} {etat} {peutVoter && controleModification}
                        </div>)
                    )

                } else {
                    
                    etat = getTextePourEtat(etat)

                    elementsAffichage.push( (
                        <div key={`droit_${droit.rightHolder.name}_${droit}_${type}`}>
                            {droit.rightHolder.name} : {parseInt(droit.splitPct).toFixed(2)}% {etat}
                        </div>) 
                    )
                }

            })            

            return (
                <td>
                    <h3>{sousDroit}</h3>
                    {elementsAffichage}
                </td>
            )
        } else {
            return (<td></td>)
        }        
    }

    changerVote (droit, sousDroit) {
        let _m = this.state.modifierVote
        _m[droit][sousDroit] = true
        this.setState({modifierVote: _m})        
    }

    afficherSommaire() {
        let proposition = this.state.proposition
        let _d = Object.keys(this.state.sommaire).map((elem)=>{
            let _r = this.state.sommaire[elem]
            let droits = _r.droits
            let droitsAuteur = []
            Object.keys(droits[DROITS.auteur]).forEach(droit=>{
                let __d = droits[DROITS.auteur][droit]
                droitsAuteur.push((<span>{`${__d}`}</span>))
            })
            return (
                <tr key={`tab_sommaire--${elem}`}>
                    <td>{_r.nom}</td>
                    <td>{_r.droits[DROITS.auteur]}</td>
                    <td>{_r.droits[DROITS.interpretation]}</td>
                    <td>{_r.droits[DROITS.enregistrement]}</td>
                    <td>{proposition.comments[this.state.jeton.rightHolderId]}</td>
                </tr>
            )
        })

        return (
            <Translation>
                    {
                         t => 
            <div>               
                <h3>{t("flot.split.sommaire.resultat")}</h3>
                <table style={{width: "auto"}}>
                    <thead>
                        <tr>
                            <th>{t("oeuvre.attribut.indication.etiquette.ayantDroit")}</th>
                            <th><i className="copyright outline icon"></i></th>
                            <th><i className="star outline icon"></i></th>
                            <th><i className="product hunt icon"></i></th>
                            <th>{t("oeuvre.attribut.indication.etiquette.ayantDroit")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {_d}
                    </tbody>
                </table>
            </div>
            }
            </Translation> 
        )
    }

    rafraichir () {
        if(!this.state.rafraichissement) {
            this.setState({rafraichissement: true},
                ()=>{
                    setInterval(()=>{                
                        this.majListeVotes()
                    }, 5000)
                }
            )
        }        
    }

    estVoteClos() {
        // Détecte si le vote est clos pour cet utilisateur (s'il a déjà voté  il ne peut plus voter)
        let termine = false
        let proposition = this.state.proposition

        if(proposition) {
            termine = true
            Object.keys(proposition.rightsSplits).forEach(famille=>{
                Object.keys(proposition.rightsSplits[famille]).forEach(type=>{
                    proposition.rightsSplits[famille][type].forEach(partage=>{
                        if(partage.rightHolder.rightHolderId === this.state.jeton.rightHolderId && partage.voteStatus === 'active') {
                            termine = false
                        }
                    })                                        
                })                
            })            
        } 

        return termine
    }

    estVoteTermine() {
            
        // Détecte si le vote est terminé pour l'usager en cours (s'il a donné un choix pour tous les droits)
        let termine = false

        if(this.state.sommaire && this.state.jeton) {
            termine = true
            let sommaire = this.state.sommaire[this.state.jeton.rightHolderId]
            Object.keys(sommaire.droits).forEach((_s)=>{                
                Object.keys(sommaire.droits[_s]).forEach(__s=>{
                    if(
                        sommaire.droits[_s][__s] !== 'accept' &&
                        sommaire.droits[_s][__s] !== 'reject'
                    ) {
                        termine = false
                    }
                })                
            })
        } 
        
        return termine
    }

    estVoteFinal() {
        // Détecte si le vote est terminé pour tous
        let termine = false
        let proposition = this.state.proposition

        if(proposition) {
            termine = true
            Object.keys(proposition.rightsSplits).forEach(famille=>{
                Object.keys(proposition.rightsSplits[famille]).forEach(type=>{
                    proposition.rightsSplits[famille][type].forEach(partage=>{
                        if(partage.voteStatus === 'active') {
                            termine = false
                        }
                    })                                        
                })                
            })            
        } 

        return termine
    }

    render() {

        // Déclaration des structures de tri pour l'affichage

        let titre, voteClos = false
        let droitAuteur, droitInterpretation, droitEnregistrement
        let tableau = []      

        droitAuteur = []
        droitInterpretation = []
        droitEnregistrement = []

        // Assignation des variables

        let _initiateur
        if(this.state.proposition) {
            titre = this.state.mediaTitle
            _initiateur = this.state.proposition.initiator.id === this.state.jeton.rightHolderId
        }

        // Vérifie si le vote est clos pour l'usager (s'il a voté pour tout)                


        // STRUCTURE DU TABLEAU D'AFFICHAGE
        if(this.state.droits) {

            voteClos = this.state.voteClos

            if(this.state.droits[DROITS.auteur]) {
                Object.keys(this.state.droits[DROITS.auteur]).forEach((elem) => {
                    let _e = this.state.droits[DROITS.auteur][elem]
                    if(_e) {
                        droitAuteur.push(this.genererAffichage(_e, DROITS.auteur, elem, voteClos))
                    }
                })
            }            
    
            if(this.state.droits[DROITS.interpretation]) {
                Object.keys(this.state.droits[DROITS.interpretation]).forEach((elem) => {
                    let _e = this.state.droits[DROITS.interpretation][elem]
                    if(_e) {
                        droitInterpretation.push(this.genererAffichage(_e, DROITS.interpretation, elem, voteClos))
                    }
                })
            }
        
            if(this.state.droits[DROITS.enregistrement]) {
                Object.keys(this.state.droits[DROITS.enregistrement]).forEach((elem) => {
                    let _e = this.state.droits[DROITS.enregistrement][elem]
                    if(_e) {
                        droitEnregistrement.push(this.genererAffichage(_e, DROITS.enregistrement, elem, voteClos))
                    }
                })
            }            
    
            let tailleMax = Math.max(droitAuteur.length, droitInterpretation.length, droitEnregistrement.length)            
                
            for(let i = 0; i < tailleMax; i++) {
                tableau.push(
                    <tr key={`tableau--rang--${i}`}>                        
                        {droitAuteur[i] || <td></td>}
                        {droitInterpretation[i] || <td></td>}
                        {droitEnregistrement[i] || <td></td>}
                    </tr>
                )
            }

            // Si l'utilisateur ne peut pas voter et que le vote n'est pas terminé, rafraichissement de l'écran
            // à chaque 5 secondes

            if(voteClos && !this.estVoteFinal()) {
                this.rafraichir()
            }
        }        

        return (
            <Translation>
                 {
                     t =>
            <div>
                <div className="heading1">{titre}</div>
                <table width="100%">
                    <thead>
                        <tr>
                            {droitAuteur.length > 0 && (<th><i className="copyright outline icon huge"></i></th>)}
                            {droitInterpretation.length > 0 && (<th><i className="star outline icon huge"></i></th>)}
                            {droitEnregistrement.length > 0 && (<th><i className="product hunt icon huge"></i></th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {tableau}
                    </tbody>
                </table>
                {(!voteClos && !_initiateur && !this.props.init) && (
                    <div>                    
                        <button disabled={!this.state.transmission} onClick={()=>{
                            this.preEnvoi()
                        }}> t{('flot.bouton.voter')}
                        </button>
                    </div>
                )}                
                {(this.estVoteFinal() && !this.props.init) && (
                    <div>
                        <div className="heading1">t{('flot.split.documente-ton-oeuvre.proposition.termine')}</div>
                        {/*this.state.droits && this.afficherSommaire()*/}
                    </div>
                )}
            </div>
                 }
                 </Translation>            
        )                           
    }
}

export default withTranslation()(TableauSommaireSplit)