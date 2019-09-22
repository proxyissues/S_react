import React from "react";
import { connect } from "react-redux";
import "./App.scss";

import {
  RateMap,
  StoreState,
  changeURLAction,
  loadDataAction,
  notifyUser
} from "./store";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { DataTable } from "./DataTable";
import { BaseModal } from "./BaseDialog";

export interface Props {
  loadData?: (url: string) => void;
  url?: string;
  changeURL?: (url: string) => void;
  clearError?: () => void;
  loading: boolean;
  currency?: string;
  rates?: RateMap;
  error?: string;
}

const App: React.FC<Props> = props => {
  const fetchData = () => {
    if (props.loadData && props.url) {
      props.loadData(props.url);
    }
  };
  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    props.changeURL!(event.currentTarget.value || "");
  };

  const noop = () => {};

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-block">
          <div className="control-block">
            <div>Remote URL:</div>
            <div>
              <input
                className="url-field"
                onChange={handleChange}
                value={props.url}
              />
            </div>
            <div>
              <Button variant="contained" color="primary" onClick={fetchData}>
                Fetch Data
              </Button>
            </div>
            {props.loading ? <CircularProgress className="spinner" /> : ""}
          </div>
        </div>

        {props.error ? (
          <BaseModal
            message={props.error}
            closeModal={props.clearError || noop}
          />
        ) : (
          ""
        )}
      </header>
      <DataTable rates={props.rates} />
    </div>
  );
};

const mapStateToProps = ({
  appState: { loading, url, rates, error }
}: StoreState) => {
  return {
    loading,
    url,
    rates,
    error
  };
};

const mapDispatchProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    loadData: (url: string) => dispatch(loadDataAction(url)),
    changeURL: (url: string) => dispatch(changeURLAction(url)),
    clearError: () => dispatch(notifyUser())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchProps
)(App);
