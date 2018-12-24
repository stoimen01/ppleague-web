import { combineReducers } from "redux";
import GamesReducer from "./GamesReducer";
import PlayersReducer from "./PlayersReducer";

const AppReducer = combineReducers({
    games: GamesReducer,
    players: PlayersReducer
});

export default AppReducer;