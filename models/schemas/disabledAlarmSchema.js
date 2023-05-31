const { Schema } = require('mongoose');

const disabledAlarmSchema = new Schema({
    hours: {
        type: Number,
        required: true,
    },

    minutes: {
        type: Number,
        required: true,
    },

    offOption: {
        type: String,
        required: true,
    },
});

module.exports = disabledAlarmSchema;
