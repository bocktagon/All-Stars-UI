import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

import HomePage from './HomePage.js'


ReactDOM.render(
	//<CardSelectorContainer />,
	//<CardDetails cardid="244" size="extra-small"/>,
	//<SortableCardTable />,
	<HomePage />,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
