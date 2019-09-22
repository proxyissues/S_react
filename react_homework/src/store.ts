import { Action, ActionCreator, Dispatch } from "redux";

import { ThunkAction } from "redux-thunk";

export interface StringTMap<T> {
  [key: string]: T;
}
export interface RateMap extends StringTMap<number> {}

export interface RemoteData {
  rates: RateMap;
  base: string; // Base currency.
  data: string; // Date of format yyyy-mm-dd
  error?: string;
}

export interface LoadingData extends Action<"LoadData"> {}
export interface LoadedData extends Action<"LoadedData"> {
  data: RemoteData;
}

export interface ChangeURL extends Action<"ChangeURL"> {
  url: string;
}

export interface ErrorAction extends Action<"ErrorAction"> {
  error: string | undefined;
}

export type AppActions = LoadingData | LoadedData | ChangeURL | ErrorAction;

/**
 * Async fetch of data from remote URL, throwing exception on invalid input or fetch.
 * @param url Passed to 'fetch' as-is
 */
const getDataFromApi = async (url: string): Promise<RemoteData> => {
  if (url == null) {
    throw `No URL Provided`; // eslint-disable-line no-throw-literal
  }

  return fetch(url)
    .then(response => response.json())
    .catch(e => {
      throw `Fetch result: ${e.message}`; // eslint-disable-line no-throw-literal
    });
};

/**
 * Load data from the target URL. Asynchronously updates the {@link AppState#loading} flag as well as {@link AppState#rates}, {@link AppState#error}
 * if applicable.
 * @param url Target of load operation, passed as-is to network call
 * @throws string based exception containing error result or networking error
 */
export const loadDataAction: ActionCreator<
  ThunkAction<Promise<void>, RemoteData, null, LoadedData>
> = url => {
  return async (dispatch: Dispatch) => {
    const gettingDataAction: LoadingData = {
      type: "LoadData"
    };
    dispatch(gettingDataAction);
    try {
      const data = await getDataFromApi(url);
      if (data.error) {
        throw data.error;
      }
      const loadedData: LoadedData = {
        data,
        type: "LoadedData"
      };
      dispatch(loadedData);
    } catch (e) {
      const err: ErrorAction = {
        type: "ErrorAction",
        error: e
      };
      dispatch(err);
    }
  };
};

/**
 * Change application target URL for data.  Passed as-is without validation
 * @param url unvalidated URL
 */
export const changeURLAction: ActionCreator<
  ThunkAction<Promise<void>, null, null, ChangeURL>
> = url => {
  return async (dispatch: Dispatch) => {
    const changeAction: ChangeURL = {
      type: "ChangeURL",
      url
    };

    dispatch(changeAction);
  };
};

/**
 * Notify the user of an error
 * @param message Message to be displayed, or undefined to clear the error message
 */
export const notifyUser: ActionCreator<
  ThunkAction<Promise<void>, null, null, ErrorAction>
> = (message: string | undefined) => {
  return async (dispatch: Dispatch) => {
    const err: ErrorAction = {
      type: "ErrorAction",
      error: message
    };
    dispatch(err);
  };
};

/**
 * Application state, simple object
 */
export interface AppState {
  error?: string;
  url: string;
  rates?: RateMap;
  date?: string; // yyyy-mm-dd
  loading: boolean;
}

/**
 * State wrapper for mapping/reducer syntax
 */
export interface StoreState {
  appState: AppState;
}

export const initialAppState: AppState = {
  loading: false,
  url: "https://api.exchangeratesapi.io/latest"
};
