const CONTEXTE_WEB = 1, CONTEXTE_NATIF = 2

export default class Utilitaires {    

    constructor(contexte) {
        this.contexte = contexte
    }

    naviguerVersSommaire(mediaId) {
        if(this.contexte === CONTEXTE_WEB) {
            window.location.href = `/oeuvre/${mediaId}/resume`
        }
        if(this.contexte === CONTEXTE_NATIF) {            
        }
    }

    naviguerVersDocumentatione(mediaId) {
        if(this.contexte === CONTEXTE_WEB) {
            window.location.href = `/documenter/${mediaId}`
        }
        if(this.contexte === CONTEXTE_NATIF) {            
        }
    }

}