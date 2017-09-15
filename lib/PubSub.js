class PubSub {
    constructor() {
        this.subscriptions = {};
    }

    subscribe(event, callback) {

        // Check if an event was passed in
        if (!event) {
            console.error("PUBSUB: No event passed to subscribe.");
            return;
        }

        // Check if a callback was passed in
        if (!callback) {
            console.error("PUBSUB: No callback passed to subscribe.");
            return;
        }

        // Subscribe
        if (!this.subscriptions[event])
            this.subscriptions[event] = [];
        this.subscriptions[event].push(callback);
        return [event, callback];
    }

    unsubscribe(handle) {

        // Check if a handle was passed in
        if (!handle) {
            console.error("PUBSUB: No handle passed to unsubscribe.");
            return;
        }

        // Unsubscribe
        const event = handle[0];
        const callback = handle[1];
        this.subscriptions[event].forEach((thisCallback, i) => {
            if (thisCallback === callback)
                this.subscriptions[event].splice(i, 1);
        });
    }

    publish(event, data = null) {

        // Check if an event was passed in
        if (!event) {
            console.error("PUBSUB: No event passed to publish.");
            return;
        }

        // Publish
        (this.subscriptions[event] || []).forEach((callback) => {
            callback(data);
        });
    }
}

module.exports = PubSub;
