const express = require('express');
const cors = require('cors');
const router = express.Router();
const User = require('../models/user');
const { encryptPassword, validatePassword } = require('../Services/authentication');



router.use(express.json());
router.use(cors());


router.post('/login', async (req, res) => {
    const { email, password } = req.body
    const LoggedUser = await User.find({ email: email })

    if (LoggedUser.length > 0) {
        try {
            const validatedPassword = await validatePassword(password, LoggedUser[0].password)
            if (validatedPassword) {
                res.status(200).json({ message: "Login Successfully" });
            }
            else {
                res.status(401).json({ message: "Invalid Password" });
            }
        }
        catch (err) {
            res.status(500).json({ message: `Error during login: ${err.message}` });
        }
    }
    else {
        res.status(500).json({ message: "No such User Found" })
    }
})


router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    if (await User.findOne({ email: email })) {
        return res.status(409).send("User already Registered");
    }
    else {
        try {
            const hashedPassword = await encryptPassword(password)
            const result = await User.create({
                name,
                email,
                password: hashedPassword,
            })
            res.status(201).json({ message: "Registered Successfully" });
        }
        catch (err) {
            res.status(500).send(`Failed to Register: ${err.message}`);
        }

    }

})


module.exports = router;