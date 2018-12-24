import {INIT} from "../actions";
import {Cmd, loop} from "redux-loop";
import {DATA_LOAD_FAIL, DATA_LOADED, onDataLoaded, onDataLoadError} from "../actions";

const initState = { isLoading: false, hasError: false };

const tryLoadData = () => fetch('/data').then(res => res.json());

const RootReducer = (state = initState, action) => {
    switch (action.type) {

        case INIT:
            return loop(
                { ...state, isLoading: true },
                Cmd.run(tryLoadData, {
                    successActionCreator: onDataLoaded,
                    failActionCreator: onDataLoadError,
                })
            );

        case DATA_LOAD_FAIL:
            return { isLoading: false, hasError: true };

        case DATA_LOADED:
            return { isLoading: false, hasError: false };

        default:
            return state;
    }
};

export default RootReducer;