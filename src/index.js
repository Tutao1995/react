import React from 'react';
import ReactDOM from 'react-dom';
import Game from './App';
import './app.css'


setInterval(() => {
    ReactDOM.render(<Game date={new Date()}/>, document.getElementById('root'));
},1000)

