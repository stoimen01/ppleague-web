
export const getPlayers = state => state.players;

export const getTop5 = state =>
    state.players
        .slice(0)
        .sort((a, b) => b.wins - a.wins)
        .slice(0, 5);

export const getGames = state => state.games;