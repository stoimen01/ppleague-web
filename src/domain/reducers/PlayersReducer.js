import {ADD_PLAYER} from "../ActionTypes";

const playerss = [
    {
        id: "123",
        number: "0",
        name: "Josh",
        wins: 10,
        losses: 10,
        winRate: "20%"
    },
    {
        id: "1234",
        number: "1",
        name: "Bob",
        wins: 10,
        losses: 10,
        winRate: "20%"
    }
];

const PlayersReducer = (state = playerss, action) => {
    console.log(action.type);
    switch (action.type) {
        case ADD_PLAYER:
            return [
                ...state,
                {
                    id: "" + Math.random(),
                    number: 0,
                    name: action.name,
                    wins: 0,
                    losses: 0,
                    winRate: "0%"
                }
            ];
        default: return state;
    }
};

export default PlayersReducer;