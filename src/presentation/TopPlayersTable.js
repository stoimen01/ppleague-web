import React from 'react';
import {getPlayers} from "../domain/selectors";
import {connect} from "react-redux";

const TopFiveTable = ({players}) => (
    <div className="wide-component">
        <table>
            <thead>
            <tr>
                <th className="table-headline" colSpan={5}>Ranking</th>
            </tr>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Wins</th>
                <th>Losses</th>
                <th>Win rate</th>
            </tr>
            </thead>
            <tbody>
            {
                players.map(({ id, number, name, wins, losses, winRate }) =>
                    <tr key={id}>
                        <td>{number}</td>
                        <td>{name}</td>
                        <td>{wins}</td>
                        <td>{losses}</td>
                        <td>{winRate}</td>
                    </tr>
                )
            }
            </tbody>
        </table>
    </div>
);

export default connect(state => ({
    players: getPlayers(state)
}))(TopFiveTable);