const players = require('c:\\Projects\\csv\\NBAPlayers.json');
console.log(players.length);

cleanUp(players);
console.log(players[0])
for (const player of players) {
    if ( player.Team == "ORL") {
        console.log(player.Player + ' playes ' + player.Position);
    }
}

function cleanUp(players) {
    for (const player of players) {
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