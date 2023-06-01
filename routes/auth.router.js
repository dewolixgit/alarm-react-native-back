const { Router } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');

const router = Router();

// /api/auth/register
router.post(
    '/register',
    [
        check('email', 'Incorrect email').isEmail(),
        check('password', 'Minimal length of a password is six symbols')
            .isLength({min: 6}),
    ],
    async(req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    message: errors.array()[0].msg
                })
            }

            const {email, password} = req.body;

            const candidate = await User.findOne({email});

            if (candidate) {
                return res.status(400).json({message: 'User already exists'});
            }

            const hashedPassword = await bcrypt.hash(password, 12);
            const user = new User({
                email,
                password: hashedPassword,
                disabledAlarms: [],
            });

            await user.save();

            res.status(201).json({ message: 'User has been created' });
        } catch (e) {
            res.status(500).json({message: 'Something has gone wrong'});
        }
    });

// /api/auth/login
router.post(
    '/login',
    [
        check('email', 'Incorrect email').normalizeEmail().isEmail(),
        check('password', 'Incorrect password').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect authorization data'
                })
            }

            const {email, password} = req.body;

            const user = await User.findOne({email});

            if (!user) {
                return res.status(400).json({message: 'User not found'});
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({message: 'Incorrect password or email'});
            }

            const token = jwt.sign(
                {
                    userId: user.id
                },
                process.env.JWT_SECRET,
            );

            res.json({token, userId: user.id});

        } catch (e) {
            res.status(500).json({message: 'Something has gone wrong'});
        }
    });

module.exports = router;
