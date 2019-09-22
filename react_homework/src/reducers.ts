import { Reducer, combineReducers } from "redux";
import { AppActions, initialAppState, AppState, WrapState } from "./store";

const remoteReducer: Reducer<AppState, AppActions> = (
    state = initialAppState,
    action
) => {
    
    switch(action.type){
        case 'LoadData': 
            return {
                ...state,
                loading: true
            }
        case 'LoadedData': 
            const {rates, base, data} = action.data;
            return {
                ...state,
                rates,
                base,
                date: data,
                loading: false
            }
        case 'ChangeURL':
            const { url } = action;
            return {
                ...state,
                url
            }
        default:
            console.log(`Unknown action: ${action}`);
    }
    return state;
}

export const rootReducer = combineReducers<WrapState>({appState: remoteReducer})