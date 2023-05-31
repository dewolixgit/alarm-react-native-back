const { Schema } = require('mongoose');
const disabledAlarmSchema = require("./disabledAlarmSchema");

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

    disabledAlarms: {
        type: [disabledAlarmSchema],
        default: undefined
    }
});

module.exports = userSchema;
