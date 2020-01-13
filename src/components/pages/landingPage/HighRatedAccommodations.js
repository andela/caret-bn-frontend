/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import { getHighRatedAccommodation } from '../../../actions/accommodationActions';

export class HighRatedAccommodation extends Component {
    state= {
      isLoading: false,
    }

    async componentDidMount() {
      const { getHighRatedAccommodation } = this.props;

      this.setState({ isLoading: true });
      await getHighRatedAccommodation();
      this.setState({ isLoading: false });
    }

    render() {
      const { isLoading } = this.state;
      const { highRated } = this.props;

      return (
      <div>
        <Row>{ isLoading ? <i className="fas fa-spinner fa-pulse loader-big" /> : '' }</Row>
          <Col className=" high-rated container-fluid">
          <h1 className="home-heading">Highest Rated</h1>
              <div className="top-accommodations">
              {
                highRated ? highRated.data.map((ratedAccommodation) => (
                  <Link to={`/accommodations/${ratedAccommodation.slug}`}>
                  <div className="one-accommodation">
                        <img src={(typeof (ratedAccommodation.images) === 'string') ? ratedAccommodation.images : ratedAccommodation.images[0]} alt="topRated" />
                        <p className="location-name">
                        {ratedAccommodation.name}
                        &nbsp;
                        /&nbsp;
                        {ratedAccommodation.cost}
                        &nbsp;
                        {ratedAccommodation.currency}
                        {' '}
                        per night
                        <div>
                        Rating:
                        {' '}
                        {ratedAccommodation.averageRating}
                        /5
                        </div>
                        </p>
                  </div>
                  </Link>
                )) : null
              }
              </div>
          </Col>
      </div>
      );
    }
}

HighRatedAccommodation.propTypes = {
  getHighRatedAccommodation: PropTypes.func,
  highRated: PropTypes.array,
};

const mapStateToProps = (state) => ({
  highRated: state.accommodation.highRated,
});

export default compose(withRouter, connect(mapStateToProps, { getHighRatedAccommodation }))(HighRatedAccommodation);
