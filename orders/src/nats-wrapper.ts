import nats, { Stan } from 'node-nats-streaming'
class NatsWrapper {
    private _client?: Stan

    get client() {
        if (!this._client) {
            throw new Error('NATS is not connected')
        }

        return this._client
    }

    connect(clusterId: string, clientId: string, url: string) {
        // if (!this._client) {
            this._client = nats.connect(clusterId, clientId, { url })
        // }

        return new Promise((res, rej) => {
            this.client!.on('connect', () => {
                console.log('Connected to NATS')
                res()
            })
            this.client!.on('error', (err) => {
                rej()
            })
        }) 
    }
}

 export const natsWrapper = new NatsWrapper()
