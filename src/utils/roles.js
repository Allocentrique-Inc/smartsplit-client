export default class AideRoles {

    static rolesEtNoms() {
        return {
            "45745c60-7b1a-11e8-9c9c-2d42b21b1a38": "principal",
            "45745c60-7b1a-11e8-9c9c-2d42b21b1a37": "accompaniment",
            "45745c60-7b1a-11e8-9c9c-2d42b21b1a40": "producer",
            "45745c60-7b1a-11e8-9c9c-2d42b21b1a41": "director",
            "45745c60-7b1a-11e8-9c9c-2d42b21b1a42": "studio",
            "45745c60-7b1a-11e8-9c9c-2d42b21b1a43": "graphist",
            "45745c60-7b1a-11e8-9c9c-2d42b21b1a32": "remixer",
            "45745c60-7b1a-11e8-9c9c-2d42b21b1a33": "songwriter",
            "45745c60-7b1a-11e8-9c9c-2d42b21b1a31": "composer",
            "45745c60-7b1a-11e8-9c9c-2d42b21b1a35": "singer",
            "45745c60-7b1a-11e8-9c9c-2d42b21b1a36": "musician"
        }
    }
    static listeRoles() {
        return Object.keys(this.rolesEtNoms())
    }
    static rolesParSousType(sousType) {
        let liste = []
        switch(sousType) {
            case "lyrics":
                liste = this.rolesParoles()
                break;
            case "music":
                liste = this.rolesMusique()
                break;
            default:
        }
        return liste
    }

    static rolesParoles() { let liste = this.listeRoles(); return [ liste[7] ] }
    static rolesMusique() { let liste = this.listeRoles(); return [ liste[6], liste[8] ] }
}