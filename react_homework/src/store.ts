import { Action, ActionCreator, Dispatch } from 'redux';

import { ThunkAction } from 'redux-thunk';

export interface StringTMap<T> { [key: string]: T; };
export interface RateMap extends StringTMap<number> {};

export interface RemoteData {
    rates: RateMap;
    base: string; // Base currency.
    data: string; // Date of format yyyy-mm-dd
}

export interface LoadingData extends Action<'LoadData'> {}
export interface LoadedData extends Action<'LoadedData'> {
    data: RemoteData;
}

export interface ChangeURL extends Action<'ChangeURL'> {
    url: string;
}

export interface ErrorAction extends Action<'ErrorAction'> {
    error: string;
}

export type AppActions = LoadingData | LoadedData | ChangeURL | ErrorAction;

/**
 * Async fetch of data from remote URL, throwing exception on invalid input or fetch.
 * @param url 
 */
const getDataFromApi = async (url: string) : Promise<RemoteData> => {
    if(url == null) {
        throw `No URL Provided`;  // eslint-disable-line no-throw-literal
    }

    return fetch(url).then(response => response.json()).catch(e => {throw e});
}

export const loadDataAction: ActionCreator<ThunkAction<Promise<void>, RemoteData, null, LoadedData>> = (url) => {
    return async (dispatch: Dispatch) => {
        const gettingDataAction: LoadingData = {
            type: 'LoadData'
        };
        dispatch(gettingDataAction);
        try{
            const data = await getDataFromApi(url);
            const loadedData: LoadedData = {
                data,
                type: 'LoadedData'
            };
            dispatch(loadedData);
        }catch(e){
            const err: ErrorAction = {
                type:'ErrorAction',
                error: e
            }
            dispatch(err);
        }
        
    }
}

export const changeURLAction: ActionCreator<ThunkAction<Promise<void>, null, null, ChangeURL>> = (url) => {
    return async (dispatch: Dispatch) => {
        const changeAction:  ChangeURL = {
            type: 'ChangeURL',
            url
        }
        
        dispatch(changeAction);
    }
}



export interface AppState {
    error?: string;
    url: string;
    rates?: RateMap ;
    date?: string; // yyyy-mm-dd
    loading: boolean;
}

export interface WrapState {
    appState: AppState;
}


export const initialAppState: AppState = {
    loading: false,
    url: 'https://api.exchangeratesapi.io/latest'
}
