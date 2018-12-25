import React from 'react';
import {getLatestGames, getPlayers} from "../domain/selectors";
import {connect} from "react-redux";
import { ReactComponent as IconRemove } from '../ic-close.svg';
import {onRemoveGame} from "../domain/actions";

const GamesTable = ({games, removeGame}) => {

    const onRemove = (id) => (event) => removeGame(id);

    return (
        <div className="wide-component">
            <table>
                <thead>
                <tr>
                    <th className="table-headline" colSpan={7}>Latest games</th>
                </tr>
                <tr>
                    <th>#</th>
                    <th colSpan={5}>Scores</th>
                    <th> </th>
                </tr>
                </thead>
                <tbody>
                {
                    games.map(({ id, number, player1Name, player1Score, player2Name, player2Score }, i) =>
                        <tr key={id}>
                            <td>{i + 1}</td>
                            <td>{player1Name}</td>
                            <td>{player1Score}</td>
                            <td>-</td>
                            <td>{player2Score}</td>
                            <td>{player2Name}</td>
                            <td> <IconRemove onClick={ onRemove(id) } /> </td>
                        </tr>
                    )
                }
                </tbody>
            </table>
        </div>
    );
};

export default connect(state => ({
    games: getLatestGames(state),
    players: getPlayers(state)
}), { removeGame: onRemoveGame })(GamesTable);