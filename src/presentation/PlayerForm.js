import React from 'react';
import {connect} from "react-redux";
import {onAddPlayer} from "../domain/actions";

class PlayerForm extends React.Component {

    nameRegex = /^[\w]{3,20}$/;

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
        this.setState({
            name: value,
            isEnabled: this.nameRegex.test(value)
        });
    };

    onAddPlayerClick = () => {
        const { name, isEnabled } = this.state;
        if (!isEnabled) return;
        this.props.onAddPlayer(name);
        this.setState(this.initialState);
    };

    render() {
        const { name, isEnabled } = this.state;
        return (
            <div className="component">
                <form>
                    <label>Add player</label>
                    <input
                        type="text"
                        value={name}
                        placeholder="player name"
                        onChange={this.onNameChange}/>
                    <input
                        type="button"
                        value="Add Player"
                        onClick={this.onAddPlayerClick}
                        disabled={!isEnabled}/>
                </form>
            </div>
        )
    }
}

export default connect(null, { onAddPlayer })(PlayerForm);