import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const router = express.Router();
import { body, validationResult } from 'express-validator';
import User from '../models/User.js';
import fetchuser from '../middleware/fetchuser.js';
const JWT_SECRET = "izanahmad8";

//signup
router.post('/signup', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 8 characters').isLength({ min: 8 })
]
    , async (req, res) => {
        let success = false;
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ result: result.array() });
        }
        try {
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ success, error: "sorry a user with this email is already exists" });
            }
            const salt = await bcrypt.genSalt(10);
            const secPassWord = await bcrypt.hash(req.body.password, salt);
            user = await User.create({
                name: req.body.name,
                password: secPassWord,
                email: req.body.email
            })
            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET);
            success = true;
            //res.json({ success, authToken });
        }
        catch (error) {
            console.error(error.message);
            res.status(500).send("Internal server error");
        }
    })

//login
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password should not be blank').exists()
]
    , async (req, res) => {
        let success = false;
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ result: result.array() });
        }
        const { email, password } = req.body;
        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ success, error: "Please try to login with correct credential" });
            }
            const passCompare = await bcrypt.compare(password, user.password);
            if (!passCompare) {
                return res.status(400).json({ success, error: "please try to login with correct credential" });
            }
            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET);
            success = true;
            //res.json({ success, authToken });
        }
        catch (error) {
            console.error(error.message);
            res.status(500).send("Internal server error");
        }
    })


//getuser

router.post('/getuser', fetchuser
    , async (req, res) => {
        try {
            const userId = req.user.id;
            const user = await User.findById(userId).select("-password");
            res.send(user);
        }
        catch (error) {
            console.error(error.message);
            res.status(500).send("Internal server error");
        }
    })


export default router;
