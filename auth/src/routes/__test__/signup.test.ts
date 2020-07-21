import request from 'supertest'
import {app} from '../../app'

it('returns 201 on signup', async () => {
    return request(app)
    .post('/api/users/signup')
    .send({
        email: "alex@gmail.com",
        password: "alex"
    })
    .expect(201)
})

it("disallows duplicate emails on signup", async () => {
    await request(app)
    .post('/api/users/signup')
    .send({
        email: "uniqueemail@gmail.com",
        password: "unique"
    })
    .expect(201)

    await request(app)
    .post('/api/users/signup')
    .send({
        email: "uniqueemail@gmail.com",
        password: "unique"
    })
    .expect(400)
})

it("sets cookies on signup", async () => {
    const response = await request(app)
    .post('/api/users/signup')
    .send({
        email: "uniqueemail1@gmail.com",
        password: "unique"
    })
    .expect(201)

    expect(response.get("Set-Cookie")).toBeDefined()
})