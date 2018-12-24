
export const INIT = 'INIT';
export const onInit = () => ({
    type: INIT
});

export const DATA_LOADED = 'DATA_LOADED';
export const onDataLoaded = (data) => ({
    type: DATA_LOADED,
    data: data
});

export const DATA_LOAD_FAIL = 'DATA_LOAD_FAIL';
export const onDataLoadError = (err) => ({
    type: DATA_LOAD_FAIL,
    err
});

export const ADD_PLAYER = 'ADD_PLAYER';
export const onAddPlayer = name => ({
    type: ADD_PLAYER,
    name
});

export const ADD_PLAYER_SUCCESS = 'ADD_PLAYER_SUCCESS';
export const onAddPlayerSuccess = player => ({
    type: ADD_PLAYER_SUCCESS,
    player
});

export const ADD_PLAYER_ERROR = 'ADD_PLAYER_ERROR';
export const onAddPlayerError = err => ({
    type: ADD_PLAYER_ERROR,
    err
});

export const ADD_GAME = 'ADD_GAME';
export const onAddGame = (player1Id, player1Score, player2Id, player2Score) => ({
    type: ADD_GAME,
    data: {
        player1Id,
        player1Score,
        player2Id,
        player2Score
    }
});

export const ADD_GAME_SUCCESS = 'ADD_PLAYER_SUCCESS';
export const onAddGameSuccess = data => ({
    type: ADD_GAME_SUCCESS,
    data
});

export const ADD_GAME_ERROR = 'ADD_PLAYER_SUCCESS';
export const onAddGameError = err => ({
    type: ADD_GAME_ERROR,
    err
});

export const REMOVE_GAME = 'REMOVE_GAME';
export const onRemoveGame = (id) => ({
    type: REMOVE_GAME,
    id
});