/**
 * Created by dandan.wu on 16/9/13.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router,Route,hashHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';

import routes from './routes';
import store from './store';
import injectStore2Route from './utils/injectStore2Route';

const history = syncHistoryWithStore(hashHistory,store);
let root = (
    <Provider store={store}>
        <Router history={history} routes={injectStore2Route(routes,store)}/>
    </Provider>
);

ReactDOM.render(root,document.getElementById('react-root'));