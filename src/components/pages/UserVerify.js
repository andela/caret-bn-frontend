/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { Redirect } from 'react-router-dom';
import { VerifyUsers } from '../../actions/authActions';

// eslint-disable-next-line react/prefer-stateless-function
export class VerifyUser extends React.Component {
  componentDidMount() {
    const { token } = this.props;
    this.props.VerifyUsers(token);
  }

  render() {
    document.title = 'Barefoot Nomad - Verification';
    const { error, payload } = this.props.verify;
    return (
    <div>
      <h4>
        Verification in Progress...
        <br />
        Please Wait...
        <br />
        <br />
        <i style={{ fontSize: '50px', color: '#073763' }} className="fas fa-spinner fa-pulse" />
      </h4>
      {payload && toast.success(payload.message)}
      {error && toast.error(error.message)}
      {(payload || error) && <Redirect to="/login" />}

    </div>
    );
  }
}
export const mapStateToProps = (state) => ({
  verify: state.verify,
});
const MapDispatchToProps = {
  VerifyUsers,
};
export default connect(mapStateToProps, MapDispatchToProps)(VerifyUser);
