const fs = require('fs');

const passengers = require('c:/Projects/csv/titanic.json');

//passengers = readPassengerList();

//  How many people were on the Titanic?
console.log(`Titanic passenger/crew count: ${passengers.length}`);

//  we are going to use several High Order Functions
//      FILTER - return EVERY attribute from a JSON array but only SOME of the rows    
//      MAP    - return a row for EVERY item in the JSON array but only SOME of the attributes
//      REDUCE - return a ONE piece of information for the JSON array (total of a col, longest/shortest string)

//------------------------------------------------------------------------------------------------
//
//  let's start off with filter
//
//------------------------------------------------------------------------------------------------
//      a list for survivors
var survivors = passengers.filter(p => p.survivor);
console.log(`Titanic Survivors count: ${survivors.length}`);

//      a list for Crew members
var crewMembers = passengers.filter(p => !p.passenger);
console.log(`Titanic Crew count: ${crewMembers.length}`);

//  let's get a list of surviving crew members in three different ways
var survivingCrew;
//      we have one list of survivors. Let's use it to find which ones of them were crew members
survivingCrew = survivors.filter(p => !p.passenger);
console.log(`Number of the crew that survived: ${survivingCrew.length}`);

//      we have another list of crew members. Let's use it to find which ones of them survived
survivingCrew = crewMembers.filter(p => p.survivor);
console.log(`Number of the crew that survived: ${survivingCrew.length}`);

//      finally we could use the original list and get the people that survived that were on the crew
//      this will scan the entire original list and seems a bit unnecessary since we have two other short lists we could use
survivingCrew = passengers.filter(p => p.survivor && !p.passenger);
console.log(`Number of the crew that survived: ${survivingCrew.length}`);

//  one more filter request - get the number of children (under 18), that survived from 1st class
var youngSurvivors = passengers.filter(p => p.age > 0 && p.age < 18 &&
    p.passageClass == '1st Class' && p.survivor);
console.table(youngSurvivors, ['firstName', 'lastName', 'age'])

//------------------------------------------------------------------------------------------------
//
//  Moving on the MAP
//      map will extract a one attribute of your object or multiple if you like
//
//------------------------------------------------------------------------------------------------
//  get all first names. Notice the length of the array matches the length of the passengers array
var allfirstNames = passengers.map(p => p.firstName);
console.log(`We have a list of ${allfirstNames.length} first names`);

//  get all titles 
//          using Set and map. map returns ALL of the titles, Set condenses down to the unique titles
//          Set is a JavaScript object that only holds UNIQUE values. All dups are tossed away
//      step 1 - get the firstName. The first name attribute looks like this              Mrs Rhoda Mary 'Rosa'
var firstNames = passengers.map(p => p.firstName);
//      step 2 - SPLIT the first name on space. This creates an array of the names       ['Mrs', 'Rhoda', 'Mary', '\'Rosa\'']
//      step 3 - get the first token of the array [0]                                     'Mrs'
var allTitles = firstNames.map(name => name.split(" ")[0]); //  this still has 2477 entries in it
//      step 4 - create a new list of titles for just the unique values
var titles = new Set(allTitles);
//      start over and do it all in one step    
titles = new Set(passengers.map(p => p.firstName.split(" ")[0]));
console.log(`What are the titles of the people on the Titanic? ${Array.from(titles).join(",")}`);

//  Get a list of titles, first and last names of passengers and their age
//      let's see Java do THIS!
var passengerList = passengers.map(p => ({
    title: p.firstName.split(" ")[0],
    firstName: p.firstName.split(" ")[1],
    lastName: p.lastName,
    age: p.age
}));
console.table(passengerList[0]); //  just show the first entry


//------------------------------------------------------------------------------------------------
//
//  REDUCE
//      Reduce is great for getting the total of an array or the longest string or largest value
//
//------------------------------------------------------------------------------------------------
//  get total ages of all passengers and crew members
//      method 1 - get just the ages using the map function then sum them to get the total
var totalAges = passengers.map(p => p.age).reduce((tot, age) => tot + age, 0)
console.log(`Total of all ages ${totalAges} and the Average ${(totalAges/passengers.length).toFixed(0)}`)
//      method 2 - go directly to the summing. rather than extract the ages just look at the passenger.age value and use it
totalAges = passengers.reduce((tot, pax) => tot + pax.age, 0)
console.log(`Total of all ages ${totalAges} and the Average ${(totalAges/passengers.length).toFixed(0)}`)

//  
//  what is the average age of the survivors?
var age = survivors.reduce((total, p) => total + p.age, 0);
console.log(`Average age of survivors ${age/survivors.length}`);

// 3rd class passengers over 60 that survived
var thirdClass = passengers.filter(p => p.survivor && p.age > 60 && p.passageClass == "3rd Class").length;
console.log(`3rd class passengers over 60 that survived: ${thirdClass}`);

//  find the captain 
//      hint firstName starts with Capt (and they were an officer)
//      Surprise there were two Captains on board. One was a passenger
var captains = passengers.filter(p => p.firstName.startsWith('Capt')); //   && ! p.passenger
console.table(captains, ['lastName', 'firstName', 'role', 'passenge']);

// find the Musicians
var musicians = passengers.filter(p => p.role == 'Musician');
console.table(musicians);

//  get list of married women
var ladies = passengers.filter(p => p.firstName.startsWith("Mrs"));
console.table(`Number of Mrs's on board ${ladies.length}`);

//-------------------------------------------------------------------------------------  
//
//      Let's look at some of other array functions available to us    
//          SOME    returns true or false if at least one record matches the conditional expression
//          EVERY   returns TRUE if EVERY record matches the conditional expression
//          FIND    returns the first record that matches the conditional expression
//          SORT    sort the records in the array using the test (compare two records return <0 if record A is smaller >0 if A is bigger, 0 is the same)
//-------------------------------------------------------------------------------------  
var oldSurvivors = passengers.some(p => p.survivor && p.age > 80); //  did some octogenerians survice
var allMusiciansDead = passengers.every(p => p.role == 'Musician' && !p.survivor); //  did every musician die?
var first30Plus = passengers.find(p => p.age > 30 && p.survivor); //  find the first 30 something survivor

//  Who was the youngest passenger? This is a little tricky. 
//      If we do not have the age of the passenger it has been set to 0; 
//      which we would not want to use as a valid lowest age. So we add a compare to 0 and skip that record
var youngest = passengers.reduce((prev, next) => (next.age === 0 || prev.age < next.age) ? prev : next);
var oldest = passengers.reduce((prev, next) => prev.age > next.age ? prev : next);
console.log(`The youngest passenger on the Titanic was ${youngest.firstName} ${youngest.lastName} age: ${youngest.age}`)
console.log(`The oldest   passenger on the Titanic was ${oldest.firstName} ${oldest.lastName} age: ${oldest.age}`)

//  alphabetize names by last name
musicians.sort((nameA, nameB) => nameA.lastName.localeCompare(nameB.lastName)).reverse();
console.table(musicians);

//  order names by length
passengers.sort((nameA, nameB) => nameA.lastName.length - nameB.lastName.length).reverse();
console.table(`${passengers[0].lastName} has the longest last name`);
console.table(`${passengers.splice(-1)[0].lastName} has the shortest last name`);

// Let"s see how we can group objects in Java 8
// var groupBy = (xs, key) => 
//     xs.reduce((rv, x) => {
//         (rv[x[key]] = rv[x[key]] || []).push(x);
//         return rv;
//     }, {});
var groupBy = (xs, key) => xs.reduce((rv, x) => {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
}, {});

// Now let's group person by class
var grpByClass = groupBy(passengers, 'passageClass');
for (key in grpByClass) {
    console.log(`How many ${key} were on board: ${grpByClass[key].length}`);
}

// Now let's group person by age
var grpByAge = groupBy(passengers, 'age');
for (key in grpByAge) {
    console.log(`How many ${key} were on board: ${grpByAge[key].length}`);
}

//  now just for some simple array functions with a simple array of numbers
var ages = [14, 17, 11, 32, 33, 16, 40, 15, 4, 18, 912, 543, 33];

ages.forEach(n => console.log(n));

console.log("reduce -    " + ages.reduce((total, num) => total - num, 0)); //  subtract the numbers from 0
console.log("reduce +    " + ages.reduce((total, num) => total + num, 0)); //  add numbers together starting at 0
console.log("every       " + ages.every(age => age >= 18)); //  is every number >= to 18
console.log("includes    " + ages.includes(age => age >= 18)); //  does the array include any numbers >= 18?
console.log("find        " + ages.find(age => age >= 18)); //  find the first 18 in the array
console.log("includes    " + ages.includes(16)); //  look for 16 starting at the front [0] of the array
console.log("includes    " + ages.includes(16, 6)); //  look for 16 starting at position 6
console.log("findIndex   " + ages.findIndex(age => age >= 18)); //  find the first number >= 18
console.log("some        " + ages.some(age => age >= 18)); //  are some of the numbers >= 18
console.log("indexOf     " + ages.indexOf(33)); //  where is the first 33
console.log("lastIndexOf " + ages.lastIndexOf(33)); //  where is the last 33
console.log("filter      " + ages.filter(age => age >= 100)); //  get array of numbers > 100

function readPassengerList() {
    var titanic = [];
    //  read the file like basic text
    //  titanic.csv is a comma separated variable file (fields are separated by commas)
    //  it is a listing of all passengers and crew from the Titanic. 
    //  Including those that show up for work and those that got on just to cross over to SouthHampton
    var data = fs.readFileSync('C:/Projects/csv/Titanic.csv', {
        encoding: 'utf-8'
    });
    //  The text we received is one LARGE text string
    //  each line is separated by a CR LF
    //  split the large text string into individual lines
    var lines = data.split('\r\n');

    //  grab the first row. It is the headings for the column names
    //  SHIFT the first element of the array off of the passenger names array
    //  it contains the column names as a string
    //      "LastName,FirstName,Age,Class,PassengerOrCrew,Role,Survivor"
    lines.shift();

    //  Each line represents a passenger or crew member on the ship
    //      "BROWN, Mrs Margaret ,44,1st Class,Passenger,,T"
    for (var line of lines) {
        if (line.length == 0)
            break;

        //  split the line on ',' to get the individual attributes into an array
        //      ['BAILEY', 'Mr William',   30, 'Engineering', 'Crew',      '(Delivery trip only)', 'false']
        //      ['BROWN',  'Mrs Margaret', 44, '1st Class',   'Passenger', '',                      'true']
        //      This BTW is the famous 'Molly' Brown as in 'Molly Brown, The Unsinkable'

        // depending on the version of the titanic file, some versions have a slash between last and first names
        line = line.replace('/', ',');
        var attributes = line.split(',');

        //  create a passenger using the data from the text file
        //                         last Name,     first Name     age,           Class,         Passenger or Crew, role,          Survivor
        var person = new Passenger(attributes[0], attributes[1], attributes[2], attributes[3], attributes[4], attributes[5], attributes[6]);

        //  save each passenger and crew member to the titanic manifest
        titanic.push(person);
    }
    return titanic;
}

//  The Passenger Object
function Passenger(lastName, firstName, age, passageClass, passengerCrew, role, survivor) {
    this.lastName = lastName;
    this.firstName = firstName;

    this.age = +age; //  +age will convert age to a number
    this.passageClass = passageClass; //  1st, 2nd, 3rd...
    this.passenger = passengerCrew === 'Passenger'; //  true if 'Passenger' or false if 'Crew' (not passenger)
    this.role = role; //  secondary job (Delivery trip only), Servant, Musician
    this.survivor = survivor == 'true'; //  true or false
}