export default class Musician {
    constructor(data) {
        this.uuid = data.uuid || '';
        this.type = data.type || '';
        this.roles = data.roles || [];
    }
}
