export default class SelectOption {
    constructor(data) {
        this.key = data.key || data.value || null;
        this.value = data.value || null;
        this.text = data.text || '';
    }
}
