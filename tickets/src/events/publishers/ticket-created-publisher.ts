import {Publisher, TicketCreatedEvent, Subjects} from '@axmztickets/common'

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
    subject: Subjects.TicketCreated = Subjects.TicketCreated
}