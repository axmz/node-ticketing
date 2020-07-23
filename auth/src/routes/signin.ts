import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import { validateRequest } from '@axmztickets/common';
import { User } from '../models/user';
import { BadRequestError } from '@axmztickets/common';
import jwt from 'jsonwebtoken'
import { Password } from '../services/password';

const router = express.Router();

router.post('/api/users/signin', [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").trim().notEmpty().withMessage("Password should be supplied")
], validateRequest, async (req: Request, res: Response) => {
    const { email, password } = req.body
    const existingUser = await User.findOne({ email })

    if (!existingUser) {
        throw new BadRequestError("Invalid credentials")
    }

    const passwordsMatch = await Password.compare(existingUser.password, password)
    if (!passwordsMatch) {
        throw new BadRequestError("Invalid credentials")
    }

    const userJwt = jwt.sign({
        id: existingUser.id,
        email,
    }, process.env.JWT_KEY!)

    req.session = {
        jwt: userJwt
    }

    res.status(200).send(existingUser)
})

export { router as signInRouter } 
