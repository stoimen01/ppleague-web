import React from 'react';
import ReactDOM from 'react-dom';
import Root from "./presentation/Root";
import {createStore} from "redux";
import {Provider} from "react-redux";
import GamesReducer from "./domain/reducers/GamesReducer";
import PlayersReducer from "./domain/reducers/PlayersReducer";
import {combineReducers, install} from "redux-loop";
import RootReducer from "./domain/reducers/RootReducer";
import './index.css';

const AppReducer = combineReducers({
    appState: RootReducer,
    games: GamesReducer,
    players: PlayersReducer
});

ReactDOM.render(
    <Provider store={createStore(AppReducer, install())}>
        <Root />
    </Provider>,
    document.getElementById('root')
);