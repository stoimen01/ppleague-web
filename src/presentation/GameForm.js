import React, { Component } from 'react';
import {onAddGame} from "../domain/actions";
import {connect} from "react-redux";
import {getPlayers} from "../domain/selectors";
import AutoTextInput from "./AutoTextInput";

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
        this.props.onAddGame(player1.id, parseInt(player1Score), player2.id, parseInt(player2Score));
        this.setState(this.initialState);
    };

    validate(state) {
        const { player1Name, player2Name, player1Score, player2Score } = state;

        if (!(player1Name.length > 0 &&
            player2Name.length > 0 &&
            player1Score.length > 0 &&
            player2Score.length > 0) ||
            player1Name === player2Name ||
            player1Score === player2Score ||
            !(scoreRegex.test(player1Score) && scoreRegex.test(player2Score))
        ) {
            this.setState({...state, isEnabled: false});
            return;
        }

        const players = this.props.players;
        const player1 = players.find((player) => player1Name === player.name);
        const player2 = players.find((player) => player2Name === player.name);

        if (!(player1 && player2)) {
            this.setState({...state, isEnabled: false});
            return;
        }

        this.setState({...state, isEnabled: true});
        return [player1, player2, player1Score, player2Score]
    }

    render() {
        return (
            <div className="component">
                <table>
                    <thead>
                        <tr>
                            <th colSpan={3}>Add Game</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <AutoTextInput
                                    name="player1Name"
                                    placeholder={"player name"}
                                    value={this.state.player1Name}
                                    onChange={this.onFieldChange}
                                    suggestions={this.props.players.map((player) => player.name)}
                                />
                            </td>
                            <td>vs</td>
                            <td>
                                <AutoTextInput
                                    name="player2Name"
                                    placeholder={"player name"}
                                    value={this.state.player2Name}
                                    onChange={this.onFieldChange}
                                    suggestions={this.props.players.map((player) => player.name)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input
                                    type="text"
                                    name="player1Score"
                                    placeholder={this.state.player1Name + " score"}
                                    value={this.state.player1Score}
                                    onChange={this.onFieldChange} />
                            </td>
                            <td>-</td>
                            <td>
                                <input
                                    type="text"
                                    name="player2Score"
                                    placeholder={this.state.player2Name + " score"}
                                    value={this.state.player2Score}
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