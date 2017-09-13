const zScore = 1.96;
const zSquared = Math.pow(zScore, 2);
module.exports = (positive, total) => {
    if(!total) return 0;
    const average = positive/total;
    return average + (zSquared / (2 * total)) - zScore * Math.sqrt((average * (1 - average) + zSquared / (4 * total) / total)) / (1 + zSquared / total);
};
