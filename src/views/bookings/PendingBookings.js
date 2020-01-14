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
import { Card } from 'react-bootstrap';
import { getPendingBookings, approveBooking, rejectBooking } from '../../actions/bookingActions';
import Breadcrumbs from '../../components/global/Breadcrumbs';
import PageLoading from '../../components/global/PageLoading';
import isAuthenticated from '../../helpers/isAuthenticated';
import AlertComponent from '../../components/global/AlertComponent';
import Confirm from '../../components/global/Confirm';

class PendingBookings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      userId: null,
      operation: null,
      isProcessing: false,
    };
  }

  componentDidMount = async () => {
    const { getPendingBookings } = this.props;

    const userInfo = isAuthenticated();

    this.setState({
      userId: userInfo.payload.id,
    });

    await getPendingBookings();

    this.setState({
      isLoading: false,
    });
  }

  actionSwitch = async (action, id) => {
    this.setState({
      isProcessing: true,
    });

    switch (action) {
      case 'approve':
        this.dispatchApproveBooking(id);
        break;
      default:
        this.dispatchRejectBooking(id);
    }
  }

  dispatchRejectBooking = async (id) => {
    const { getPendingBookings } = this.props;

    this.setState({
      operation: 'rejected',
    });

    const { rejectBooking } = this.props;

    await rejectBooking(id);

    await getPendingBookings();

    this.setState({
      isProcessing: false,
    });
  }

  dispatchApproveBooking = async (id) => {
    const { getPendingBookings } = this.props;

    this.setState({
      operation: 'approved',
    });

    const { approveBooking } = this.props;

    await approveBooking(id);

    await getPendingBookings();

    this.setState({
      isProcessing: false,
    });
  }

  showBookings = () => {
    const { bookings, errorMessage, status } = this.props;

    const { operation, isProcessing } = this.state;

    return (
      <Container fluid>
        <Row>
          <Col md={5} className="breadcrumbs">
            <Breadcrumbs itemsArray={['Home', 'Boookings', 'Pending']} />
          </Col>
        </Row>
        <Row className="center-items">
          <h1>
            Your Pending Bookings
          </h1>
        </Row>
        <Row className="center-items">
          {(isProcessing) ? <i className="fas fa-spinner fa-pulse" /> : ''}
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

        <Row className="centered-flex">
          {bookings.data.map((booking, index) => (
            <Card className="booking-card" data-test="booking-card">
              <Card.Header>
                Accommodation:
                  {' '}
                {booking.accommodation.name}
              </Card.Header>
              <Card.Body>
                <Card.Title>
                  <Row>
                    Space Required:
                  {' '}
                    {booking.bookedSpace}
                    {' '}
                    rooms
                  </Row>
                </Card.Title>
                <Card.Text>
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
                </Card.Text>
                <Row className="btn-holder">
                  <Confirm data-test="approve" variant="success" action="approve" id={booking.id} processAction={this.actionSwitch} title="Accept" size="md" buttonClass="process-request-button btn-block" />
                  &nbsp;
                  <Confirm data-test="reject" variant="danger" action="reject" id={booking.id} processAction={this.actionSwitch} title="Reject" size="md" buttonClass="process-request-button btn-block" />
                </Row>
              </Card.Body>
            </Card>
          ))}
        </Row>
      </Container>
    );
  }

  noBookings = () => (
    <Container fluid>
      <Row className="center-items">
        <h1 data-test="noBookingsTest">You have no pending bookings</h1>
      </Row>
    </Container>
  )

  render() {
    const { isLoading, userId } = this.state;

    const { bookings, status } = this.props;

    return (
      <div className="d-flex justify-content-center">
        {(isLoading) ? <PageLoading data-test="loading" />
          : (status === 'success') ? <this.showBookings data-test="show-bookings" />
            : <this.noBookings data-test="no-bookings" />}
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
