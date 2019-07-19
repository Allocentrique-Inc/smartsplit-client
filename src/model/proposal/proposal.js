const check = require('check')

export default class Proposal {

    constructor(proposalDefinition) {
        
        // Validation des intrans
        check(proposalDefinition)
            // .hasString('uuid')
            .hasNumber('mediaId')
            .hasArray('comments')
            .hasObject('rightsSplits')
            .hasObject('initiator')
            .assert()

        // Construction
        // this.uuid = proposalDefinition.uuid
        this.mediaId = proposalDefinition.mediaId
        this.comments = proposalDefinition.comments 
        this.rightsSplits = proposalDefinition.rightsSplits
        this.initiator = proposalDefinition.initiator
    }

    get = function() {
        return [{
            // uuid: this.uuid,
            mediaId: this.mediaId,
            comments: this.comments,
            rightsSplits: this.rightsSplits,
            initiator: this.initiator
        }]
    }

}