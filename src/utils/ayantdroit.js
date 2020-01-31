import Configuration from './configuration'
import Journalisation from  './journalisation'
import Axios from "axios"

const config = Configuration.getInstance()
const journal = Journalisation.getInstance()

const textToImage = require("text-to-image")
const NOM = "AideAyantDroit"

export default class AideAyantDroit {

    constructor() {
        this.rafraichirListe()
    }

    /**
     * Chargement des ayants-droit.
     * D'abord, il y a chargement de tous les ayants-droit depuis l'API
     * Puis, chargement des avatars de chacun.
     */
    async chargement() {        
        async function chargerAvatar(ayantDroit, fn) {
            let uuid = ayantDroit.rightHolderId,
                nom = ayantDroit.lastName,
                prenom = ayantDroit.firstName,
                nomArtiste = ayantDroit.artistName,
                dataUri
            // L'ayant-droit n'a pas d'avatar ou son avatar est l'image par défaut
            if(!ayantDroit.avatarImage || ayantDroit.avatarImage === config.AVATAR_PAR_DEFAUT) {
                let P = "", N = "", prenom = ayantDroit.firstName, nom = ayantDroit.lastName
                if (prenom && prenom.length > 0) { P = prenom.charAt(0).toUpperCase() }
                if (nom && nom.length > 0) { N = nom.charAt(0).toUpperCase() }
                dataUri = await textToImage.generate(`${P}${N}`, {maxWidth: 40})
            } else {
                // L'ayant-droit a une image d'avatar personnalisée
                dataUri = `${config.IMAGE_SRV_URL}${ayantDroit.avatarImage}`
            }
            let avatar = {nom, prenom, nomArtiste, dataUri, uuid}
            ayantDroit.avatar = avatar
            fn()
        }
        /**
         * Ordonnancement par identifiant unique dans un dictionnaire
         * et génération des avatars en représentation directe (dataUri inclus)
         * @param {*} aDs 
         */
        function ordonnerParUuidEtGenererAvatars(aDs) {
            return new Promise( (res, rej) => {
                let _aDs = {}, cpt = 0            
                aDs.forEach(ad=>{
                    // Chargement de l'avatar (nom, prénom, nom d'artiste, dataUri, uuid)
                    chargerAvatar(ad, ()=>{
                        _aDs[ad.rightHolderId] = ad
                        cpt++
                        if(cpt === aDs.length) {                            
                            res(_aDs)
                        }
                    })                    
                })
                if(aDs.length === 0) {
                    res(_aDs)
                }
            } )
        }
        // Chargement des ayant-droits
        let reponse = await Axios.get( `${config.API_URL}rightholders/`).catch(err=>journal.error(NOM, err))
        this.editeursBrut = reponse.data.filter(_aD => _aD.editeur && _aD.editeur === true)              
        this.editeurs = await ordonnerParUuidEtGenererAvatars(this.editeursBrut)
        if(this.editeursBrut.length > 0) { journal.silly(NOM, `Récupération des éditeurs terminée, nombre = ${Object.keys(this.editeurs).length}`) }
        else { journal.silly(NOM, "Aucun éditeur") }
        // Sauvegarde des données brutes (utiles par certaines fonctions qui ne
        // trient pas par identifiant unique dans un dictionnaire)
        this.ayantsDroitBrut = reponse.data.filter(_aD=> !_aD.editeur || _aD.editeur === false)
        // Classer les ayants-droits par identifiant
        this.ayantsDroit = await ordonnerParUuidEtGenererAvatars(this.ayantsDroitBrut)   
        if(this.ayantsDroitBrut.length > 0) { journal.silly(NOM, `Récupération des ayants-droit terminée, nombre = ${Object.keys(this.ayantsDroit).length}`) }
        else { journal.silly(NOM, "Aucun ayant-droit") }
    }

    static getInstance = () => {
        if(!AideAyantDroit.instance) {
            AideAyantDroit.instance = new AideAyantDroit()            
        }
        return AideAyantDroit.instance
    }

    /**
     * Formatte le nom de l'ayant-droit.
     * Si le nom d'artiste est différent de {prénom} {nom} il est
     * ajouté entre parenthèses
     * @param {*} ayantDroit l'objet représentant l'ayant-droit
     */
    affichageDuNom(ayantDroit) {
        if(ayantDroit) {
            let nom = `${ayantDroit.firstName} ${ayantDroit.lastName}`
            if(ayantDroit.artistName !== nom) {
                nom = `${nom} (${ayantDroit.artistName})`
            }
            return nom
        } else {
            journal.error(NOM, "Ayant-droit invalide")
        }
    }    

    /**
     * Retourne la listes des avatars liés aux ayants-droit d'un média
     * @param {*} ayantsDroitMedia 
     */
    genererAvatars(ayantsDroitMedia) {
        let avatars = []
        if(ayantsDroitMedia) { 
            ayantsDroitMedia.forEach(_aDm=>{
                if(this.ayantsDroit[_aDm.id]) {
                    avatars.push(this.ayantsDroit[_aDm.id].avatar)
                } else {
                    journal.error(NOM, `Aucun usager actif pour identifié par ${_aDm.id}`)
                }            
            })
        }
        return avatars
    }

    /**
     * Recharger la liste et exécuter une fonction de rappel au besoin
     */
    async rafraichirListe(fn) {
        await this.chargement()
        if(fn) { fn() }
    }

}