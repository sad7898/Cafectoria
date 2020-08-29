import 'bootstrap';
import ReactDOM from 'react-dom'
import React from 'react'
import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import './images/Quicksand/static/Quicksand-Medium.ttf'
import Landing from './pages/landing.jsx'
import Navigation from './components/nav.jsx'
import {BrowserRouter} from 'react-router-dom';
ReactDOM.render(
    <BrowserRouter>
        <Navigation/>
        <Landing/>
    </BrowserRouter>
    ,document.getElementById('root'))