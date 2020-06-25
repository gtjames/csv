let util = require("./listingUtils");
let listings;

listings = util.readListings();

let priciest = listings.reduce((hi, home) => home.Price > hi.Price ? home : hi );
console.log(priciest);
let cheapest = listings.reduce((hi, home) => home.Price < hi.Price ? home : hi );
console.log(cheapest);

let total = listings.reduce((tot, home) => tot + home.Price, 0 );
console.log(total);

let types = new Set(listings.map(h => h.PropType));
console.table(types);

let cities = new Set(listings.map(h => h.City));
console.table(cities);

let CedarHill = listings.filter(h => h.City == 'Rowlett');
priciest = CedarHill.reduce((hi, home) => home.Price > hi.Price ? home : hi );
console.table(priciest);

//      every()	Checks if every element in an array pass a test
//      find()	Returns the value of the first element in an array that pass a test
let OneMega = listings.find(h => h.Price > 1000000);

//some()	Checks if any of the elements in an array pass a test
let inDallas = listings.some(h => h.City == 'Dallas');
console.log(inDallas);
