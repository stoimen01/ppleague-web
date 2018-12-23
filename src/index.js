import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TopFiveTable from "./TopFiveTable";

class App extends React.Component {
    render() {
        const players = [
            {
                id: "123",
                number: "0",
                name: "Josh",
                wins: 10,
                losses: 10,
                winRate: "20%"
            },
            {
                id: "1234",
                number: "1",
                name: "Bob",
                wins: 10,
                losses: 10,
                winRate: "20%"
            }
        ];

        return (
          <div>
              <TopFiveTable players={players}/>
          </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));