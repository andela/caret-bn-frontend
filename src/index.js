import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import store from './reduxStore';
import AuthPage from './views/Authentication';
import NotFound from './components/NotFound';
import './styles/styles.scss';
import 'regenerator-runtime/runtime';


const Root = () => (
    <Provider store={store}>
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/login" component={AuthPage} />
                <Route path="/register" component={AuthPage} />
                <Route path="*" component={NotFound} />
            </Switch>
        </Router>
        <ToastContainer />
    </Provider>
);

ReactDOM.render(<Root />, document.getElementById('app'));
