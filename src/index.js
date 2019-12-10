import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './reduxStore';
import './styles/styles.scss';
import 'regenerator-runtime/runtime';
import App from './App';

const Root = () => (
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
);

ReactDOM.render(<Root />, document.getElementById('app'));
