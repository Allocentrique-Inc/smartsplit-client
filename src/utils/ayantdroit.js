export default class AideAyantDroit {
    static affichageDuNom(ayantDroit) {
        if(ayantDroit) {
            let nom = `${ayantDroit.firstName} ${ayantDroit.lastName}`
            if(ayantDroit.artistName !== nom) {
                nom = `${nom} (${ayantDroit.artistName})`
            }
            return nom
        } else {
            throw Error(`Ayant-droit invalide ${JSON.stringify(ayantDroit)}`)
        }
    }
}           