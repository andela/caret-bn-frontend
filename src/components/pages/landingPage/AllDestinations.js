/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Row, Col, Spinner } from 'react-bootstrap';
import { getLocations, getTopDestinations } from '../../../actions/locationActions';
import HighRatedAccommodation from './HighRatedAccommodations';

export class AllDestinations extends Component {
    state= {
      isLoading: false,
    }

    async componentDidMount() {
      const { getLocations: fetchLocations, getTopDestinations: fetchTopDestinations } = this.props;
      this.setState({ isLoading: true });
      await fetchTopDestinations();
      await fetchLocations();
      this.setState({ isLoading: false });
    }

    render() {
      const { isLoading } = this.state;
      const { locations, topDestinations } = this.props;
      const { data } = locations || {};
      const { data: topDestinationData } = topDestinations || {};

      return (
      <div className="landing-page">
{ isLoading ? (
<div className="d-flex justify-content-center">
        <Spinner animation="grow" size="lg" variant="primary" />
</div>
) : '' }
        <Row>
          <Col xs={12} md={8} className="destinations">
            {topDestinationData && (
              <Row>
              <h1 className="home-heading">Top destinations</h1>
              <div className="top-destinations">
              {
                topDestinationData ? topDestinationData.map((topLocation) => (
                  <div className="one-destination">
                        <img src={topLocation.images} alt="topLocation" />
                        <p className="location-name">
                          {topLocation.name}
                          <br />
                          {`${topLocation.numberOfVisits} recent visits`}
                        </p>
                  </div>
                )) : null
              }
              </div>
              </Row>
            )}
            <Row>
                <h1 className="home-heading">All destinations</h1>
                <div className="all-destinations">
              {
                 data ? data.map((location) => (
                  <div className="one-destination">
                        <img src={location.images} alt="location" />
                        <p className="location-name">{location.name}</p>
                  </div>
                 )) : null
              }
                </div>
            </Row>
          </Col>
          <Col xs={12} md={4} className="top-rated">
          <HighRatedAccommodation />
          </Col>
        </Row>
      </div>
      );
    }
}

AllDestinations.propTypes = {
  locations: PropTypes.object,
  topDestinations: PropTypes.object,
  getLocations: PropTypes.func,
  getTopDestinations: PropTypes.func,
};

const mapStateToProps = (state) => ({
  locations: state.locations.data,
  status: state.locations.status,
  topDestinations: state.locations.topData,
  highRated: state.accommodation.highRated,
});

export default compose(withRouter, connect(mapStateToProps, { getLocations, getTopDestinations }))(AllDestinations);
