/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import DeactivatedAccommodation from '../../components/pages/DeactivatedAccommodation';

export class GetAllDeactivatedAccommodations extends Component {
  render() {
    document.title = 'Barefoot Nomad - Accommodations';
    return (
      <div>
        <DeactivatedAccommodation data-test="DeactivatedAccommodation" />
      </div>
    );
  }
}

export default GetAllDeactivatedAccommodations;
