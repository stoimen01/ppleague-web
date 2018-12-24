import React, { Component } from "react";
import {connect} from "react-redux";
import GameForm from "./GameForm";
import TopFiveTable from "./TopPlayersTable";
import GamesTable from "./GamesTable";
import PlayerForm from "./PlayerForm";
import {onInit} from "../domain/actions";

class Root extends Component {

    componentDidMount() {
        this.props.onInit()
    }

    render() {
        return (
            <div className="root-container">
                <div className="head-line">
                    <h1>Ping Pong League</h1>
                </div>
                <div className="content-container">
                    <PlayerForm/>
                    <GameForm/>
                    <TopFiveTable/>
                    <GamesTable/>
                </div>
            </div>
        );
    }
}

export default connect(null, { onInit })(Root);