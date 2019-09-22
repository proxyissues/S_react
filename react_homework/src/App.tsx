import React from 'react';
import { connect } from 'react-redux';
import './App.scss';

import { RateMap, WrapState, changeURLAction, loadDataAction } from './store';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';


import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';



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
        
        <div className="header-block">
          <div className="control-block">
            <div>Remote URL:</div>
            <div><input className="url-field" onChange={handleChange} value={props.url} /></div>
            <div><Button variant="contained" color="primary" onClick={fetchData}>Fetch Data</Button></div>
            {props.loading ? <CircularProgress className="spinner"/> :''}  
          </div>
          
        </div>
        
        <p className="error">{props.error}</p>
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
