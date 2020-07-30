import mongoose from 'mongoose'
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

interface TicketAttrs {
    title: string,
    price: number,
    userId: string
}

interface TicketDoc extends mongoose.Document {
    title: string,
    price: number,
    userId: string
    createdAt: string,
    updatedAt: string,
    version: number
}

interface TicketModel extends mongoose.Model<TicketDoc> {
    build: (u: TicketAttrs) => TicketDoc;
}

const ticketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
},
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id
                delete ret._id
                delete ret.__v
            }
        }
    }
)


ticketSchema.statics.build = (t: TicketAttrs) => {
    return new Ticket(t)
}

ticketSchema.set('versionKey', 'version')
ticketSchema.plugin(updateIfCurrentPlugin)

const Ticket = mongoose.model<TicketDoc, TicketModel>("Ticket", ticketSchema)

export { Ticket }