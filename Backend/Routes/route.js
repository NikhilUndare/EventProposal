const express = require('express');
const router = express.Router();
const User = require('../Models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
require('dotenv').config()


// for creating a new user 
router.post('/createuser', async (req, res) => {
    try {

        const salt = await bcrypt.genSalt(10);
        const securePassword = await bcrypt.hash(req.body.password, salt);


        await User.create({
            name: req.body.name,
            email: req.body.email,
            contact: req.body.contact,
            password: securePassword
        })
        res.json({ success: true })
    } catch (error) {
        console.log(error)
        res.json({ message: error.message })
    }
});

// login for existing user

router.post('/login', async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    const contact = req.body.contact
    try {
        let userdata
        if (email) {
            userdata = await User.findOne({ email })
            if (!userdata) {
                return res.status(400).json({ error: "User does not exist" });
            }
        } else {
            userdata = await User.findOne({ contact })
            if (!userdata) {
                return res.status(400).json({ error: "User does not exist" });
            }
        }

        const pwdCompare = bcrypt.compareSync(password, userdata.password)

        if (!pwdCompare) {
            return res.status(400).json({ errors: "Try logging with correct credentials" });
        }

        const data = {
            user: {
                id: userdata.id
            }
        }

        const authToken = jwt.sign(data, process.env.SECRET_CODE)
        return res.json({ success: true, authToken })
    } catch (error) {
        console.log(error)
        res.json({ message: error.message })
    }
})


module.exports = router;