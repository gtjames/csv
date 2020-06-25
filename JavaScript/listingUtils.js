// include file system module
var fs = require('fs');

exports.readListings = () => {
    let listings = [];
    //var contents = fs.readFileSync(__dirname + '/files/' + file, 'utf8');
    var contents = fs.readFileSync('./dallasListings.csv', 'utf8');
    let lines = contents.split('\n');
    for (const line of lines) {
        let listing = line.split(',');
        let home = new Listing(listing);
        listings.push(home);
    }
    listings.shift();
    return listings;
}

function Listing(listing) {
    this.PropType = listing[0];
    this.Address = listing[1];
    this.City = listing[2];
    this.State = listing[3];
    this.ZIP = listing[4];
    this.Price = listing[5] | 0;
    this.Beds = listing[6] | 0;
    this.Baths = listing[7] | 0;
    this.SqFeet = listing[8] | 0;
    this.LotSize = listing[9] | 0;
    this.YearBuilt = listing[10] | 0;
    this.DaysOnMarket = listing[11] | 0;
    this.DollarsPerSqFt = listing[12] | 0;
    this.MonthlyHOA = listing[13] | 0;
    this.URL = listing[14];
}