const volcanoes = require('../volcanos.json');
//volcanoes.forEach(v => console.log(v.Country+","+v.Deaths+","+v.Elevation+","+v.Location+","+v.Name+","+v.Type+","+v.VEI+","+v.Year));

//  get a list of all the big time volcanoes Volcanie Explosive Index == 7
let bigExplosions = volcanoes.filter(v => v.VEI === 7);
let totalDeaths = bigExplosions.reduce((tot,v) => tot + v.Deaths,0)
console.log('There were ' + bigExplosions.length + ' VEI level 7 eruptions\n\tthat killed: ' + totalDeaths + ' people');

//  let's calculate the total VEI level 7 Deaths in one line of code
let total7 = volcanoes.reduce((tot,v) => tot + (v.VEI === 7 ? v.Deaths : 0), 0);
console.log('VEI level 7 eruptions\n\tthat killed: ' + totalDeaths + ' people');

//  a fancy map usage that creates a new JSON object with just a few 
//      attributes from the volcanoes array
let threeFields =  bigExplosions.map( v  => ({Name: v.Name, Year: v.Year, Deaths: v.Deaths}))
console.table(threeFields);

//  find the longest name of a country
let longName = volcanoes.reduce((l,v) => v.Country.length > l.Country.length ? v : l,volcanoes[0])
console.log('longest country name: ' + longName.Country);

//  find the volcano that caused the most Deaths
let mostDeaths = volcanoes.reduce((l,v) => v.Deaths > l.Deaths ? v : l,volcanoes[0])
console.log(mostDeaths.Name + " caused the most Deaths " + mostDeaths.Deaths);

//  how to print out all of the volcanoes
// volcanoes.forEach(function (volcano) {
//    console.log(volcano.Name);
// });

//  how to print out all of the volcanoes
// //volcanoes.forEach(volcano => console.log(volcano.Name));

//      find all volcanos that start with the lette r'V'
// let vVolcanoes = volcanoes.filter(v => v.Name.startsWith('V')).map(v => v.Name);
// vVolcanoes.forEach(v => console.log(v));

//      calculate the Deaths from all volcanoes
totalDeaths = volcanoes.reduce((total, v) => total + v.Deaths, 0);
console.log(totalDeaths);

//   number of Deaths in the united states
let usVolcanoes = volcanoes.filter(v => v.Country==="United States")
                           .reduce((tot,v) => tot + v.Deaths, 0);
console.log('total US Deaths: ' + usVolcanoes);

//  average elevation of all volcanoes
let ele = volcanoes.reduce((total, v) => total + v.Elevation, 0)/volcanoes.length;
console.log('average elevation of all volcanoes ' + ele / volcanoes.length);

//  how many volcanoes erupted after 2000
let after2000 = volcanoes.filter(v => v.Year >= 2000).length;
console.log('volcanoes after Y2K ' + after2000)

//  create an array of strings (use map) of the names of 
//      volcanoes in Chile after 1970s
let chile = volcanoes.filter(c => c.Country === 'Chile');
let after1970 = chile.filter(v => v.Year >= 1970);
let names = after1970.map(v => v.Name);
console.log('Chilean volcanoes: ' + names);

let chile70 = volcanoes.filter(c => c.Country === 'Chile' && c.Year >= 1970).map(v => v.Name);
console.log(chile70);

//  create array of countries where there were more than 200 Deaths after 1900
let vol1900 = volcanoes.filter(v => v.Deaths > 200 && v.Year > 1900).map(v => v.Name);
console.log(vol1900);

//  get array of volcanoes in the US after 1900 above 2000 feet
//  valcanoes is 804
let vol1900_0 = volcanoes.filter(v => v.Country === 'United States' && 
                                      v.Year > 1900 && 
                                      v.Elevation > 2000);

let dead = vol1900_0.reduce((total, v) => total + v.Deaths|0);
console.log(dead);
//      how many people died in that last set of volcanoes
//      how many volcanoes was that?
//      what are the names of the volcanoes (use map to create a new array)


//  create an array of volcanoes after 2015 using a for loop
let us = [];

for (const v in volcanoes) {
    if (v.Year > 2015)
        us.push(v);
}

//  create an array of volcanoes using a function
us = volcanoes.filter(after2015);

function after2015(v) {
    return v.Year > 2015;
}

//  create an array of volcanoes using an anonymous function
us = volcanoes.filter(function (v) {
    return v.Year > 2015;
});

//  create an array of volcanoes using a lambda function
us = volcanoes.filter(v => v.Year > 2015);
