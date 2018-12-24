import React from 'react';
import ReactDOM from 'react-dom';
import Root from "./presentation/Root";
import {createStore} from "redux";
import {Provider} from "react-redux";
import AppReducer from "./domain/reducers/AppReducer";
import './index.css';

ReactDOM.render(
    <Provider store={createStore(AppReducer)}>
        <Root />
    </Provider>,
    document.getElementById('root')
);