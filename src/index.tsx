import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App';

import { makeAutoObservable } from "mobx";

import { AppState } from './AppState';

ReactDOM.render(<App state={makeAutoObservable(new AppState())} />, document.getElementById('root'));
