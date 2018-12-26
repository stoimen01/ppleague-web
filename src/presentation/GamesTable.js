import React from 'react';
import {getLatestGames, getPlayers} from "../domain/selectors";
import {connect} from "react-redux";
import { ReactComponent as IconRemove } from '../ic-close.svg';
import {onRemoveGame} from "../domain/actions";

const GamesTable = ({games, onRemoveGame}) => {

    const onRemoveGameClick = (id) => () => onRemoveGame(id);

    return (
        <div className="wide-component">
            <table>
                <thead>
                <tr>
                    <th className="table-headline" colSpan={7}>Latest games</th>
                </tr>
                </thead>
                <tbody>
                {
                    games.map(({ id, number, player1Name, player1Score, player2Name, player2Score }, i) =>
                        <tr key={id}>
                            <td>{player1Name}</td>
                            <td>{player1Score}</td>
                            <td>-</td>
                            <td>{player2Score}</td>
                            <td>{player2Name}</td>
                            <td> <IconRemove onClick={ onRemoveGameClick(id) } /> </td>
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
}), { onRemoveGame })(GamesTable);