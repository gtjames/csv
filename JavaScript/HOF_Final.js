let util = require("./listingUtils");
let listings;

listings = util.readListings();

let homesInAddison = listings.filter(h => h.City == 'Addison');
console.table(homesInAddison);
