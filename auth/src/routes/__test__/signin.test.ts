import request from 'supertest'
import { app } from '../../app'

it('fails when signing up with inexistent email', async () => {
    return request(app)
        .post('/api/users/signin')
        .send({
            email: "alex@gmail.com",
            password: "alex"
        })
        .expect(400)
})

it('fails when signing up with wrong credentials', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: "alex1@gmail.com",
            password: "alex"
        })
        .expect(201)

    const response = await request(app)
        .post('/api/users/signin')
        .send({
            email: "alex1@gmail.com",
            password: "wrongpassword"
        })
        .expect(400)
})

