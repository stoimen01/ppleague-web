import React from 'react';
import {connect} from "react-redux";
import {onAddPlayer} from "../domain/actions";

class PlayerForm extends React.Component {

    constructor(props) {
        super(props);
        this.initialState = {
            name: "",
            isEnabled: false
        };
        this.state = this.initialState
    }

    onNameChange = (event) => {
        const { value } = event.target;
        const nameRegex = /^[a-zA-Z0-9]{3,20}$/;
        this.setState({
            name: value,
            isEnabled: nameRegex.test(value)
        });
    };

    onAddPlayerClick = () => {
        const { name, isEnabled } = this.state;
        if (!isEnabled) return;
        this.props.addPlayer(name)
    };

    render() {
        const { name, isEnabled } = this.state;
        return (
            <div className="component">
                <form>
                    <label htmlFor="add">Add player</label>
                    <input
                        id="add"
                        type="text"
                        name="name"
                        value={name}
                        placeholder="player name"
                        onChange={this.onNameChange}/>
                    <input type="button" value="Add Player" onClick={this.onAddPlayerClick} disabled={!isEnabled}/>
                </form>
            </div>
        )
    }
}

export default connect(null, { addPlayer: onAddPlayer })(PlayerForm);