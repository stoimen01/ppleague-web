
const optionsOf = jsonData => ({
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(jsonData)
});

export const tryAddPlayer = name => {
    return fetch('/addPlayer', optionsOf({name}))
        .then(res => res.json());
};

export const tryAddGame = data => {
    return fetch('/addGame', optionsOf(data))
        .then(res => res.json());
};

export const tryRemoveGame = id => {
    return fetch('/removeGame', optionsOf({gameId: id}))
        .then(res => res.json());
};