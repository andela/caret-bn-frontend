/* eslint-disable no-nested-ternary */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Form, Container, Row, Col, Button,
} from 'react-bootstrap';
import DayPicker from 'react-day-picker';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { BookAccommodation, getBookings } from '../../actions/bookingActions';
import 'react-day-picker/lib/style.css';
import calendar from '../../assets/images/calendar.png';
import dateFnsFormat from 'date-fns/format';
import { hideAlert } from '../../actions/alertAction';

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

handleCheckIn =(checkInDate) => {
  const checkInValue = dateFnsFormat(checkInDate, 'yyyy-MM-dd');
  this.setState({ checkInDate: checkInValue });
}

handleCheckOut = (checkOutDate) => {
  const checkOutValue = dateFnsFormat(checkOutDate, 'yyyy-MM-dd');
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
  const { isLoading, checkInDate, checkOutDate, roomsNumber } = this.state;
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
         {isLoading ? <i className="fas fa-spinner fa-pulse loader-big" /> : 
<Container className="containerB small-container ">
                <form onSubmit={this.handleSubmit}>
                  <h3><b>Make a reservation</b></h3>
                  <div className="bookingContainer">
                    <i>
                      <DayPickerInput
                        className="day-picker-custom"
                        data-test="Date Input"
                        initialMonth={new Date()}
                        placeholder="Check-In Date"
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
                    </i>
                    <i>
                      <img src={calendar} alt="icon" className="calendarIcon" />
                    </i>
                    &nbsp;
                    &nbsp;
                    <i>
                        <DayPickerInput
                         className="day-picker-custom"
                          data-test="checkout Input"
                          initialMonth={new Date()}
                          placeholder="Check-Out Date"
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
                    </i>
                    <i>
                      <img src={calendar} alt="icon" className="calendarIcon" />
                    </i>
                    <Row>
                    <Col md={{ span: 6 }}><Form.Control data-test="rooms" className="rooms" type="number" min="1" max="99990" name="roomsNumber" value={roomsNumber} onChange={this.handleChange} placeholder="Number of Rooms..." title="Enter the number of available rooms" required /></Col>
                    <Col md={{ span: 4, offset: 2 }}>
                      <Button data-test="make-booking" className="Button" onClick={this.handleSubmit}>
                      {isLoading ? <i style={{ fontSize: '20px' }} className="fas fa-spinner fa-pulse" /> : 'Make booking'}
                      </Button>
                    </Col>
                    </Row>
                  </div>
                </form>
</Container>
}
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
