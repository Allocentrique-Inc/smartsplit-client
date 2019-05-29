const check = require('check')

export default class Media {

    constructor(mediaDefinition) {
        
        // Validation des intrans
        check(mediaDefinition)
            .hasNumber('mediaId')
            .hasString('title')
            .hasString('album')
            .hasString('description')
            .hasString('jurisdiction')
            .hasString('genre')
            .hasString('creationDate')
            .hasString('modificationDate')
            .hasString('publishedDate')
            .hasString('publisher')
            .hasBoolean('cover')
            .hasObject('rightHolders')
            .hasObject('rightsType')
            .hasObject('split')
            .assert()

        // Construction
        this.mediaId = mediaDefinition.mediaId
        this.title = mediaDefinition.title
        this.album = mediaDefinition.album
        this.description = mediaDefinition.description
        this.cover = mediaDefinition.cover
        this.rightHolders = mediaDefinition.rightHolders
        this.jurisdiction = mediaDefinition.jurisdiction
        this.rightsType = mediaDefinition.rightsType
        this.genre = mediaDefinition.genre
        this.creationDate = mediaDefinition.creationDate
        this.modificationDate = mediaDefinition.modificationDate
        this.publishedDate = mediaDefinition.publishedDate
        this.publisher = mediaDefinition.publisher
        this.split = mediaDefinition.split
    }

    get = function() {
        return {
            mediaId: this.mediaId,
            title: this.title,
            album: this.album,
            description: this.description,
            cover: this.cover,
            rightHolders: this.rightHolders,
            jurisdiction: this.jurisdiction,
            rightsType: this.rightsType,
            genre: this.genre,
            creationDate: this.creationDate,
            modificationDate: this.modificationDate,
            publishedDate: this.publishedDate,
            publisher: this.publisher,
            split: this.split
        }
    }

}