const express = require('express')
const router = express.Router()
const User = require('../models/user')
const verifyToken = require('../middleware/verify-token')

// SHOW PROFILE
router.get('/:id', verifyToken,  async (req, res) => {
    try{
        // find the user using the req.params.id
        const user = await User.findById(req.params.id)
        // if no user exist send an error message
        if(!user) throw new Error('User does not exist')

        // send back that user if we find it,
        res.status(200).json(user)

    }catch(error){
        res.status(400).json({error: error.message})
    }
})


module.exports = router