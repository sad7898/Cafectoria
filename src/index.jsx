import 'bootstrap';
import ReactDOM from 'react-dom'
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'
import './images/Quicksand/static/Quicksand-Medium.ttf'
import Bundle from './pages/Bundle.jsx'
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store/store.js';

const serviceWorker = require('./serviceWorker')
serviceWorker.register();
ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Bundle/>
        </BrowserRouter>
    </Provider>
    ,document.getElementById('root'))

