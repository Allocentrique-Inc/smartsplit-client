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

    naviguerVersDocumentation(mediaId) {
        if(this.contexte === CONTEXTE_WEB) {
            window.location.href = `/documenter/${mediaId}`
        }
        if(this.contexte === CONTEXTE_NATIF) {            
        }
    }

    naviguerVersPoursuivreDocumentation(uuid) {
        if(this.contexte === CONTEXTE_WEB) {
            window.location.href = `/partager/existant/${uuid}`
        }
        if(this.contexte === CONTEXTE_NATIF) {            
        }
    }

    naviguerVersEnvoyerAuxCollaborateurs(mediaId) {
        if(this.contexte === CONTEXTE_WEB) {
            window.location.href = `/partager/${mediaId}/envoyer`
        }
        if(this.contexte === CONTEXTE_NATIF) {            
        }
    }

    naviguerVersSommairePartage(mediaId) {
        if(this.contexte === CONTEXTE_WEB) {
            window.location.href = `/partager/${mediaId}`
        }
        if(this.contexte === CONTEXTE_NATIF) {            
        }
    }

    naviguerVersNouveauPartage(mediaId) {        
        if(this.contexte === CONTEXTE_WEB) {
            window.location.href = `/partager/nouveau/${mediaId}`
        }
        if(this.contexte === CONTEXTE_NATIF) {            
        }
    }

}