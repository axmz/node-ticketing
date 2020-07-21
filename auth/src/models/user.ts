import mongoose from 'mongoose'
import { Password } from '../services/password'

interface UserAttr {
    email: string,
    password: string
}

interface UserModel extends mongoose.Model<UserDoc> {
    build: (u: UserAttr) => UserDoc;
}

interface UserDoc extends mongoose.Document {
    email: string,
    password: string,
    createdAt: string,
    updatedAt: string
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
},
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id
                delete ret._id
                delete ret.__v
                delete ret.password
            }
        }
    }
)

userSchema.pre('save', async function (done) {
    if (this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'))
        this.set('password', hashed)
    }
    done();
})

userSchema.statics.build = (u: UserAttr) => {
    return new User(u)
}

const User = mongoose.model<UserDoc, UserModel>("User", userSchema)

export { User }