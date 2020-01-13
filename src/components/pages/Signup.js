/* eslint-disable no-shadow */
/* eslint-disable no-useless-escape */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Button, Form } from 'react-bootstrap';
import { signupAction } from '../../actions/authActions';
import AlertComponent from '../global/AlertComponent';
import { hideAlert } from '../../actions/alertAction';

export class Signup extends Component {
  state = {
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    isLoading: false,
  };

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(nextProps) {
    const {
      dataError, status, history,
    } = nextProps;

    switch (status) {
      case 'success':
        history.push('/registered');
        this.setState({ isLoading: false });
        break;
      case 'error':
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

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (e) => {
    const { props } = this;
    e.preventDefault();

    const {
      email, username, password, confirmPassword,
    } = this.state;
    const userData = {
      email, username, password, confirmPassword,
    };

    this.setState((state) => ({ ...state, isLoading: true }));

    props.signupAction(userData);
  };

  render() {
    const {
      email, username, password, confirmPassword, isLoading,
    } = this.state;
    const { dataError } = this.props || {};

    return (
      <div className="signup-form">
        {dataError && <AlertComponent variant="danger" message={dataError.error ? `${dataError.error}` : `${dataError.message}`} />}
        <form onSubmit={this.handleSubmit} className="auth-form">
          <Form.Control data-test="email" type="email" id="email" name="email" placeholder="Email..." required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" value={email} onChange={this.handleChange} title="Enter a valid email. eg: johndoe@gmail.com" />
          <Form.Control data-test="username" type="text" id="username" name="username" placeholder="Username..." required pattern="[a-zA-Z]{3,10}" value={username} onChange={this.handleChange} title="Enter a valid name. Between 3 and 10 characters allowed." />
          <Form.Control data-test="password" type="password" id="password" name="password" placeholder="Password..." required pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}" value={password} onChange={this.handleChange} title="Enter an 8+ length valid password. Allowed = 1 Uppercase, 1 lowercase, 1 number, 1 special character." />
          <Form.Control data-test="confirmPassword" type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password..." required pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}" value={confirmPassword} onChange={this.handleChange} title="Enter an 8+ length valid password. Allowed = 1 Uppercase, 1 lowercase, 1 number, 1 special character." />
          <Button data-test="submitButton" type="submit">{isLoading ? <i style={{ fontSize: '20px' }} className="fas fa-spinner fa-pulse" /> : 'signup'}</Button>
        </form>
        <br />
        <div className="link">
          <Link to="/login">
            Login instead
          </Link>
        </div>
      </div>
    );
  }
}

Signup.propTypes = {
  signupAction: PropTypes.func.isRequired,
  hideAlert: PropTypes.func.isRequired,
  dataError: PropTypes.object,
  history: PropTypes.object.isRequired,
  status: PropTypes.string,
};

export const mapStateToProps = (state) => ({
  dataError: state.auth.dataError,
  data: state.auth.data,
  status: state.auth.status,
});

export default compose(withRouter, connect(mapStateToProps, { signupAction, hideAlert }))(Signup);
