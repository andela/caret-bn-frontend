import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import App from './components/App';
import store from './reduxStore';
import Users from './views/Authentication';
import NotFound from './components/NotFound';
import './styles/styles.scss';
import Register from './views/Register';

const Root = () => (
    <Provider store={store}>
        <Router>
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/users" component={Users} />
                <Route path="/register" component={Register} />
                <Route path="*" component={NotFound} />
            </Switch>
        </Router>
        <ToastContainer />
    </Provider>
);

ReactDOM.render(<Root />, document.getElementById('app'));
