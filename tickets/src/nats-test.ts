// import natsWrapper from './nats-wrapper'
// const natsWrapper = require('./nats-wrapper')

// const stan = natsWrapper.client

// console.log({ stan })


import nats, { Stan } from 'node-nats-streaming'
import {TicketCreatedPublisher} from './events/publishers/ticket-created-publisher'


const stan = nats.connect('ticketing', 'client', {url: 'http://localhost:4222'})

stan.on('connect', async () => {
    
      const publisher = new TicketCreatedPublisher(stan);
      try {
        await publisher.publish({
          id: '123',
          title: 'concert',
          price: 20,
          userId: 'amz'
        });
        console.log('published')
      } catch (err) {
        console.error(err);
      }
  console.log('Publisher connected to NATS');
})

stan.publish('subject', 'data')