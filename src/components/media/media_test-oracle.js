
class MediaTestOracle {
    constructor() {
        // Retour d'une structure valide statique
        this.MEDIA_STRUCTURE_VALIDE = () => {
            return {
                mediaId: 123,
                title: 'Titre test valide',
                album: 'Album test valide',
                description: 'Description test valide',
                jurisdiction: 'Juridiction test valide',
                genre: 'Genre test valide',
                creationDate: '2019-01-01T15:53:00',
                modificationDate: '2019-01-01T15:53:00',
                publishedDate: '2019-01-01T15:53:00',
                publisher: 'Diffuser test valide',
                cover: true,
                rightHolders: [
                    {
                        nom: 'Ayant-droit 1',
                        type: 'Type ayant-droit 1'
                    },
                    {
                        nom: 'Ayant-droit 2',
                        type: 'Type ayant-droit 2'
                    },
                    {
                        nom: 'Ayant-droit 3',
                        type: 'Type ayant-droit 3'
                    }                
                ],
                rightsType: {
                    description: 'Type des droit valide',
                    actif: true
                },
                split: [
                    {
                        nom: 'Ayant-droit 1',
                        percentage: 33.3333
                    },
                    {
                        nom: 'Ayant-droit 2',
                        percentage: 33.3333
                    },
                    {
                        nom: 'Ayant-droit 3',
                        percentage: 33.3333
                    }
                ]
            }            
        }
        
        this.MEDIA_STRUCTURE_INVALIDE = {
            
        }
        
        this.MEDIA_STRUCTURE_VALIDE_SPLIT_INVALIDE = {
        
        }
    }
}

export const MediaOracle = new MediaTestOracle