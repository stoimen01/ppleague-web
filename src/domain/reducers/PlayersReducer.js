import {loop, Cmd} from "redux-loop";
import {
    ADD_PLAYER, ADD_PLAYER_ERROR,
    ADD_PLAYER_SUCCESS,
    DATA_LOADED,
    onAddPlayerError,
    onAddPlayerSuccess,
} from "../actions";

const tryAddPlayer = name =>
    fetch('/addPlayer', { method: 'POST', body: JSON.stringify({ name }) })
        .then(res => res.json());

const PlayersReducer = (state = [], action) => {
    switch (action.type) {

        case DATA_LOADED:
            const { players } = action.data;
            console.log(action.data);
            return players.map(player => ({
                ...player,
                number: 0,
                winRate: player.wins / (player.wins + player.losses)
            }));

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
            const { player } = action;
            return { ...state, player };

        case ADD_PLAYER_ERROR:
            return state;

        default:
            return state;
    }
};

export default PlayersReducer;