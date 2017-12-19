class Listeners {

    constructor() {
        this.list = {};
    }

    create(messageName, id, cb) {
        if (!this.list[messageName]) {
            this.list[messageName] = {};
        }
        this.list[messageName][id] = cb;
    }

    destroy(messageName, id) {
        delete this.list[messageName][id];
    }

    fire(messageName, args) {
        Object.values(this.list[messageName]).forEach((v) => v(args));
    }

}

class MessageBus {

    constructor() {
        this.listeners = new Listeners();
    }

    subscribe(messageName, id, cb, once) {
        this.listeners.create(messageName, id, cb);

        if (once) {
            this.unsubscribe(messageName, id);
        }
    }

    once(messageName, id, cb) {
        this.subscribe(messageName, id, cb, true);
    }

    unsubscribe(messageName, id) {
        this.listeners.destroy(messageName, id);
    }

    broadcast(messageName, args) {
        this.listeners.fire(messageName, args);
    }
}

export default new MessageBus();
