import React from 'react';
import {connect} from "react-redux";
import {addPlayer} from "../domain/actions";
import './PlayerForm.css';

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
        const nameRegex = /[a-zA-Z0-9]{2,20}/;
        this.setState({
            name: value,
            isEnabled: nameRegex.test(value)
        });
    };

    onAddPlayerClick = () => {
        const { name, isEnabled } = this.state;
        if (isEnabled) {
            this.props.addPlayer(name)
        }
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
                    <input type="button" value="Submit" onClick={this.onAddPlayerClick} disabled={!isEnabled}/>
                </form>
            </div>
        )
    }
}

export default connect(null, { addPlayer })(PlayerForm);