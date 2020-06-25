const passengers = require('c:\\Projects\\csv\\titanic.json');
console.log(passengers.length);

let survivors = passengers.filter(p => p.Survivor == "T");
console.log(survivors.length);

console.log(passengers[0])

let age = survivors.reduce((total, p) => total + p.Age,0)
console.log(age/survivors.length);

// 3rd class passengers over 60
let thirdClass = passengers.filter(p => p.Age > 60 && p.Class == "3rd Class").length;
console.log(thirdClass);
//  find the captain 
//      hint FirstName starts with Capt
let captains = passengers.filter(p => p.FirstName.startsWith('Capt'));
console.table(captains);
//      how many captains are there
// how many crew died


let crew = passengers.filter(p => p.Survivor == "F" && p.PassengerOrCrew == "Crew");
console.table(crew);


// find the Musicians
let players = passengers.filter(p => p.Role == 'Musician');
console.table(players);

//  get list of women
let ladies = passengers.filter(p => p.FirstName.startsWith("Mrs"));
console.table(ladies);

let titles = new Set( passengers.map(p => p.FirstName.split(" ")[0]));
titles.forEach(t => console.log(t))