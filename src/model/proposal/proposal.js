const check = require('check')

export default class Proposal {

    constructor(proposalDefinition) {
        
        // Validation des intrans
        check(proposalDefinition)
            // .hasString('uuid')
            .hasNumber('mediaId')
            .hasArray('comments')
            .hasObject('rightsSplits')
            .hasString('initiatorUuid')
            .hasString('initiatorName')
            .assert()

        // Construction
        // this.uuid = proposalDefinition.uuid
        this.mediaId = proposalDefinition.mediaId
        this.comments = proposalDefinition.comments 
        this.rightsSplits = proposalDefinition.rightsSplits
        this.initiatorUuid = proposalDefinition.initiatorUuid
        this.initiatorName = proposalDefinition.initiatorName
    }

    get = function() {
        return [{
            // uuid: this.uuid,
            mediaId: this.mediaId,
            comments: this.comments,
            rightsSplits: this.rightsSplits,
            initiatorUuid: this.initiatorUuid,
            initiatorName: this.initiatorName
        }]
    }

}