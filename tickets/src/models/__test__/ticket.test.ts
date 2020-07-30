import { Ticket } from "../ticket"

it('implements optimistic concurrency control', async (done) => {
    const ticket = Ticket.build({title: "title", price: 10, userId: "123123123"})

    await ticket.save()

    const instanceOne = await Ticket.findById(ticket.id)
    const instanceTwo = await Ticket.findById(ticket.id)

    instanceOne!.set({price: 1000})
    instanceTwo!.set({price: 2000})

    await instanceOne?.save()

    try {
        await instanceTwo?.save() // this should error
    } catch (error) {
        return done()
    }

    throw new Error('should not reach this point')
})

it('increments the version number on multiple saves', async () => {
  const ticket = Ticket.build({
    title: 'concert',
    price: 20,
    userId: '123',
  });

  await ticket.save();
  expect(ticket.version).toEqual(0);
  await ticket.save();
  expect(ticket.version).toEqual(1);
  await ticket.save();
  expect(ticket.version).toEqual(2);
});
