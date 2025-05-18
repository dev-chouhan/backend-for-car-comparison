const nodeCache = require("node-cache");
const cache = new nodeCache({stdTTL: 3600}); // store cache for 1 hr.

module.exports = cache;