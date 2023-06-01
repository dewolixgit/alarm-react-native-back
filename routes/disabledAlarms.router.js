const { Router } = require('express');
const authMiddleware = require("../middlewares/auth.middleware");
const isNaturalNumber = require("../utils/isNaturalNumber");
const isOffOption = require("../utils/isOffOption");
const User = require("../models/User");
const isValidIdString = require("../utils/isValidIdString");

const router = Router();

// /api/disabledAlarms/add
router.post(
    '/add',
    authMiddleware,
    async (req, res) => {
        try {
            const { hours, minutes, offOption } = req.body;

            if (!isNaturalNumber(hours) || hours >= 24) {
                return res.status(400).json({ message: 'Incorrect hours field' })
            }

            if (!isNaturalNumber(minutes) || minutes >= 60) {
                return res.status(400).json({ message: 'Incorrect minutes field' })
            }

            if (!isOffOption(offOption)) {
                return res.status(400).json({ message: 'Incorrect offOption field' })
            }

            const user = await User.findOne({ _id: req.userId });

            if (!user) {
                return res.status(400).json({ message: 'There is no user with the requested id' })
            }

            user.disabledAlarms.push({
                hours,
                minutes,
                offOption
            });

            await user.save();

            res.json({
                message: 'ok'
            });
        }
        catch (e) {
            console.log(e)
            res.status(500).json({message: 'Something has gone wrong'});
        }
    }
);

// /api/disabledAlarms/getAll
router.get(
    '/getAll',
    authMiddleware,
    async (req, res) => {
        try {
            const user = await User.findOne({ _id: req.userId });

            if (!user) {
                return res.status(400).json({ message: 'There is no user with the requested id' })
            }

            res.json({
                disabledAlarms: user.disabledAlarms ?? []
            });
        }
        catch (e) {
            console.log(e)
            res.status(500).json({message: 'Something has gone wrong'});
        }
    }
);

// /api/disabledAlarms/delete
router.post(
    '/delete',
    authMiddleware,
    async (req, res) => {
        try {
            const { id } = req.body;

            if (!isValidIdString(id)) {
                return res.status(400).json({ message: 'Incorrect id field' })
            }

            const user = await User.findOne({ _id: req.userId });

            if (!user) {
                return res.status(400).json({ message: 'There is no user with the requested id' })
            }

            const toDelete = user.disabledAlarms.id(id);

            if (!toDelete) {
                return res.status(400).json({ message: 'There is no disabled alarm with the requested id' })
            }

            toDelete.deleteOne();

            await user.save();

            res.json({
                message: 'ok'
            });
        }
        catch (e) {
            console.log(e)
            res.status(500).json({message: 'Something has gone wrong'});
        }
    }
);

module.exports = router;
