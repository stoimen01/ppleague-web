import React, { Component } from 'react';
import {addGame} from "../domain/actions";
import {connect} from "react-redux";
import {getPlayers} from "../domain/selectors";

class GameForm extends Component {

    constructor(props) {
        super(props);
        this.initialState = {
            isAddingOpponents: true,
            player1Name: "",
            player2Name: ""
        };
        this.state = this.initialState;
    }

    onNameChange = (event) => {
        const { name, value } = event.target;
        this.setState({
           [name] : value,
        });
    };

    onScoreChange = (event) => {

    };

    onAddGameClick = () => {
        this.setState({
            isAddingOpponents: true
        });
        this.props.addGame()
    };

    onNextClick = () => {
        this.setState({
            isAddingOpponents: false
        })
    };

    render() {

        const opponentsElement = (
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
                    <td colSpan={3}>
                        <input
                            type="button"
                            value="Next"
                            onClick={this.onNextClick} />
                    </td>
                </tr>
            </tbody>
        );

        const scoresElement = (
            <tbody>
                <tr>
                    <td colSpan={2}>
                        <label>{this.state.player1Name}</label>
                    </td>
                    <td>
                        <input type="text" placeholder="score" onChange={this.onScoreChange}/>
                    </td>
                </tr>
                <tr>
                    <td colSpan={2}>
                        <label>{this.state.player2Name}</label>
                    </td>
                    <td>
                        <input type="text" placeholder="score" onChange={this.onScoreChange}/>
                    </td>
                </tr>
                <tr>
                    <td colSpan={3}><input type="button" value="Add" onClick={this.onAddGameClick}/></td>
                </tr>
            </tbody>
        );

        return (
            <div className="component">
                <form>
                    <table>
                        <thead>
                        <tr>
                            <th colSpan={3}>Add game</th>
                        </tr>
                        </thead>
                        { this.state.isAddingOpponents ? opponentsElement : scoresElement }
                    </table>
                </form>
            </div>
        )
    }
}

export default connect( state => ({ players: getPlayers(state) }) , { addGame })(GameForm);