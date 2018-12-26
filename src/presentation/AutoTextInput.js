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
    
    filterSuggestions(input) {
        const { suggestions } = this.props;
        return suggestions.filter(suggestion =>
            suggestion.toLowerCase().indexOf(input.toLowerCase()) > -1
        );
    }

    onInputChange = e => {
        const { value } = e.target;
        const filteredSuggestions = this.filterSuggestions(value);
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
        const text = e.currentTarget.innerText;
        this.setState({
            ...this.state,
            inputValue: text,
            shouldShowSuggestions: false,
            selectedSuggestion: 0
        });
        this.props.onChange({
            target: {
                name: this.props.name,
                value: text
            }
        });
    };

    onFocus = () => {
        const value = this.state.inputValue;
        const filteredSuggestions = this.filterSuggestions(value);
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