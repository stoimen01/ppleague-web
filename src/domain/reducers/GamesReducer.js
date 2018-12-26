import {Cmd, loop} from "redux-loop";
import {
    ADD_GAME,
    ADD_GAME_ERROR,
    ADD_GAME_SUCCESS,
    DATA_LOADED,
    onAddGameError,
    onAddGameSuccess,
    REMOVE_GAME,
    REMOVE_GAME_ERROR,
    REMOVE_GAME_SUCCESS,
    onRemoveGameError,
    onRemoveGameSuccess,
} from "../actions";
import {tryAddGame, tryRemoveGame} from "../commands";

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