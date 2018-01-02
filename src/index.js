import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Link, NavLink, Switch} from 'react-router-dom';
import './index.css';
import App from './App';
import Liked from './Liked';
import Bookmark from './Bookmark';
import NoMatch from './component/NoMatch';
import { Provider } from 'react-redux';
import store from './store';

ReactDOM.render(
    <Provider store={store} >
        <Router>
            <Switch>
                <Route exact path='/' component={App} />
                <Route path='/liked' component={App} />
                <Route path='/bookmark' component={App} />
                <Route component={NoMatch} />
            </Switch>
        </Router>
    </Provider>, 
    document.getElementById('root'));
