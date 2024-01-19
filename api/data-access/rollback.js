export class RollbackSequence {
    constructor() {
        this.stack = [];
    }
    add(fn) {
        if (typeof fn === "function") {
            this.stack.push(fn);
        }
    }
    async undo() {
        while (this.stack.length > 0) {
            try {
                await this.stack.pop()();
            } catch (err) {
                console.log(err);
            }
        }
    }
}