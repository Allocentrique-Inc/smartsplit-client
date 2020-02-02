import Configuration from './configuration'
import Journalisation from  './journalisation'
import Axios from "axios"
import AideAyantDroit from './ayantdroit'
import Identite from './identite'

const config = Configuration.getInstance()
const journal = Journalisation.getInstance()
const AyantDroit = AideAyantDroit.getInstance()

const NOM = "AideMedia"

const apresCreation = function(usager) {
    AideMedia.instance = new AideMedia(usager)
}

export default class AideMedia {

    // Construction avec le uuid de l'ayant-droit
    constructor(uuid) {
        this.ayantDroit = AyantDroit.ayantsDroit[uuid]
    }

    static getInstance = async () => {
        if(!AideMedia.instance) {            
            let identite = await Identite.getInstance( apresCreation )
        }        
        return AideMedia.instance
    }    

}