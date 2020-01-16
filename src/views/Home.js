/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import AllDestinations from '../components/pages/landingPage/AllDestinations';

export class Home extends Component {
  render() {
    document.title = 'Barefoot Nomad - Home';
    return (
      <div>
        <AllDestinations />
      </div>
    );
  }
}

export default Home;
