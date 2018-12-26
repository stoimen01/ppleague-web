import {Cmd, loop} from "redux-loop";
import {
    ADD_GAME_SUCCESS,
    ADD_PLAYER,
    ADD_PLAYER_ERROR,
    ADD_PLAYER_SUCCESS,
    DATA_LOADED,
    onAddPlayerError,
    onAddPlayerSuccess,
    REMOVE_GAME_SUCCESS,
} from "../actions";
import {tryAddPlayer} from "../commands";

// adding winRate property to the player object
const addWinRate = player => {
    const total = player.wins + player.losses;
    let winRate = 0;
    if (total > 0) {
        winRate = (player.wins / total) * 100;
    }
    return {
        ...player,
        winRate
    };
};

const PlayersReducer = (state = [], action) => {
    switch (action.type) {

        case DATA_LOADED:
            const { players } = action.data;
            // adding winRate to each player
            // since the backend object doesn't have such
            return players.map(addWinRate);

        case ADD_PLAYER:
            return loop(
                state,
                Cmd.run(tryAddPlayer, {
                    successActionCreator: onAddPlayerSuccess,
                    failActionCreator: onAddPlayerError,
                    args: [action.name]
                })
            );

        case ADD_PLAYER_SUCCESS:
            return [ ...state, addWinRate(action.player) ];

        case ADD_PLAYER_ERROR:
            return state;

        case ADD_GAME_SUCCESS:
        case REMOVE_GAME_SUCCESS:
            // updating the players on game add/remove
            const { player1, player2 } = action.data;
            const player1Index = state.findIndex(player => player.id === player1.id);
            const player2Index = state.findIndex(player => player.id === player2.id);

            const playersCopy = state.slice(0);
            playersCopy[player1Index] = addWinRate(player1);
            playersCopy[player2Index] = addWinRate(player2);

            return playersCopy;

        default:
            return state;
    }
};

export default PlayersReducer;