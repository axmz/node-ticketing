import express, { Request, Response } from 'express'
import { requireAuth, validateRequest, NotFoundError } from '@axmztickets/common'
import { body } from 'express-validator'
import { Ticket } from '../models/ticket'

const router = express.Router()

router.get('/api/tickets/:id', async (req: Request, res: Response) => {
    const t = await Ticket.findById(req.params.id)
    if (!t) {
        throw new NotFoundError()
    }
    res.status(200).send(t)
})

export { router as showTicketRouter }