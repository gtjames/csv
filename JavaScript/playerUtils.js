
export function getAveragePoints(playerList) {
    let total = 0;
    for (const player of playerList) {
        total += player.Points;
    }
    return total
}

export function dollarsPerMinute(player) {
    let howMuch;

    howMuch = player.Salary / (player.GamesPlayed * player.MinutesPerGame);

    return howMuch;
}

export function calcSalaryPerGame(player) {
    let dollarsPerGame;
    dollarsPerGame = player.Salary / player.GamesPlayed;
    return dollarsPerGame;
}

export function getSalary(playerList) {
    let total = 0;
    for (const player of playerList) {
        total += player.Salary;
    }
    return total;
}

export function getPlayersByPosition(position, playerList) {
    let roster = [];
    for (const nextPlayer of playerList) {
        if (nextPlayer.Position == position) {
            roster.push(nextPlayer);
        }
    }
    return roster;
}

export function getTeamRoster(team, playerList) {
    let roster = [];
    for (const player of playerList) {
        if (player.Team == team) {
            roster.push(player);
        }
    }
    return roster;
}

export function getPlayersAboveX(salary, playerList) {
    let roster = [];
    for (const player of playerList) {
        if (player.Salary >= salary) {
            roster.push(player);
        }
    }
    return roster;
}

export function cleanUp(playerList) {
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