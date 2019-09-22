import { Reducer, combineReducers } from "redux";
import { AppActions, initialAppState, AppState, StoreState } from "./store";

/**
 * Mapping of actions to reducer function
 * @param state
 * @param action
 */
const remoteReducer: Reducer<AppState, AppActions> = (
  state = initialAppState,
  action: AppActions
) => {
  const type = action.type;
  switch (action.type) {
    case "LoadData":
      return {
        ...state,
        loading: true
      };
    case "LoadedData":
      const { rates, base, data } = action.data;
      return {
        ...state,
        rates,
        base,
        date: data,
        loading: false
      };
    case "ChangeURL":
      const { url } = action;
      return {
        ...state,
        url
      };
    case "ErrorAction":
      const { error } = action;
      return {
        ...state,
        rates: {},
        loading: false,
        error
      };

    default:
      console.log(`Unknown action: ${type}`);
  }
  return state;
};

export const rootReducer = combineReducers<StoreState>({
  appState: remoteReducer
});
