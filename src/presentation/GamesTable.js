import React from 'react';
import {getGames} from "../domain/selectors";
import {connect} from "react-redux";
import {removeGame} from "../domain/actions";

const GamesTable = ({games, removeGame}) => {

    const onRemove = (id) => (event) => removeGame(id);

    return (
        <div className="wide-component">
            <table>
                <thead>
                <tr>
                    <th colSpan={6}>Latest games</th>
                </tr>
                <tr>
                    <th>#</th>
                    <th colSpan={4}>Scores</th>
                    <th> </th>
                </tr>
                </thead>
                <tbody>
                {
                    games.map(({ id, number, player1Name, player1Score, player2Name, player2Score }) =>
                        <tr key={id}>
                            <td>{number}</td>
                            <td>{player1Name}</td>
                            <td>{player1Score}</td>
                            <td>{player2Score}</td>
                            <td>{player2Name}</td>
                            <td><input type="button" value="Remove" onClick={ onRemove(id) }/></td>
                        </tr>
                    )
                }
                </tbody>
            </table>
        </div>
    );
};

export default connect(state => ({
    games: getGames(state)
}), { removeGame })(GamesTable);