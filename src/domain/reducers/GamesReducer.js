import {
    ADD_GAME,
    REMOVE_GAME
} from "../ActionTypes";

const initialState = [
    {
        id: "wow",
        number: 1,
        player1Name: "go",
        player1Score: 10,
        player2Name: "no",
        player2Score: 2
    }
];

const GamesReducer = (state = initialState, action) => {
    console.log(action.type);
    switch (action.type) {
        case ADD_GAME: return state;
        case REMOVE_GAME: return state;
        default:
            return state;
    }
};

export default GamesReducer