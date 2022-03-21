let util = require("./listingUtils");
let listings;

listings = util.readListings();

let numbers = [12,42,67,70,67,21,38,97,105,11];
let num = numbers.filter(n => n < 65);
let numLength = num.length;
let numAvg = num.reduce(function (avg, value, _, { length }) { return avg + value / length; }, 0);
let bigNum = num.reduce(function(a, b) {return Math.max(a, b);});
let smallNum = num.reduce(function(a, b) {return Math.min(a, b);});


var jsonexample = {
    firstName: 'Eric',
    lastName: 'Couch',
    age: 46,
    fullName : function() {
        return this.firstName + ' ' + this.lastName;
    },
    cars:[{ make: 'Ford', 
           model: 'F-150', 
        year: 2017, 
        color: 'black',
        engine: {	size: '5.0', 
             cylinders: 8 } },
       {	make: 'Ford', 
     model: 'Mustang', 
     year: 2016, 
     color: 'black',
     engine: {size: '5.0', 
         cylinders: 8 } }]
 }
console.log(jsonexample.fullName());
let garlandHomes = listings.filter(h => h.City == 'Garland');
let averagePrice = garlandHomes.reduce((total,v) => total + v.Price,0);
let avg = averagePrice / garlandHomes.length;
console.table(avg);

let sevens = numbers.filter(n => n % 7 == 0);
sevens.forEach(n => console.log(n));
let sum = numbers.reduce((tot,n) => tot + n)
let under65 = numbers.filter(n => n < 65);
let smallest = under65.reduce((min, n) => n < min ? n : min)

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
let expensiveHomeRowlett = listings.find(p => p.Price >= 1000000);
console.table(expensiveHomeRowlett);
//      every()	Checks if every element in an array pass a test
//      find()	Returns the value of the first element in an array that pass a test
let OneMega = listings.find(h => h.Price > 1000000);

//some()	Checks if any of the elements in an array pass a test
let inDallas = listings.some(h => h.City == 'Dallas');
console.log(inDallas);
