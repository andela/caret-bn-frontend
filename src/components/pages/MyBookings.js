/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Container, Row, Col, Card, Button, ButtonGroup, Dropdown, DropdownButton, MenuItem,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { RemoveRedEyeOutlined } from '@material-ui/icons';
import { getBookings } from '../../actions/bookingActions';
import Breadcrumbs from '../global/Breadcrumbs';
import PageLoading from '../global/PageLoading';

export class MyBookings extends Component {
  state = {
    isLoading: false,
    filterState: 0,
  };

  componentDidMount = async () => {
    const { getBookings } = this.props;
    this.setState({ isLoading: true });
    await getBookings();
    this.setState({ isLoading: false });
  }

  renderStatus = (status) => {
    switch (status.id) {
      case 1:
        return (
          <Row className="pl-4 font-weight-bold">
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
          <Row className="pl-4 font-weight-bold">
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
          <Row className="pl-4 font-weight-bold">
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

  showBookings = () => {
    const { bookings } = this.props;
    const { filterState } = this.state;
    const options = ['All', 'Pending', 'Rejected', 'Approved'];
    const variants = ['primary', 'warning', 'danger', 'success'];

    const toFilter = bookings;
    let filtered;
    if (filterState) {
      filtered = toFilter.data.filter((booking) => booking.status.id === filterState);
    } else {
      filtered = toFilter.data;
    }

    return (
      <Container>
        <Row>
          <Col md={5} className="breadcrumbs">
            <Breadcrumbs itemsArray={['> Home', 'My Bookings']} />
          </Col>
        </Row>
        <Row className="center-items">
          <Container>
            <Row>
              <ButtonGroup size="sm">
                <Button variant="outline-secondary">Filter By Status</Button>
                <DropdownButton
                  alignRight
                  className="no-round-left"
                  title={options[filterState]}
                  id="document-type"
                  onSelect={(eventKey, event) => this.setState({ filterState: parseInt(eventKey, 10) })}
                  variant={variants[filterState]}
                  style={{ borderTopLeftRadius: '0' }}
                >
                  {options.map((opt, i) => (
                    <Dropdown.Item key={i} eventKey={i}>
                      {opt}
                    </Dropdown.Item>
                  ))}
                </DropdownButton>
              </ButtonGroup>
            </Row>
          </Container>
        </Row>
        <Row className="" style={{ margin: '0 1px' }}>
          { filtered.length === 0 && <div>No Bookings</div> }
          {filtered.map((booking, index) => (
            <Card className="booking-card" data-test="booking-card">
              <Card.Header style={{ textDecoration: 'none' }} className="text-primary font-weight-bold">
                  Accommodation:
                  {' '}
                  {booking.accommodation.name}
              </Card.Header>
              <Card.Body>
                <Card.Text>
                  <Row className="pl-4">
                    <span className="font-weight-bold pr-1">Space Required:</span>
                    {' '}
                    {booking.bookedSpace}
                    {' '}
                    rooms
                  </Row>
                  <Row className="pl-4">
                  <span className="font-weight-bold pr-1">Check In:</span>
                    {' '}
                    {booking.checkIn}
                  </Row>
                  <Row className="pl-4">
                  <span className="font-weight-bold pr-1">Check Out:</span>
                    {' '}
                    {booking.checkOut}
                  </Row>
                  {this.renderStatus(booking.status)}
                </Card.Text>
              </Card.Body>
              <Card.Footer className="text-center">
                <Link style={{ textDecoration: 'none' }} to={`bookings/${booking.id}`}>
                  <RemoveRedEyeOutlined />
                  {' '}
                  {' '}
                  View Booking
                </Link>
              </Card.Footer>
            </Card>
          ))}
        </Row>
      </Container>
    );
  }

  noBookings = () => (
    <Container fluid>
      <Row>
        <Col md={5} className="breadcrumbs">
          <Breadcrumbs itemsArray={['> Home', 'My Bookings']} />
        </Col>
      </Row>
      <Row className="center-items">
        <h1 data-test="noBookingsTest">You have no bookings</h1>
      </Row>
    </Container>
  )

  render() {
    const { isLoading } = this.state;
    const { status } = this.props;

    return (
      <div className="d-flex justify-content-center">
        {(isLoading) ? <PageLoading data-test="loading" />
          : (status === 'success') ? <this.showBookings data-test="show-bookings" />
            : <this.noBookings data-test="no-bookings" />}
      </div>
    );
  }
}

MyBookings.propTypes = {
  getBookings: PropTypes.any,
  bookings: PropTypes.any,
  status: PropTypes.string,
};

export const mapStateToProps = (state) => ({
  bookings: state.bookings.data,
  status: state.bookings.status,
});

export default connect(mapStateToProps, { getBookings })(MyBookings);
