
export const getPlayers = state => state.players;

export const getTop5 = state => {
    return state.players
        .slice(0)
        .sort((a, b) => b.wins - a.wins)
        .slice(0, 5);
};

export const getLatestGames = ({ games, players }) => {
    return games
        .map(game => {
            const {player1Id, player2Id} = game;
            game.player1Name = players.find(player => player.id === player1Id).name;
            game.player2Name = players.find(player => player.id === player2Id).name;
            return game
        })
        .sort((a, b) => b.timestamp - a.timestamp);
};