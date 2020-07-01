const players = require('c:/Projects/csv/NBAPlayers.json');
console.log(players.length);

cleanUp(players);

//  filter experiments
//      Get roster of Utah Jazz players
let jazz        = players.filter( p => p.Team == 'UTA');
//      get list of all Centers
//      find all players making more than 10M$
//      get all players that regularly make 6 or better Field Goals per game
//      find all players that make 10 or more points per page and play 20 or more games a year

let theBs;
//  use as many ways as you can to find players whose name starts with a B
//      sW, c@, iOf

let theXs;
//  use as many ways as you can to find players whose name contains an x
//      inc, srchm iOf

//  find players with last names ending in son


//  on to reduce
//      calculate the salary for all Jazz players
let totalJazzSalary = jazz.reduce((wipTot, p) => wipTot + p.Salary, 0);
console.log('Total Jazz Salary ' + totalJazzSalary);

//  get a list of players for Houstons
//      calculate the total
//          points score by all team members
//          fouls committed by all team members
//          total salary for all team members
//          blocks made by all team members

//  find the Houston player
let houRoster = players.filter( p => p.Team == 'HOU');
//      making the most money
houHighestPd = houRoster.reduce((most, p) => (p.Salary > most.Salary) ? p : most, houRoster[0]);
//      making the most blocks
//      committing the most fouls
//      making the most points
//      making the least points

//  on to mape
//      get the list of JUST the NAMES of the players
let houNames = houRoster.map(p => p.Player);
console.table(houNames);

//      get just the player name, salary and points, save to a mini JSON object
let shortHou = houRoster.map(p => ({name: p.Player, salary: p.Salary, points: p.Points}));
console.table(shortHou);

//      how to get the list of unique team names
let teamNames = players.map(p => p.Team);       // get all team names
let uniqTeamNames =new Set(teamNames);          // add them to a set, which only holds unique values

//      using an actual function in a HOF 
houHiSalary = houRoster.reduce(moMoney                            , houRoster[0]);

function moMoney(most, p) {
    console.log(p.Player + ' $' + p.Salary + ' compared to ' + most.Player + ' $' + most.Salary )
    if (p.Salary > most.Salary)
        return p;
    else
        return most;
}

console.log();

function cleanUp(playerList) {
    for (const player of playerList) {
        player.Salary |= 0;
        player.GamesPlayed |= 0;
        player.MinutesPerGame |= 0;
        player.FGMade |= 0;
        player.FGAttempts |= 0;
        player.ThreePMade |= 0;
        player.ThreePAttempts |= 0;
        player.FTMade |= 0;
        player.FTAttempts |= 0;
        player.Turnovers |= 0;
        player.Fouls |= 0;
        player.OffensiveRebounds |= 0;
        player.DefensiveRebounds |= 0;
        player.Rebounds |= 0;
        player.Assists |= 0;
        player.Steals |= 0;
        player.Blocks |= 0;
        player.Points |= 0;
    }
}