//      Do you want to read a csv file and covert it to JSON. Here is how you would do it
// const fs = require('fs');
//
// //  const passengers = require('titanic.csv');
//
// let passengers = readPassengerList();
//
// //  How many people were on the Titanic?
// console.log(`Titanic passenger/crew count: ${passengers.length}`);

//      Do you want to be lazy and read a JSON file and assign it to a variable? Here is how you would do it
let passengers = require('titanic.json')

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
let survivors = passengers.filter(p => p.survivor);
console.log(`Titanic Survivors count: ${survivors.length}`);

//      a list for Crew members
let crewMembers = passengers.filter(p => !p.passenger);
console.log(`Titanic Crew count: ${crewMembers.length}`);

//  let's get a list of surviving crew members in three different ways
let survivingCrew;
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
let youngSurvivors = passengers.filter(p => p.age > 0 && p.age < 18 &&
    p.passageClass === '1st Class' && p.survivor);
console.table(youngSurvivors, ['firstName', 'lastName', 'age'])

//------------------------------------------------------------------------------------------------
//
//  Moving on the MAP
//      map will extract a one attribute of your object or multiple if you like
//
//------------------------------------------------------------------------------------------------
//  get all first names. Notice the length of the array matches the length of the passengers array
let allfirstNames = passengers.map(p => p.firstName);
console.log(`We have a list of ${allfirstNames.length} first names`);

//  get all titles 
//          using Set and map. map returns ALL of the titles, Set condenses down to the unique titles
//          Set is a JavaScript object that only holds UNIQUE values. All dups are tossed away
//      step 1 - get the firstName. The first name attribute looks like this              Mrs Rhoda Mary 'Rosa'
let firstNames = passengers.map(p => p.firstName);
//      step 2 - SPLIT the first name on space. This creates an array of the names       ['Mrs', 'Rhoda', 'Mary', '\'Rosa\'']
//      step 3 - get the first token of the array [0]                                     'Mrs'
let allTitles = firstNames.map(name => name.split(" ")[0]); //  this still has 2477 entries in it
//      step 4 - create a new list of titles for just the unique values
let titles = new Set(allTitles);
console.log(`What are the titles of the people on the Titanic? ${Array.from(titles).join(",")}`);
//      start over and do it all in one step
titles = new Set(passengers.map(p => p.firstName.split(" ")[0]));
console.log(`What are the titles of the people on the Titanic? ${Array.from(titles).join(",")}`);

//  Get a list of titles, first and last names of passengers and their age
//      let's see Java do THIS!
let passengerList = passengers.map(p => ({
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
let totalAges = passengers.map(p => p.age).reduce((tot, age) => tot + age, 0)
console.log(`Total of all ages ${totalAges} and the Average ${(totalAges/passengers.length).toFixed(0)}`)
//      method 2 - go directly to the summing. rather than extract the ages just look at the passenger.age value and use it
totalAges = passengers.reduce((tot, pax) => tot + pax.age, 0)
console.log(`Total of all ages ${totalAges} and the Average ${(totalAges/passengers.length).toFixed(0)}`)

//  
//  what is the average age of the survivors?
let age = survivors.reduce((total, p) => total + p.age, 0);
console.log(`Average age of survivors ${age/survivors.length}`);

// 3rd class passengers over 60 that survived
let thirdClass = passengers.filter(p => p.survivor && p.age > 60 && p.passageClass === "3rd Class").length;
console.log(`3rd class passengers over 60 that survived: ${thirdClass}`);

//  find the captain 
//      hint firstName starts with Capt (and they were an officer)
//      Surprise there were two Captains on board. One was a passenger
let captains = passengers.filter(p => p.firstName.startsWith('Capt')); //   && ! p.passenger
console.table(captains, ['lastName', 'firstName', 'role', 'passenger']);

// find the Musicians
let musicians = passengers.filter(p => p.role === 'Musician');
console.table(musicians);

//  get list of married women
let ladies = passengers.filter(p => p.firstName.startsWith("Mrs"));
console.table(`Number of Mrs's on board ${ladies.length}`);

//-------------------------------------------------------------------------------------  
//
//      Let's look at some of other array functions available to us    
//          SOME    returns true or false if at least one record matches the conditional expression
//          EVERY   returns TRUE if EVERY record matches the conditional expression
//          FIND    returns the first record that matches the conditional expression
//          SORT    sort the records in the array using the test (compare two records return <0 if record A is smaller >0 if A is bigger, 0 is the same)
//-------------------------------------------------------------------------------------  
let oldSurvivors = passengers.some(p => p.survivor && p.age > 80); //  did some octogenarians survived
let allMusiciansDead = passengers.every(p => p.role === 'Musician' && !p.survivor); //  did every musician die?
let first30Plus = passengers.find(p => p.age > 30 && p.survivor); //  find the first 30 something survivor

//  Who was the youngest passenger? This is a little tricky. 
//      If we do not have the age of the passenger it has been set to 0; 
//      which we would not want to use as a valid lowest age. So we add a compare to 0 and skip that record
let youngest = passengers.reduce((prev, next) => (next.age === 0 || prev.age < next.age) ? prev : next);
let oldest = passengers.reduce((prev, next) => prev.age > next.age ? prev : next);
console.log(`The youngest passenger on the Titanic was ${youngest.firstName} ${youngest.lastName} age: ${youngest.age}`)
console.log(`The oldest   passenger on the Titanic was ${oldest.firstName} ${oldest.lastName} age: ${oldest.age}`)

//  alphabetize names by last name
musicians.sort((nameA, nameB) => nameA.lastName.localeCompare(nameB.lastName)).reverse();
console.table(musicians);

//  order names by length
passengers.sort((nameA, nameB) => nameA.lastName.length - nameB.lastName.length).reverse();
console.table(`${passengers[0].lastName} has the longest last name`);
console.table(`${passengers.splice(-1)[0].lastName} has the shortest last name`);

// let groupBy = (xs, key) => 
//     xs.reduce((rv, x) => {
//         (rv[x[key]] = rv[x[key]] || []).push(x);
//         return rv;
//     }, {});
let groupBy = (xs, key) => xs.reduce((rv, x) => {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
}, {});

// Now let's group person by class
let grpByClass = groupBy(passengers, 'passageClass');
for (let group in grpByClass) {
    console.log(`How many ${group} were on board: ${grpByClass[group].length}`);
}

// Now let's group person by age
let grpByAge = groupBy(passengers, 'age');
for (let group in grpByAge) {
    console.log(`How many ${group} year olds were on board: ${grpByAge[group].length}`);
}

//  now just for some simple array functions with a simple array of numbers
const ages = [14, 17, 11, 32, 33, 16, 40, 15, 4, 18, 912, 543, 33];

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
    let titanic = [];
    //  read the file like basic text
    //  titanic.csv is a comma separated variable file (fields are separated by commas)
    //  it is a listing of all passengers and crew from the Titanic. 
    //  Including those that show up for work and those that got on just to cross over to SouthHampton
    let data = fs.readFileSync('../Titanic.csv', {
        encoding: 'utf-8'
    });
    //  The text we received is one LARGE text string
    //  each line is separated by a CR LF
    //  split the large text string into individual lines
    let lines = data.split('\n');

    //  grab the first row. It is the headings for the column names
    //  SHIFT the first element of the array off of the passenger names array
    //  it contains the column names as a string
    //      "LastName,FirstName,Age,Class,PassengerOrCrew,Role,Survivor"
    lines.shift();

    //  Each line represents a passenger or crew member on the ship
    //      "BROWN, Mrs Margaret ,44,1st Class,Passenger,,T"
    for (let line of lines) {
        if (line.length === 0)
            break;

        //  split the line on ',' to get the individual attributes into an array
        //      ['BAILEY', 'Mr William',   30, 'Engineering', 'Crew',      '(Delivery trip only)', 'false']
        //      ['BROWN',  'Mrs Margaret', 44, '1st Class',   'Passenger', '',                      'true']
        //      This BTW is the famous 'Molly' Brown as in 'Molly Brown, The Unsinkable'

        // depending on the version of the titanic file, some versions have a slash between last and first names
        line = line.replace('/', ',');
        let attributes = line.split(',');

        //  create a passenger using the data from the text file
        //                         last Name,     first Name     age,           Class,         Passenger or Crew, role,          Survivor
        let person = new Passenger(attributes[0], attributes[1], attributes[2], attributes[3], attributes[4], attributes[5], attributes[6]);

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
    this.survivor = survivor === 'true'; //  true or false
}