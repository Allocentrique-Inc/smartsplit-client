const check = require('check')

export default class RightHolder {

    constructor(rightHolderDefinition) {
        
        // Validation des intrans
        check(rightHolderDefinition)
            .hasString('firstName')
            .hasString('lastName')
            .hasString('email')
            .hasString('password')
            .hasString('jurisdiction')
            .hasString('ipi')
            .hasString('wallet')
            .hasString('avatarS3Etag')
            .hasString('artistName')
            .hasString('cognitoId')
            .hasObject('socialMediaLinks')
            .assert()

        // Construction
        this.firstName = rightHolderDefinition.firstName 
        this.lastName = rightHolderDefinition.lastName
        this.email = rightHolderDefinition.email
        this.password = rightHolderDefinition.password
        this.jurisdiction = rightHolderDefinition.jurisdiction
        this.ipi = rightHolderDefinition.ipi
        this.wallet = rightHolderDefinition.wallet
        this.avatarS3Etag = rightHolderDefinition.avatarS3Etag
        this.artistName = rightHolderDefinition.artistName
        this.cognitoId = rightHolderDefinition.cognitoId
        this.socialMediaLinks = rightHolderDefinition.socialMediaLinks
    }

    get = function() {
        return [{
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password,
            jurisdiction: this.jurisdiction,
            ipi: this.ipi,
            wallet: this.wallet,
            avatarS3Etag: this.avatarS3Etag,
            artistName: this.artistName,
            cognitoId: this.cognitoId,
            socialMediaLinks: this.socialMediaLinks,
        }]
    }

}