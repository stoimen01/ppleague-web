import {Cmd, loop} from "redux-loop";
import {
    DATA_LOADED,
    ADD_GAME,
    REMOVE_GAME,
    ADD_GAME_SUCCESS,
    ADD_GAME_ERROR,
    onAddGameError,
    onAddGameSuccess
} from "../actions";

const tryAddGame = (data) =>
    fetch('/addGame', { method: 'POST', body: JSON.stringify(data) })
        .then(res => res.json());

const GamesReducer = (state = [], action) => {
    switch (action.type) {

        case DATA_LOADED:
            return action.data.games;

        case ADD_GAME:
            return loop(
                state,
                Cmd.run(tryAddGame, {
                    successActionCreator: onAddGameSuccess,
                    failActionCreator: onAddGameError,
                    args: [action.data]
                })
            );

        case ADD_GAME_SUCCESS:
            const { newGame } = action.data;
            return [ ...state, newGame ];

        case ADD_GAME_ERROR:
            return state;

        case REMOVE_GAME:
            return state;

        default:
            return state;
    }
};

export default GamesReducer