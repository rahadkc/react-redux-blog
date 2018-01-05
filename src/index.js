import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './index.css';
import App from './App';
import SinglePost from './component/SinglePost';
import NoMatch from './component/NoMatch';
import { Provider } from 'react-redux';
import store from './store';

ReactDOM.render(
    <Provider store={store} >
        <HashRouter>
            <Switch>
                {/* <Route exact path={`/`} component={App} />
                <Route path={`/post/:id`} component={SinglePost} />
                <Route path={`/liked`} component={App} />
                <Route path={`/bookmark`} component={App} /> */}

                <Route exact path={`${process.env.PUBLIC_URL}/`} component={App} />
                <Route path={`${process.env.PUBLIC_URL}/post/:id`} component={SinglePost} />
                <Route path={`${process.env.PUBLIC_URL}/liked`} component={App} />
                <Route path={`${process.env.PUBLIC_URL}/bookmark`} component={App} />
                <Route component={NoMatch} />
            </Switch>
        </HashRouter>
    </Provider>, 
    document.getElementById('root'));
