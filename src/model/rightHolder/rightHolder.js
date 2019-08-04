const check = require('check')

export default class RightHolder {

    constructor(rightHolderDefinition) {
        
        // Validation des intrans
        check(rightHolderDefinition)
            .hasString('firstName')
            .hasString('lastName')
            .hasString('email')
            .hasString('jurisdiction')
            .hasString('ipi')
            .hasString('wallet')
            .hasString('avatarS3Etag')
            .hasString('artistName')
            .hasObject('socialMediaLinks')
            .assert()

        // Construction
        this.firstName = rightHolderDefinition.firstName 
        this.lastName = rightHolderDefinition.lastName
        this.email = rightHolderDefinition.email
        this.jurisdiction = rightHolderDefinition.jurisdiction
        this.ipi = rightHolderDefinition.ipi
        this.wallet = rightHolderDefinition.wallet
        this.avatarS3Etag = rightHolderDefinition.avatarS3Etag
        this.artistName = rightHolderDefinition.artistName
        this.socialMediaLinks = rightHolderDefinition.socialMediaLinks
    }

    get = function() {
        return [{
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            jurisdiction: this.jurisdiction,
            ipi: this.ipi,
            wallet: this.wallet,
            avatarS3Etag: this.avatarS3Etag,
            artistName: this.artistName,
            socialMediaLinks: this.socialMediaLinks,
        }]
    }

}