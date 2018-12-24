import React, { Component } from 'react';
import {onAddGame} from "../domain/actions";
import {connect} from "react-redux";
import {getPlayers} from "../domain/selectors";

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

    onNameChange = (event) => {
        const { name, value } = event.target;
        this.setState({
           [name] : value,
        });
        this.validate();
    };

    onScoreChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name] : value,
        });
        this.validate();
    };

    onAddGameClick = () => {
        if (!this.state.isEnabled) return;
        const { player1Name, player2Name, player1Score, player2Score } = this.state;
        this.props.addGame(player1Name, player2Name, player1Score, player2Score);
    };

    validate() {
        const { player1Name, player2Name, player1Score, player2Score } = this.state;
        let isEnabled =
            player1Name.length > 0 &&
            player2Name.length > 0 &&
            player1Score.length > 0 &&
            player2Score.length > 0;
        this.setState({ isEnabled })
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
                                    onChange={this.onNameChange} />
                            </td>
                            <td>vs</td>
                            <td>
                                <input
                                    type="text"
                                    name="player2Name"
                                    placeholder="player name"
                                    onChange={this.onNameChange} />
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
                                    onChange={this.onScoreChange} />
                            </td>
                            <td>-</td>
                            <td>
                                <input
                                    type="text"
                                    name="player2Score"
                                    placeholder={this.state.player2Name + " score"}
                                    onChange={this.onScoreChange} />
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

export default connect( state => ({ players: getPlayers(state) }) , { addGame: onAddGame })(GameForm);