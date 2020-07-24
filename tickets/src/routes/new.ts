import express, { Request, Response } from 'express'
import { requireAuth, validateRequest } from '@axmztickets/common'
import { body } from 'express-validator'
import { Ticket } from '../models/ticket'

const router = express.Router()

router.post('/api/tickets', [
    body("title").not().isEmpty().withMessage('The title is invalid'),
    body("price").not().isEmpty().isFloat({gt: 0}).withMessage('The price is invalid')
], requireAuth, validateRequest, async (req: Request, res: Response) => {
    const { title, price } = req.body;

    const ticket = Ticket.build({
        title,
        price,
        userId: req.currentUser!.id
    })

    await ticket.save()

    return res.status(201).send(ticket)
})

export { router as createTicketRouter }