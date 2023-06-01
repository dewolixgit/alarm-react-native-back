const {Types} = require("mongoose");

const isValidIdString = (id) => {
    if (typeof id !== 'string') {
        return false;
    }

    try {
        new Types.ObjectId(id);
    }
    catch (e) {
        console.log(e)
        return false;
    }

    return true;
}

module.exports = isValidIdString;
