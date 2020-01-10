/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { Button, Form } from 'react-bootstrap';
import userLogin from '../../actions/authActions';
import AlertComponent from '../global/AlertComponent';
import { hideAlert } from '../../actions/alertAction';

export class Login extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    email: '',
    password: '',
    isLoading: false,
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const {
      status,
    } = nextProps;
    switch (status) {
      case 'Success':
        window.location.replace('/');
        this.setState({ isLoading: false });
        break;
      case 'Failure':
        this.setState({ isLoading: false });
        break;
      default:
        break;
    }
  }

  async componentWillUnmount() {
    const { hideAlert } = this.props;
    await hideAlert();
  }

  submitForm = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const credentials = {
      email,
      password,
    };
    const { userLogin: login } = this.props;

    this.setState({ isLoading: true });

    login(credentials);
  };

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { isLoading, email, password } = this.state;
    const { dataError } = this.props || {};

    return (
      <div className="login-form">
        <form onSubmit={this.submitForm} className="auth-form">
          <Form.Control data-test="email" type="email" name="email" id="email" placeholder="Email..." onChange={this.handleChange} data="email" value={email} title="Enter a valid email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required />
          <Form.Control type="password" name="password" id="password" placeholder="Password..." onChange={this.handleChange} data="password" value={password} title="Enter your password" required />
          <Button type="submit" variant="primary">{isLoading ? <i style={{ fontSize: '20px' }} className="fas fa-spinner fa-pulse" /> : 'login'}</Button>
        </form>
        {dataError && <AlertComponent variant="danger" message={dataError.data.message} />}
        <Link to="/forgotpassword">
          <p className="forgot-password">Forgot password?</p>
        </Link>
        <Link to="/register">
          <p className="switch-auth">Signup instead</p>
        </Link>
      </div>
    );
  }
}

Login.propTypes = {
  userLogin: PropTypes.func,
  data: PropTypes.object,
  dataError: PropTypes.object,
  history: PropTypes.object.isRequired,
  status: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
  hideAlert: PropTypes.func,
};

const mapStateToProps = (state) => ({
  data: state.auth.data,
  dataError: state.auth.dataError,
  status: state.auth.status,
});

export default compose(withRouter, connect(mapStateToProps, { userLogin, hideAlert }))(Login);
