import request from 'supertest'
import { app } from '../../app'
import { Ticket } from '../../models/ticket'
import {natsWrapper} from '../../nats-wrapper'

it('has a route handler for /api/tickets', async () => {
    const response = await request(app).post('/api/tickets/').send({})
    expect(response.status).not.toEqual(404)
})

it("returns 401 when user is not authenticated", async () => {
    const response = await request(app).post('/api/tickets/').send({}).expect(401)
})

it("accepts only authenticated users", async () => {
    const response = await request(app).post('/api/tickets/').set('Cookie', global.signin()).send({
        title: "valid title",
        price: 10
    }).expect(201)
})

it("errors when invalid title is provided", async () => {
    await request(app).post('/api/tickets').set('Cookie', global.signin()).send({ title: "", price: 10 }).expect(400)
    await request(app).post('/api/tickets').set('Cookie', global.signin()).send({ price: 10 }).expect(400)
})

it("errors when invalid price is provided", async () => {
    await request(app).post('/api/tickets').set('Cookie', global.signin()).send({ title: "valid title", price: -10 }).expect(400)
    await request(app).post('/api/tickets').set('Cookie', global.signin()).send({ title: "valid title" }).expect(400)
})

it("saves ticket data in db and returns it to the client", async () => {
    let tickets = await Ticket.find({})
    expect(tickets.length).toEqual(0)

    const title = 'valid title'
    const price = 10
    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({ title, price })
        .expect(201)

    tickets = await Ticket.find({})
    expect(tickets[0].title).toEqual(title)
    expect(tickets[0].price).toEqual(price)
})

it('publishes an event', async () => {
  const title = 'asldkfj';

  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title,
      price: 20,
    })
    .expect(201);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});