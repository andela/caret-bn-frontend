/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { Redirect, withRouter } from 'react-router-dom';
import { resetPasword } from '../../actions/authActions';
import Input from '../global/Input';
import Button from '../global/Button';

export class ResetPassword extends React.Component {
    state = {
      newPassword: '',
      confirmPassword: '',
      isLoading: false,
    };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

handleSubmit = async (e) => {
  e.preventDefault();
  const { props, state } = this;
  const { token } = props;

  this.setState({ isLoading: true });
  await props.resetPasword(state.newPassword, state.confirmPassword, token);
  this.setState({ isLoading: false, newPassword: '', confirmPassword: '' });
}

render() {
  document.title = 'Barefoot Nomad - Reset Password';
  const { newPassword, confirmPassword } = this.state;
  const { data } = this.props;
  const { isLoading } = this.state;
  return (
        <div className="forgot-password">
          {data && data.message && <Redirect to="/login" />}
       <h2>Reset your password</h2>
         <br />
        <form onSubmit={this.handleSubmit}>
          <Input data-test="password" type="password" id="newPassword" name="newPassword" placeholder="New Password..." required pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}" value={newPassword} onChange={this.handleChange} title="Enter an 8+ length valid password. Allowed = 1 Uppercase, 1 lowercase, 1 number, 1 special character." />
          <Input data-test="confirmPassword" type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password..." required pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}" value={confirmPassword} onChange={this.handleChange} title="Enter an 8+ length valid password. Allowed = 1 Uppercase, 1 lowercase, 1 number, 1 special character." />
          <Button data-test="submitButton" name={isLoading ? <i style={{ fontSize: '20px' }} className="fas fa-spinner fa-pulse" /> : 'Submit'} />
        </form>
        </div>
  );
}
}

ResetPassword.propTypes = {
  resetPasword: PropTypes.func.isRequired,
};

export const mapStateToProps = (state) => ({
  data: state.response.pass,
  error: state.response.passwordError,
});

export default compose(withRouter, connect(mapStateToProps, { resetPasword }))(ResetPassword);
