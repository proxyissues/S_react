import React from 'react';
import { connect } from 'react-redux';
import './App.scss';

import { RateMap, WrapState, changeURLAction, loadDataAction } from './store';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';



export interface Props {
  loadData?: () => void;
  url?: string;
  changeURL?: (url: string) => void;
  loading?: boolean;
  currency?: string;
  rates?: RateMap;
  error?: string ;
}

const App: React.FC<Props> = (props) => {
  const fetchData = () => {
    props.loadData ? props.loadData() : console.log("Fetch");
  }
  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    props.changeURL!(event.currentTarget.value || '');
  };
  
  return (
    <div className="App">
      <header className="App-header">
        
        <p className="remote-fields">
          <span>Remote URL: </span><input className="url-field" onChange={handleChange} value={props.url} />
        </p>
        <p>
         <button onClick={fetchData}>Fetch Data</button>
        </p>
        
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}


const mapStateToProps = (store: WrapState) => {
  return {
    loading: store.appState.loading,
    url: store.appState.url,
    rates: store.appState.rates,
    error: store.appState.error
  }
};

const mapDispatchProps = (dispatch: ThunkDispatch<any, any, AnyAction>, ownProps: Props) => {
  return {
    loadData: () => dispatch(loadDataAction(ownProps.url)),
    changeURL: (url: string) => dispatch(changeURLAction(url))
  }
};

export default connect(mapStateToProps, mapDispatchProps)(App);
