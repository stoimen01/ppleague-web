import {Cmd, loop} from "redux-loop";
import {
    DATA_LOADED,
    ADD_GAME, ADD_GAME_SUCCESS, ADD_GAME_ERROR,
    REMOVE_GAME, REMOVE_GAME_SUCCESS, REMOVE_GAME_ERROR,
    onAddGameSuccess, onAddGameError,
    onRemoveGameSuccess, onRemoveGameError
} from "../actions";

const tryAddGame = data => {
    const options = {
        method: 'POST',
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(data)
    };
    return fetch('/addGame', options)
        .then(res => res.json());
};


const tryRemoveGame = id => {
    const options = {
        method: 'POST',
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({ gameId: id })
    };
    return fetch('/removeGame', options)
        .then(res => res.json());
};

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
            return loop(
                state,
                Cmd.run(tryRemoveGame, {
                    successActionCreator: onRemoveGameSuccess,
                    failActionCreator: onRemoveGameError,
                    args: [action.id]
                })
            );

        case REMOVE_GAME_SUCCESS:
            const { gameId } = action.data;
            return state.filter((game) => game.id !== gameId );

        case REMOVE_GAME_ERROR:
            return state;

        default:
            return state;
    }
};

export default GamesReducer