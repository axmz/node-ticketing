import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import { signUpRouter, signInRouter, signOutRouter, currentUserRouter } from './routes'
import { errorHandler } from './middleware/error-handler'
import { NotFoundError } from './errors/not-found-error'
import cookieSession from 'cookie-session'

const app = express()
app.set("trust proxy", true)

app.use(json())
app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test"
}))

app.use(currentUserRouter)
app.use(signInRouter)
app.use(signUpRouter)
app.use(signOutRouter)
app.all("*", async () => { throw new NotFoundError() })

app.use(errorHandler)

export {app}