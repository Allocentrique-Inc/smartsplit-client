const CONTEXTE_WEB = "1", CONTEXTE_NATIF = "2"

export default class Utilitaires {
    constructor(contexte) {
        this.contexte = contexte
    }

    nav(url) {
        this.history.push(url)
    }

    naviguerVersAccueil() {
        if(this.contexte === CONTEXTE_WEB) {
            this.nav(`/accueil`)
        }
        if(this.contexte === CONTEXTE_NATIF) {            
        }
    }

    naviguerVersSommaire(mediaId) {
        if(this.contexte === CONTEXTE_WEB) {
            this.nav(`/oeuvre/${mediaId}/resume`)
        }
        if(this.contexte === CONTEXTE_NATIF) {            
        }
    }

    naviguerVersSommaireOeuvre(mediaId, invitationsEnvoyees = false) {
        if(this.contexte === CONTEXTE_WEB) {            
            this.nav(`/oeuvre/sommaire/${mediaId}${ invitationsEnvoyees ? "?i=1" : "" }`)
        }
        if(this.contexte === CONTEXTE_NATIF) {            
        }
    }    

    naviguerVersDocumentation(mediaId) {
        if(this.contexte === CONTEXTE_WEB) {
            this.nav(`/documenter/${mediaId}`)
        }
        if(this.contexte === CONTEXTE_NATIF) {            
        }
    }

    naviguerVersPoursuivreDocumentation(uuid) {
        if(this.contexte === CONTEXTE_WEB) {
            this.nav(`/partager/existant/${uuid}`)
        }
        if(this.contexte === CONTEXTE_NATIF) {            
        }
    }

    naviguerVersEnvoyerAuxCollaborateurs(mediaId) {
        if(this.contexte === CONTEXTE_WEB) {
            this.nav(`/partager/${mediaId}/envoyer`)
        }
        if(this.contexte === CONTEXTE_NATIF) {            
        }
    }

    naviguerVersEditerProposition(uuid, pageNo) {
        if(this.contexte === CONTEXTE_WEB) {
            this.nav(`/editer-partage/${uuid}/${pageNo}`)
        }
        if(this.contexte === CONTEXTE_NATIF) {            
        }
    }

    naviguerVersSommairePartage(mediaId) {
        if(this.contexte === CONTEXTE_WEB) {
            this.nav(`/partager/${mediaId}`)
        }
        if(this.contexte === CONTEXTE_NATIF) {            
        }
    }

    naviguerVersNouveauPartage(mediaId) {        
        if(this.contexte === CONTEXTE_WEB) {
            this.nav(`/partager/nouveau/${mediaId}`)
        }
        if(this.contexte === CONTEXTE_NATIF) {            
        }
    }

    naviguerVersPoursuivrePartage(uuid) {
        if(this.contexte === CONTEXTE_WEB) {
            this.nav(`/partager/existant/${uuid}`)
        }
        if(this.contexte === CONTEXTE_NATIF) {            
        }        
    }

    naviguerVersPartageEditeur(mediaId) {        
        if(this.contexte === CONTEXTE_WEB) {
            this.nav(`/partager/editeur/${mediaId}`)
        }
        if(this.contexte === CONTEXTE_NATIF) {            
        }
    }
    
}
