const {ALARM_OFF_OPTIONS} = require("../config/alarms");

const isOffOption = (v) =>
    v === ALARM_OFF_OPTIONS.math
    || v === ALARM_OFF_OPTIONS.gesture
    || v === ALARM_OFF_OPTIONS.shake;

module.exports = isOffOption;
