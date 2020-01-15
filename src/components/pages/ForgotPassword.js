/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { resetPaswordRequest } from '../../actions/authActions';
import Input from '../global/Input';
import Button from '../global/Button';

export class Forgotpassword extends React.Component {
    state = {
      email: '',
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
  this.setState({ isLoading: true });
  await props.resetPaswordRequest(state.email);
  this.setState({ isLoading: false, email: '' });
}

render() {
  document.title = 'Barefoot Nomad - Forgot Password';
  const { email } = this.state;
  const { isLoading } = this.state;
  return (
        <div className="forgot-password">
            <h2><b>Get Reset Password Link</b></h2>
            <br />
                <form onSubmit={this.handleSubmit}>
                  <Input data-test="email" type="email" id="email" name="email" placeholder="Email..." required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" value={email} onChange={this.handleChange} title="Enter a valid email. eg: johndoe@gmail.com" />
                  <Button data-test="submitButton" name={isLoading ? <i style={{ fontSize: '20px' }} className="fas fa-spinner fa-pulse" /> : 'Submit'} />
                </form>
        </div>
  );
}
}

Forgotpassword.propTypes = {
  resetPaswordRequest: PropTypes.func.isRequired,
};

export const mapStateToProps = (state) => ({
  data: state.response.pass,
  error: state.response.passwordError,
});

export default compose(withRouter, connect(mapStateToProps, { resetPaswordRequest }))(Forgotpassword);
