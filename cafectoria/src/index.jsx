import 'bootstrap';
import ReactDOM from 'react-dom'
import React from 'react'
import { useState, useEffect } from 'react';
import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import './images/Quicksand/static/Quicksand-Medium.ttf'
import Bundle from './pages/Bundle.jsx'
import Navigation from './components/nav.jsx'
import {BrowserRouter} from 'react-router-dom';
import {CustomFooter} from './components/footer.jsx';
import {Provider} from 'react-redux';
import store from './store/store.js';

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Navigation/>
            <Bundle/>
            <CustomFooter>Blackmarble Corps. ltd</CustomFooter>
        </BrowserRouter>
    </Provider>
    ,document.getElementById('root'))

