import moment from 'moment'
const check = require('check')

export default class Oeuvre {

    constructor(mediaDefinition) {
        
        // Validation des intrans
        check(mediaDefinition)
            // .hasNumber('mediaId')
            .hasString('title')
            .hasString('album')
            .hasString('artist')
            .hasString('genre')
            .hasString('secondaryGenre')
            .hasString('lyrics')
            .hasString('creationDate')
            .hasString('modificationDate')
            .hasString('publishDate')
            .hasString('publisher')
            .hasString('isrc')
            .hasString('upc')
            .hasString('msDuration')
            .hasString('cover')
            .hasArray('inLanguages')
            .hasObject('socialMediaLinks')
            .hasObject('streamingServiceLinks')
            .hasObject('pressArticleLinks')
            .hasObject('playlistLinks')
            .hasObject('s3Etag')
            .assert()

        // Construction
        // this.mediaId = mediaDefinition.mediaId
        this.title = mediaDefinition.title !== "" ? mediaDefinition.title : "Vierge"
        this.album = mediaDefinition.album !== "" ? mediaDefinition.album : "Vierge"
        this.artist = mediaDefinition.artist !== "" ? mediaDefinition.artist : "Vierge"
        this.cover = mediaDefinition.cover
<<<<<<< HEAD
        this.genre = mediaDefinition.genre
        this.secondaryGenre = mediaDefinition.secondaryGenre
        this.lyrics = mediaDefinition.lyrics
        this.inLanguages = mediaDefinition.inLanguages
        this.isrc = mediaDefinition.isrc
        this.upc = mediaDefinition.upc
        this.msDuration = mediaDefinition.msDuration
        this.socialMediaLinks = mediaDefinition.socialMediaLinks
        this.streamingServiceLinks = mediaDefinition.streamingServiceLinks
        this.pressArticleLinks = mediaDefinition.pressArticleLinks
        this.playlistLinks = mediaDefinition.playlistLinks
        this.creationDate = mediaDefinition.creationDate
        this.modificationDate = mediaDefinition.modificationDate
        this.publishDate = mediaDefinition.publishDate
        this.publisher = mediaDefinition.publisher
        this.s3Etag = mediaDefinition.s3Etag
=======
        this.rightHolders = mediaDefinition.rightHolders.length > 0 ? mediaDefinition.rightHolders : {}
        this.jurisdiction = mediaDefinition.jurisdiction !== "" ? mediaDefinition.jurisdiction : "Vierge"
        this.rightsType = mediaDefinition.rightsType.length > 0 ? mediaDefinition.rightsType : {}
        this.genre = mediaDefinition.genre !== "" ? mediaDefinition.genre : "Vierge"
        this.secondaryGenre = mediaDefinition.secondaryGenre !== "" ? mediaDefinition.secondaryGenre : "Vierge"
        this.lyrics = mediaDefinition.lyrics !== "" ? mediaDefinition.lyrics : "Vierge"
        this.inLanguages = mediaDefinition.inLanguages.length > 0 ? mediaDefinition.inLanguages : ['Mandarin', 'Instrumental']
        this.isrc = mediaDefinition.isrc !== "" ? mediaDefinition.isrc : "Vierge"
        this.upc = mediaDefinition.upc !== "" ? mediaDefinition.upc : "Vierge"
        this.msDuration = mediaDefinition.msDuration !== "" ? mediaDefinition.msDuration : "Vierge"
        this.socialMediaLinks = mediaDefinition.socialMediaLinks.length > 0 ? mediaDefinition.socialMediaLinks : {facebook: "https://facebook.com/ex", twitter: "https://twitter.com/ex", youtube: "https://youtube.com/ex"}
        this.streamingServiceLinks = mediaDefinition.streamingServiceLinks.length > 0 ? mediaDefinition.streamingServiceLinks : {spotify: "https://open.spotify.com/track/asdgj4qhfasd", apple: "https://twitter.com/ex"}
        this.pressArticleLinks = mediaDefinition.pressArticleLinks.length > 0 ? mediaDefinition.pressArticleLinks : {medium: "https://medium.com/ex", metro: "https://metro.ca/ex"}
        this.playlistLinks = mediaDefinition.playlistLinks.length > 0 ? mediaDefinition.playlistLinks : {spotify: "https://open.spotify.com/playlist/37i9dQZEVXbKfIuOAZrk7G", youtube: "https://www.youtube.com/playlist?list=PLgzTt0k8mXzEk586ze4BjvDXR7c-TUSnx"}
        this.creationDate = mediaDefinition.creationDate !== "" ? mediaDefinition.creationDate : moment.utc().format()
        this.modificationDate = mediaDefinition.modificationDate !== "" ? mediaDefinition.modificationDate : moment.utc().format()
        this.publishDate = mediaDefinition.publishDate !== "" ? mediaDefinition.publishDate : moment.utc().format()
        this.publisher = mediaDefinition.publisher !== "" ? mediaDefinition.publisher : "Vierge"
        this.rightsSplit = mediaDefinition.rightsSplit.length > 0 ? mediaDefinition.rightsSplit : {}
>>>>>>> master
    }

    get = function() {
        return [{
            // mediaId: this.mediaId,
            title: this.title,
            album: this.album,
            artist: this.artist,
            cover: this.cover,
            genre: this.genre,
            secondaryGenre: this.secondaryGenre,
            lyrics: this.lyrics,
            inLanguages: this.inLanguages,
            isrc: this.isrc,
            upc: this.upc,
            msDuration: this.msDuration,
            socialMediaLinks: this.socialMediaLinks,
            streamingServiceLinks: this.streamingServiceLinks,
            pressArticleLinks: this.pressArticleLinks,
            playlistLinks: this.playlistLinks,
            creationDate: this.creationDate,
            modificationDate: this.modificationDate,
            publishDate: this.publishDate,
            publisher: this.publisher,
            s3Etag: this.s3Etag
        }]
    }

}