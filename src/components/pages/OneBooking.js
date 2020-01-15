import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Container, Row, Col, Card, Spinner,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getOneBooking } from '../../actions/bookingActions';
import Breadcrumbs from '../global/Breadcrumbs';

export class OneBooking extends Component {
  state = {
    isLoading: false,
  };

  componentDidMount = async () => {
    const { props } = this;
    const { id } = props.match.params;

    this.setState({ isLoading: true });
    await props.getOneBooking(id);
    this.setState({ isLoading: false });
  }

  renderStatus = (status) => {
    switch (status.id) {
      case 1:
        return (
          <Row className="font-weight-bold">
            Status:
            {' '}
            <span style={{ color: '#C2A90F' }} className="pl-1">
              {' '}
              {status.name}
            </span>
          </Row>
        );
      case 2:
        return (
          <Row className="font-weight-bold">
            Status:
            {' '}
            <span className="text-danger pl-1">
              {' '}
              {status.name}
            </span>
          </Row>
        );
      default:
        return (
          <Row className="font-weight-bold">
            Status:
            {' '}
            <span className="text-success pl-1">
              {' '}
              {status.name}
            </span>
          </Row>
        );
    }
  }

  render() {
    const { props, state } = this;
    const { id } = props.match.params;
    const { oneBooking } = props;
    const { isLoading } = state;

    if (oneBooking) {
      document.title = `Barefoot Nomad - Bookings - ${oneBooking.data.accommodation.name}`;
    }

    return (
      <Container fluid>
        <Row>
          <Col md={5} className="breadcrumbs">
            <Breadcrumbs itemsArray={['> Home', 'My Bookings', `Booking ${id}`]} />
          </Col>
        </Row>

        <Row>
          {isLoading ? <Spinner animation="grow" size="lg" variant="primary" /> : ''}
        </Row>

        {oneBooking && (
          <Row className="center-items">
            <Card className="single-booking-card" data-test="booking-card">
              <Card.Header style={{ textDecoration: 'none' }} className="text-primary font-weight-bold">
                  Accommodation:
                  {' '}
                  {oneBooking.data.accommodation.name}
              </Card.Header>
              <Card.Body>
                <Card.Text>
                  <Row>
                    <Col xs={12} sm={12} md={6} lg={6} className="description">
                        <Row>
                          <span className="font-weight-bold pr-1">Space Required:</span>
                          {' '}
                          {oneBooking.data.bookedSpace}
                          {' '}
                          rooms
                        </Row>
                        <Row>
                        <span className="font-weight-bold pr-1">Check In:</span>
                          {' '}
                          {oneBooking.data.checkIn}
                        </Row>
                        <Row>
                        <span className="font-weight-bold pr-1">Check Out:</span>
                          {' '}
                          {oneBooking.data.checkOut}
                        </Row>
                        {this.renderStatus(oneBooking.data.status)}
                    </Col>
                    <Col>
                      <img style={{ width: '100%' }} src={(typeof (oneBooking.data.accommodation.images) === 'string') ? oneBooking.data.accommodation.images : oneBooking.data.accommodation.images[0]} alt="accommodation" />
                    </Col>
                  </Row>
                </Card.Text>
              </Card.Body>
              <Card.Footer className="text-center font-weight-bold">
                <span className="pr-1">Total Cost:</span>
                {' '}
                <span className="text-success">
                  {oneBooking.data.accommodation.currency}
                  {' '}
                  {oneBooking.data.bookedSpace * oneBooking.data.accommodation.cost}
                </span>
              </Card.Footer>
            </Card>
          </Row>
        )}

      </Container>
    );
  }
}

OneBooking.propTypes = {
  match: PropTypes.object,
  oneBooking: PropTypes.any,
};

export const mapStateToProps = (state) => ({
  oneBooking: state.bookings.oneBookingData,
});

export default connect(mapStateToProps, { getOneBooking })(OneBooking);
