/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import AllAccommodation from '../../components/pages/AllAccommodation';

export class GetAllAccommodations extends Component {
  render() {
    document.title = 'Barefoot Nomad - Accommodations';
    return (
      <div>
        <AllAccommodation data-test="AllAccommodation" />
      </div>
    );
  }
}

export default GetAllAccommodations;
