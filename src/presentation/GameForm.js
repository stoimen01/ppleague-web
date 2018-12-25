import React, { Component } from 'react';
import {onAddGame} from "../domain/actions";
import {connect} from "react-redux";
import {getPlayers} from "../domain/selectors";

const scoreRegex = /^\d{1,3}$/;

class GameForm extends Component {

    constructor(props) {
        super(props);
        this.initialState = {
            isEnabled: false,
            player1Name: "",
            player2Name: "",
            player1Score: "",
            player2Score: ""
        };
        this.state = this.initialState;
    }

    onFieldChange = (event) => {
        const { name, value } = event.target;
        const newState = {
            ...this.state,
            [name]: value
        };
        this.validate(newState);
    };

    onAddGameClick = () => {
        const result = this.validate(this.state);
        if (!result) return;
        const [player1, player2, player1Score, player2Score] = result;
        this.props.onAddGame(player1.id, player2.id, parseInt(player1Score), parseInt(player2Score));
        this.setState(this.initialState);
    };

    validate(state) {
        const { player1Name, player2Name, player1Score, player2Score } = state;

        if (!(player1Name.length > 0 &&
            player2Name.length > 0 &&
            player1Score.length > 0 &&
            player2Score.length > 0) ||
            player1Name === player2Name ||
            !(scoreRegex.test(player1Score) && scoreRegex.test(player2Score))
        ) {
            state.isEnabled = false;
            this.setState(state);
            return;
        }

        const players = this.props.players;
        const player1 = players.find((player) => player1Name === player.name);
        const player2 = players.find((player) => player2Name === player.name);

        if (!(player1 && player2)) {
            state.isEnabled = false;
            this.setState(state);
            return;
        }

        state.isEnabled = true;
        this.setState(state);
        return [player1, player2, player1Score, player2Score]
    }

    render() {
        return (
            <div className="component">
                <table>
                    <thead>
                        <tr>
                            <th colSpan={3}>Players</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <input
                                    type="text"
                                    name="player1Name"
                                    placeholder="player name"
                                    onChange={this.onFieldChange} />
                            </td>
                            <td>vs</td>
                            <td>
                                <input
                                    type="text"
                                    name="player2Name"
                                    placeholder="player name"
                                    onChange={this.onFieldChange} />
                            </td>
                        </tr>
                        <tr>
                            <th colSpan={3}>Scores</th>
                        </tr>
                        <tr>
                            <td>
                                <input
                                    type="text"
                                    name="player1Score"
                                    placeholder={this.state.player1Name + " score"}
                                    onChange={this.onFieldChange} />
                            </td>
                            <td>-</td>
                            <td>
                                <input
                                    type="text"
                                    name="player2Score"
                                    placeholder={this.state.player2Name + " score"}
                                    onChange={this.onFieldChange} />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={3}>
                                <input
                                    type="button"
                                    value="Add Game"
                                    disabled={!this.state.isEnabled}
                                    onClick={this.onAddGameClick} />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default connect( state => ({ players: getPlayers(state) }) , { onAddGame })(GameForm);