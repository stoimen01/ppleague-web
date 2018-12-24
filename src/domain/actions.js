import {ADD_GAME, ADD_PLAYER, REMOVE_GAME} from "./ActionTypes";

export const addPlayer = name => ({
    type: ADD_PLAYER,
    name: name
});

export const addGame = (player1Name, player2Name, player1Score, player2Score) => ({
   type: ADD_GAME,
    player1Name,
    player2Name,
    player1Score,
    player2Score
});

export const removeGame = (id) => ({ type: REMOVE_GAME, id });