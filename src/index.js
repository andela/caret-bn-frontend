import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './components/App';
import store from './reduxStore';
import Users from './views/Autthentication';
import NotFound from './components/NotFound';

const Root = () => (
    <Provider store={store}>
        <Router>
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/users" component={Users} />
                <Route path="*" component={NotFound} />
            </Switch>
        </Router>
    </Provider>
);

ReactDOM.render(<Root />, document.getElementById('app'));
