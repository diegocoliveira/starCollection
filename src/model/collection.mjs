export default class Collection {
    constructor() {
        this.id = null;
        this.user = { id: null };
        this.funko = { id: null, name: "", category: "" };
        this.isExchange = false;
        this.createdAt = null;
        this.updatedAt = null;
        this.deletedAt = null;
    }
}
