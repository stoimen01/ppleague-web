import React from 'react';

const GamesTable = ({games}) => (
    <table>
        <thead>
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
            games.map(({ id, number, name, wins, losses, winRate }, index) =>
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
);

export default GamesTable;