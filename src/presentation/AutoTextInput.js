import React, {Component} from "react";

const KEY_CODE_ENTER = 13;
const KEY_CODE_UP = 38;
const KEY_CODE_DOWN = 40;

class AutoTextInput extends Component{

    constructor(props) {
        super(props);
        this.initialState = {
            inputValue: props.value,
            shouldShowSuggestions: false,
            filteredSuggestions: props.suggestions,
            selectedSuggestion: 0
        };
        this.state = this.initialState;
    }

    onInputChange = e => {
        const { suggestions } = this.props;
        const { value } = e.target;

        const filteredSuggestions = suggestions.filter(suggestion =>
            suggestion.toLowerCase().indexOf(value.toLowerCase()) > -1
        );

        this.setState({
            inputValue: value,
            shouldShowSuggestions: filteredSuggestions.length > 0,
            filteredSuggestions,
            selectedSuggestion: 0
        });

        this.props.onChange(e);
    };

    onKeyDown = e => {
        const { selectedSuggestion, filteredSuggestions } = this.state;
        if (filteredSuggestions.size <= 0) return;
        switch (e.keyCode) {
            case KEY_CODE_ENTER: {
                this.setState({
                    selectedSuggestion: 0,
                    shouldShowSuggestions: false,
                    inputValue: filteredSuggestions[selectedSuggestion]
                });
                e.target.name = this.props.name;
                e.target.value = filteredSuggestions[selectedSuggestion];
                this.props.onChange(e);
                break;
            }
            case KEY_CODE_UP: {
                if (selectedSuggestion === 0) return;
                this.setState({ selectedSuggestion: selectedSuggestion - 1 });
                break;
            }
            case KEY_CODE_DOWN: {
                if (selectedSuggestion - 1 === filteredSuggestions.length) return;
                this.setState({ selectedSuggestion: selectedSuggestion + 1 });
                break;
            }
            default: break;
        }
    };

    onSelect = e => {

        const newState = {
            ...this.state,
            inputValue: e.currentTarget.innerText,
            shouldShowSuggestions: false,
            selectedSuggestion: 0
        };

        this.setState(newState);

        e.target.name = this.props.name;
        e.target.value = e.currentTarget.innerText;
        this.props.onChange(e);
    };

    onFocus = () => {
        const { suggestions } = this.props;
        const value = this.state.inputValue;

        const filteredSuggestions = suggestions.filter(suggestion =>
            suggestion.toLowerCase().indexOf(value.toLowerCase()) > -1
        );

        this.setState({
            shouldShowSuggestions: filteredSuggestions.length > 0,
            filteredSuggestions,
            selectedSuggestion: 0
        });
    };

    onBlur = () => this.setState({shouldShowSuggestions: false});

    render() {

        const {
            shouldShowSuggestions,
            filteredSuggestions,
            selectedSuggestion
        } = this.state;

        let suggestionsElement = null;
        if (shouldShowSuggestions && filteredSuggestions.length > 0) {
            const suggestionItems = filteredSuggestions.map((suggestion, index) => {
                let className = "";
                if (index === selectedSuggestion) {
                    className = "suggestion-selected";
                }
                return (
                    <li className={className} key={suggestion} onMouseDown={this.onSelect}>
                        {suggestion}
                    </li>
                );
            });
            suggestionsElement = <ul className="suggestion-list">{suggestionItems}</ul>
        }

        return (
            <div>
                <input
                    type="text"
                    name={this.props.name}
                    placeholder={this.props.placeholder}
                    onChange={this.onInputChange}
                    onKeyDown={this.onKeyDown}
                    onBlur={this.onBlur}
                    onFocus={this.onFocus}
                    value={this.state.inputValue}
                />
                { suggestionsElement }
            </div>
        );
    }
}

export default AutoTextInput;