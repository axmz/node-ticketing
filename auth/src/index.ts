import mongoose from 'mongoose'
import { app } from './app'

const start = async () => {
    try {
        if (!process.env.JWT_KEY) {
            throw new Error("JWT_KEY must be defined")
        }
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI must be defined")
        }

        await mongoose.connect(
            process.env.MONGO_URI,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            }
        )
    } catch (error) {
        console.log(error)
    }

    const PORT = process.env.PORT || 3000
    app.listen(PORT, () => console.log("Listening on port", PORT))
}

start()
