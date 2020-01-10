/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import DeactivatedAccommodation from '../../components/pages/DeactivatedAccommodation';

export class GetAllDeactivatedAccommodations extends Component {
  render() {
    return (
      <div>
        <DeactivatedAccommodation data-test="DeactivatedAccommodation" />
      </div>
    );
  }
}

export default GetAllDeactivatedAccommodations;
