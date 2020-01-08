/* eslint-disable no-nested-ternary */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Form, Container, Row, Col, Button, Spinner,
} from 'react-bootstrap';
import DayPicker from 'react-day-picker';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { BookAccommodation, getBookings } from '../../actions/bookingActions';
import 'react-day-picker/lib/style.css';
import format from 'date-fns/format';
import { hideAlert } from '../../actions/alertAction';
import { ArrowForwardIos } from '@material-ui/icons';

export class Booking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      checkInDate: '',
      checkOutDate: '',
      roomsNumber: '',
    };
  }

  componentDidMount = async () => {
    this.props.getBookings();
  }

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  };

  handleCheckIn = (checkInDate) => {
    const checkInValue = format(checkInDate, 'yyyy-MM-dd');
    this.setState({ checkInDate: checkInValue });
  }

  handleCheckOut = (checkOutDate) => {
    const checkOutValue = format(checkOutDate, 'yyyy-MM-dd');
    this.setState({ checkOutDate: checkOutValue });
  }


  handleSubmit = async (e) => {
    e.preventDefault();
    const { props, state } = this;
    const accomodationId = props.accommodation.id;
    this.setState({ isLoading: true });
    await props.BookAccommodation(state.checkInDate, state.checkOutDate, accomodationId, state.roomsNumber);
    this.setState({
      checkInDate: '', checkOutDate: '', roomsNumber: '', isLoading: false,
    });
  }

  render() {
    const {
      accommodation, bookings,
    } = this.props;
    const {
      isLoading, checkInDate, checkOutDate, roomsNumber,
    } = this.state;
    const bookedAccommodation = accommodation && bookings && bookings.data.find((book) => book.accommodation.id === JSON.parse(accommodation.id));
    const startDate = new Date(bookedAccommodation && bookedAccommodation.checkIn);
    const endDate = new Date(bookedAccommodation && bookedAccommodation.checkOut);
    const startDateYear = startDate.getFullYear();
    const startDateMonth = startDate.getMonth();
    const startDateDay = startDate.getDate() - 1;
    const endDateYear = endDate.getFullYear();
    const endDateMonth = endDate.getMonth();
    const endDateDay = endDate.getDate() + 1;

    return (
      <div className="d-flex justify-content-center single-container">
        <Container className="bookings-container" data-test="booking-page">
          <Row className="center-items">
            <p className="bookings-title">Make a reservation</p>
          </Row>
          <form onSubmit={this.handleSubmit}>
            <Row className="date-row center-items">
              <DayPickerInput
                data-test="CheckIn"
                initialMonth={new Date()}
                placeholder="Check-in"
                name="checkInDate"
                format="yyyy-MM-dd"
                dayPickerProps={{
                  disabledDays: {
                    after: new Date(startDateYear, startDateMonth, startDateDay),
                    before: new Date(endDateYear, endDateMonth, endDateDay),
                  },
                }}
                value={checkInDate}
                onDayChange={this.handleCheckIn}
              />
              <span className="spacer" />
              <DayPickerInput
                data-test="Checkout"
                initialMonth={new Date()}
                placeholder="Checkout"
                name="checkOutDate"
                format="yyyy-MM-dd"
                dayPickerProps={{
                  disabledDays: {
                    after: new Date(startDateYear, startDateMonth, startDateDay),
                    before: new Date(endDateYear, endDateMonth, endDateDay),
                  },
                }}
                onDayChange={this.handleCheckOut}
                value={checkOutDate}
              />
            </Row>
            <Row className="booking-form-item center-items">
              <Form.Control data-test="rooms" className="rooms" type="number" min="1" max="99990" name="roomsNumber" value={roomsNumber} onChange={this.handleChange} placeholder="Number of Rooms..." title="Enter the number of available rooms" required />
            </Row>
            <Row className="center-items">
              <Button data-test="make-booking" className="full-width-buttons accent-button" onClick={this.handleSubmit}>
                {isLoading ? (
                  <Spinner
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    variant="primary"
                  />
                )
                  : 'Make booking'}
              </Button>
            </Row>
          </form>
        </Container>

      </div>

    );
  }
}
Booking.propTypes = {
  BookAccommodation: PropTypes.func.isRequired,
};
export const mapStateToProps = (state) => ({
  accommodation: state.accommodation.singleAccommodation,
  booked: state.bookings.booked,
  bookings: state.bookings.data,
  bookedError: state.bookings.bookedError,
});
export default connect(mapStateToProps, { BookAccommodation, getBookings, hideAlert })(Booking);
