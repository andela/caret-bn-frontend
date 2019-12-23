/* eslint-disable no-nested-ternary */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';
import { getPendingBookings, approveBooking, rejectBooking } from '../../actions/bookingActions';
import Breadcrumbs from '../../components/global/Breadcrumbs';
import PageLoading from '../../components/global/PageLoading';
import isAuthenticated from '../../helpers/isAuthenticated';
import AlertComponent from '../../components/global/AlertComponent';

class PendingBookings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      userId: null,
      operation: null,
    };
  }

  componentDidMount = async () => {
    const { getPendingBookings } = this.props;
    const userInfo = isAuthenticated();
    console.log(userInfo);
    await this.setState({
      userId: userInfo.payload.id,
    });
    await getPendingBookings();
    this.setState({
      isLoading: false,
    });
  }

  dispatchRejectBooking = (id) => {
    this.setState({
      operation: 'rejected',
    });
    const { rejectBooking } = this.props;
    rejectBooking(id);
  }

  dispatchApproveBooking = (id) => {
    this.setState({
      operation: 'approved',
    });
    const { approveBooking } = this.props;
    approveBooking(id);
  }

  showBookings = () => {
    const { bookings, errorMessage, status } = this.props;
    const { operation } = this.state;
    return (
      <Container fluid>
        <Row>
          <Col md={5} className="breadcrumbs">
            <Breadcrumbs itemsArray={['Home', 'Boookings', 'Pending']} />
          </Col>
        </Row>
        <Row className="center-items">
          <h1>Your Pending Bookings</h1>
        </Row>
        <Row className="error-holder">
          {
            (status === 'fail')
              ? <AlertComponent variant="danger" message={errorMessage} heading="Something went wrong...." dismissible />
              : (status === 'success')
                ? <AlertComponent variant="success" message={`Booking ${operation} successfully`} heading={`${operation}`} dismissible />
                : ''
          }
        </Row>

        <Row>
          {bookings.data.map((booking, index) => (
            <Col sm={12} md={6} lg={4} key={index}>
              <div className="booking-tile">
                <Row>
                  Accommodation:
                  {' '}
                  {booking.accommodation.name}
                </Row>
                <Row>
                  Space Required:
                  {' '}
                  {booking.bookedSpace}
                  {' '}
                  rooms
                </Row>
                <Row>
                  Booking made by:
                  {' '}
                  {booking.user.username}
                  {' '}
                  {booking.user.email}
                </Row>
                <Row>
                  Check In:
                  {' '}
                  {booking.checkIn}
                </Row>
                <Row>
                  Check Out:
                  {' '}
                  {booking.checkOut}
                </Row>
                <Row className="btn-holder">
                  <Button variant="outline-success" className="full-width-buttons" onClick={() => this.dispatchApproveBooking(booking.id)}>Accept</Button>
                  <Button variant="outline-danger" className="full-width-buttons" onClick={() => this.dispatchRejectBooking(booking.id)}>Reject</Button>
                </Row>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    );
  }

  render() {
    const { isLoading, userId } = this.state;
    return (
      <div className="d-flex justify-content-center">
        {isLoading ? <PageLoading /> : (
          <this.showBookings />
        )}
      </div>
    );
  }
}

export const mapStateToProps = (state) => ({
  bookings: state.bookings.pending,
  errorMessage: state.bookings.dataError,
  status: state.bookings.status,
});
export default connect(mapStateToProps, { getPendingBookings, approveBooking, rejectBooking })(PendingBookings);
