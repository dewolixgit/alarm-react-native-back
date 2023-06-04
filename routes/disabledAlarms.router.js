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
                return res.status(400).json({ message: 'Некорректное значение часа' })
            }

            if (!isNaturalNumber(minutes) || minutes >= 60) {
                return res.status(400).json({ message: 'Некорректное значение минут' })
            }

            if (!isOffOption(offOption)) {
                return res.status(400).json({ message: 'Некорректное значение способа выключения' })
            }

            const user = await User.findOne({ _id: req.userId });

            if (!user) {
                return res.status(400).json({ message: 'Пользователь не найден' })
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
            res.status(500).json({message: 'Что-то пошло не так'});
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
                return res.status(400).json({ message: 'Пользователь не найден' })
            }

            res.json({
                disabledAlarms: user.disabledAlarms ?? []
            });
        }
        catch (e) {
            console.log(e)
            res.status(500).json({message: 'Что-то пошло не так'});
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
                return res.status(400).json({ message: 'Некорректное значение id' })
            }

            const user = await User.findOne({ _id: req.userId });

            if (!user) {
                return res.status(400).json({ message: 'Пользователь не найден' })
            }

            const toDelete = user.disabledAlarms.id(id);

            if (!toDelete) {
                return res.status(400).json({ message: 'Запись не найдена' })
            }

            toDelete.deleteOne();

            await user.save();

            res.json({
                message: 'ok'
            });
        }
        catch (e) {
            console.log(e)
            res.status(500).json({message: 'Что-то пошло не так'});
        }
    }
);

module.exports = router;
