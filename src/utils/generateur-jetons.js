import jwt from 'jsonwebtoken'

export default class GenerateurJeton {
    
    constructor() {
        this.secret = "secretTrèsSecret"
    }

    // Génère un jeton JSON Web Token associant un split avec un ayant droit
    genererJetonVotation(splitId, rightHolderId) {
        // Délai d'expiration
        const EXPIRATION = "7 days"
        let jeton = jwt.sign(
            {
                data: {splitId: splitId, rightHolderId: rightHolderId}                
            },
            this.secret,
            {expiresIn: EXPIRATION}
        )

        return jeton
    }

    decoder(jeton) {
        try {
            let contenu = jwt.verify(jeton, this.secret)
            return contenu.data
        } catch(err) {
            throw err
        }     
    }
}