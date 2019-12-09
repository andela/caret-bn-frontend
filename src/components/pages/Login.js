/* eslint-disable camelcase */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { compose } from 'redux';
import Input from '../global/Input';
import Button from '../global/Button';
import userLogin from '../../actions/authActions';

export class Login extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    email: '',
    password: '',
    isLoading: false,
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const {
      data, dataError, status, history,
    } = nextProps;
    switch (status) {
      case 'Success':
        toast.success(data.message);
        history.push('/');
        this.setState({ isLoading: false });
        break;
      case 'Failure':
        toast.error(dataError.data.message);
        this.setState({ isLoading: false });
        break;
      default:
        break;
    }
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

    return (
      <div className="login-form">
        <form onSubmit={this.submitForm}>
          <Input type="email" name="email" id="email" placeholder="Email..." onChange={this.handleChange} data="email" value={email} title="Enter a valid email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required />
          <Input type="password" name="password" id="password" placeholder="Password..." onChange={this.handleChange} data="password" value={password} title="Enter your password" required />
          <Button name={isLoading ? <i style={{ fontSize: '20px' }} className="fas fa-spinner fa-pulse" /> : 'login'} />
        </form>
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
  userLogin: PropTypes.func.isRequired,
  data: PropTypes.object,
  dataError: PropTypes.object,
  history: PropTypes.object.isRequired,
  status: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  data: state.auth.data,
  dataError: state.auth.dataError,
  status: state.auth.status,
});

export default compose(withRouter, connect(mapStateToProps, { userLogin }))(Login);
