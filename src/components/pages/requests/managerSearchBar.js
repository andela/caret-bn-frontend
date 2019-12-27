import React, { Component } from 'react';
import {
  Container, Form, Row, Col, Button,
} from 'react-bootstrap';
import DayPickerInput from 'react-day-picker/DayPickerInput';

export default function managerSearchBar(props) {
  const {
    locations, handleChange, handleDayChange, searchRequests,
  } = props;
  return (
    <Container fluid className="manager-search-card">
      <Row>Search through Requests</Row>
      <Row>
        <Col xs={12} sm={12} md={6} lg={3}>
          <Form.Label>Username</Form.Label>

          <Form.Group>
            <Form.Control as="input" name="username" placeholder="username" onChange={handleChange} data-test="username" />
          </Form.Group>
        </Col>
        <Col xs={12} sm={12} md={6} lg={3}>
          <Form.Group>
            <Form.Label>Origin Name:</Form.Label>
            <Form.Control as="select" onChange={handleChange} data-test="location-id" name="origin">
              <option>--</option>
              {locations.data.map((locale) => (<option value={locale.name} key={locale.id}>{locale.name}</option>))}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col xs={12} sm={12} md={6} lg={3}>
          <Form.Group>
            <Form.Label>Destination Name:</Form.Label>
            <Form.Control as="select" onChange={handleChange} data-test="location-id" name="destination">
              <option>--</option>
              {locations.data.map((locale) => (<option value={locale.name} key={locale.id}>{locale.name}</option>))}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col xs={12} sm={12} md={6} lg={3}>
          <Form.Group>
            <Form.Label>Status:</Form.Label>
            <Form.Control as="select" onChange={handleChange} data-test="location-id" name="destination">
              <option>--</option>
              <option value="1">Pending</option>
              <option value="3">Approved</option>
              <option value="2">Rejected</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col xs={12} sm={6} md={6} lg={3}>
          <Form.Label>Departure Date</Form.Label>
          <Form.Group className="day-picker-custom">
            <DayPickerInput inputProps={{ style: { border: 0, outline: 0 } }} placeholder="Select Date..." onDayChange={handleDayChange} />
          </Form.Group>
        </Col>
        <Col xs={12} sm={6} md={6} lg={3}>
          <Form.Label>Duration:</Form.Label>
          <Form.Group>
            <Form.Control type="number" onChange={handleChange} name="duration" min="1" max="999" data-test="duration" placeholder="Duration in days..." />
          </Form.Group>
        </Col>
        <Col xs={12} sm={6} md={6} lg={3}>
          <Form.Label>reasons:</Form.Label>
          <Form.Group>
            <Form.Control type="textarea" rows="3" name="reasons" onChange={handleChange} placeholder="Reasons..." minLength="10" maxLength="100" />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={6} md={6} lg={6}>
          <Button className="full-width-buttons" onClick={() => searchRequests()} data-test="filter-request">
            Search Requests
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
