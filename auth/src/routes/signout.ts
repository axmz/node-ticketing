import express from 'express'
// import { requireAuth } from '../middleware/require-auth'; // are these required?
// import { currentUser } from '../middleware/current-user'; // are these required?

const router = express.Router();

router.post(
    '/api/users/signout',
    // currentUser,
    // requireAuth,
    (req, res) => {
        req.session = null

        res.send({})
    })

export { router as signOutRouter } 
