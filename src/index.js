import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './components/App';
import Users from './views/Autthentication';
import NotFound from './components/NotFound';

const Routes = (
    <Router>
        <Switch>
        <Route exact path="/" component={App} />
        <Route path="/users" component={Users} />
        <Route path="*" component={NotFound} />
        </Switch>
    </Router>
);

ReactDOM.render(Routes, document.getElementById('app'));
