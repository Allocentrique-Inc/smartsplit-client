const check = require('check')

export default class Media {

    constructor(mediaDefinition) {
        
        // Validation des intrans
        check(mediaDefinition)
            .hasNumber('mediaId')
            .hasString('title')
            .hasString('album')
            .hasString('artist')
            .hasString('jurisdiction')
            .hasString('genre')
            .hasString('secondaryGenre')
            .hasString('lyrics')
            .hasString('creationDate')
            .hasString('modificationDate')
            .hasString('publishedDate')
            .hasString('publisher')
            .hasString('isrc')
            .hasString('upc')
            .hasString('msDuration')
            .hasBoolean('cover')
            .hasObject('lyricsLanguages')
            .hasObject('socialMediaLinks')
            .hasObject('streamingServiceLinks')
            .hasObject('pressArticleLinks')
            .hasObject('playlistLinks')
            .hasObject('rightHolders')
            .hasObject('rightsType')
            .hasObject('rightsSplit')
            .assert()

        // Construction
        this.mediaId = mediaDefinition.mediaId
        this.title = mediaDefinition.title
        this.album = mediaDefinition.album
        this.artist = mediaDefinition.artist
        this.cover = mediaDefinition.cover
        this.rightHolders = mediaDefinition.rightHolders
        this.jurisdiction = mediaDefinition.jurisdiction
        this.rightsType = mediaDefinition.rightsType
        this.genre = mediaDefinition.genre
        this.secondaryGenre = mediaDefinition.secondaryGenre
        this.lyrics = mediaDefinition.lyrics
        this.lyricsLanguages = mediaDefinition.lyricsLanguages
        this.isrc = mediaDefinition.isrc
        this.upc = mediaDefinition.upc
        this.msDuration = mediaDefinition.msDuration
        this.socialMediaLinks = mediaDefinition.socialMediaLinks
        this.streamingServiceLinks = mediaDefinition.streamingServiceLinks
        this.pressArticleLinks = mediaDefinition.pressArticleLinks
        this.playlistLinks = mediaDefinition.playlistLinks
        this.creationDate = mediaDefinition.creationDate
        this.modificationDate = mediaDefinition.modificationDate
        this.publishedDate = mediaDefinition.publishedDate
        this.publisher = mediaDefinition.publisher
        this.rightsSplit = mediaDefinition.rightsSplit
    }

    get = function() {
        return {
            mediaId: this.mediaId,
            title: this.title,
            album: this.album,
            artist: this.artist,
            cover: this.cover,
            rightHolders: this.rightHolders,
            jurisdiction: this.jurisdiction,
            rightsType: this.rightsType,
            genre: this.genre,
            secondaryGenre: this.secondaryGenre,
            lyrics: this.lyrics,
            lyricsLanguages: this.lyricsLanguages,
            isrc: this.isrc,
            upc: this.upc,
            msDuration: this.msDuration,
            socialMediaLinks: this.socialMediaLinks,
            streamingServiceLinks: this.streamingServiceLinks,
            pressArticleLinks: this.pressArticleLinks,
            playlistLinks: this.playlistLinks,
            creationDate: this.creationDate,
            modificationDate: this.modificationDate,
            publishedDate: this.publishedDate,
            publisher: this.publisher,
            rightsSplit: this.rightsSplit
        }
    }

}