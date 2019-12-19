/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import ViewSpecificUser from '../../components/pages/admin/ViewSpecificUser';
import { checkAdmin } from '../../helpers/authHelper';

export class SpecificUSer extends Component {
  render() {
    const { userId } = this.props.match.params;
    return (
            <div>
              {checkAdmin() ? (<ViewSpecificUser userId={userId} />) : <Redirect to="/profile" />}
            </div>
    );
  }
}
SpecificUSer.propTypes = {
  match: PropTypes.object,
};

export default SpecificUSer;
