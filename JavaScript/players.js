const players = require('c:\\Projects\\csv\\NBAPlayers.json');
console.log(players.length);

cleanUp(players);

let playerA = getPlayerByName('Stephen Curry', players);
let playerB = getPlayerByName('LeBron James', players);

// if you need to make decision use an if
//  an if statement starts with if
//      100% of the time after if is a left paren (
//      inside the parens you are comparing two things 
//          and the result of the compare is true or false
//      firstVariable logicalOperator secondThing (maybe anumber or a string or another variable)
//          logicalOperator < <= > >= == === != !== !
//          conjunction logicalOperator && || 
if (playerA.Salary > playerB.Salary) { //  between { } this is a block of code
    //  this is TRUE block
    console.log(playerA.Player + ' has a salary of ' + playerA.Salary);
}

//  for of loop
//  starts with for (
    //      followed the 'nextGuy' variable (often called the singular of your array)
    //          of
    //              the name of your array
let lowestPaid = players[0];       //  initialize to something
for (const player of players) {
    if (player.Salary < lowestPaid.Salary) {
        lowestPaid = player;
    }
}
console.log(lowestPaid);

//  numerical operators are + - * / % 

let team = 'GSW';
let gsw = getTeamRoster(team, players);

let centers = getPlayersByPosition('Center', players);
let ptGuard = getPlayersByPosition('Point Guard', players);

let aveCenterSalary = getSalary(centers) / centers.length;
let avePtGuardSalary = getSalary(ptGuard) / ptGuard.length;

console.log('Point Gaurd Average Salary: ' + avePtGuardSalary);
console.log('Center      Average Salary: ' + aveCenterSalary);

let position = 'Center';
let list = getPlayersByPosition(position, gsw)
for (const p of list) {
    console.log(p);
}

let bigMoney = getPlayersAboveX(38000000, players);
bigMoney.forEach(p => console.log(p.Player + " " + p.Salary));

let averagePtsPerGame = getAveragePoints(theTeam);
console.log('ave points per game ' + averagePtsPerGame);

position = 'Center';
let whatEverPosition = getPlayersByPosition(position, gsw);

let playerX = getPlayerByName('Stephen Curry', players);
console.log(playerX.Player + ' is on team ' + playerX.Team + ' and plays at ' + playerX.Position);

let allSalaries = getSalary(players);
let teamSalaries = getSalary(gsw);
let centerSalaries = getSalary(whatEverPosition);

console.log(players.length + ' players Salary for the NBA: ' + allSalaries);
console.log(gsw.length + ' players Salary for     ' + team + ': ' + teamSalaries);
console.log(whatEverPosition.length + ' players Salary for ' + position + ': ' + centerSalaries);

let perMinute = dollarsPerMinute(players[0]);
console.log(players[0].Player + ' earns ' + perMinute + ' dollars per minute');

let perGame = calcSalaryPerGame(players[0]);
console.log(perGame);


let leBron = getPlayerByName('LeBron James', players);
console.log(leBron["ThreePAttempts"]);


//  --------------------------------------------------------------
//      Here is where I put my functions
//  --------------------------------------------------------------
function getAveragePoints(playerList) {
    let total = 0;
    for (const player of playerList) {
        total += player.Points;
    }
    return total
}

function dollarsPerMinute(player) {
    let howMuch;        //  hmmm..... does it need to be initialized

    howMuch = player.Salary / (player.GamesPlayed * player.MinutesPerGame);

    return howMuch;
}

function calcSalaryPerGame(player) {
    return player.Salary / player.GamesPlayed;
}

function getSalary(playerList) {
    let total = 0;
    for (const player of playerList) {
        total += player.Salary;
    }
    return total;
}

function getPlayersByPosition(position, playerList) {
    let roster = [];
    for (const nextPlayer of playerList) {
        if (nextPlayer.Position == position) {
            roster.push(nextPlayer);
        }
    }
    return roster;
}

function getTeamRoster(team, playerList) {
    let roster = [];
    for (const player of playerList) {
        if (player.Team == team) {
            roster.push(player);
        }
    }
    return roster;
}

function getPlayerByName(playerName, playerList) {
    for (const player of playerList) {
        if (player.Player == playerName) {
            return player;
        }
    }
    return null;
}

function getPlayersAboveX(salary, playerList) {
    let roster = [];
    for (const player of playerList) {
        if (player.Salary >= salary) {
            roster.push(player);
        }
    }
    return roster;
}

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