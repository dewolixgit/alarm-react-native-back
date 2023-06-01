const isNaturalNumber = (v) =>
    typeof v === 'number'
    && !isNaN(Number(v))
    && v > 0
    && v - Math.trunc(v) === 0;

module.exports = isNaturalNumber;
