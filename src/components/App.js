
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { fireReduxAction } from '../actions/defaultAction';

export class App extends Component {
  componentDidMount() {
    const { props } = this;
    props.fireReduxAction();
  }

  render() {
    return (
      <div className="header">
        <h1>Welcome to barefoot Nomad</h1>
        <br />
        <h4>
          <Link to="/users" className="link">Login</Link>
        </h4>
        <br />
        <h4>
          <Link to="/register" className="link">Register</Link>
        </h4>
        <br />
      </div>
    );
  }
}

App.propTypes = {
  fireReduxAction: PropTypes.func.isRequired,
};

export const mapStateToProps = (state) => ({
  default: state.default,
});

export default connect(mapStateToProps, { fireReduxAction })(App);
