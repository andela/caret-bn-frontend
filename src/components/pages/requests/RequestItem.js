/* eslint-disable react/self-closing-comp */
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container, Button, Row, Col,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import DestinationItem from './DestinationItem';

const RequestItem = ({ item }) => {
  const renderStatus = (status) => {
    switch (status.id) {
      case 1:
        return (
          <Col className="request-status font-weight-bold pl-5" style={{ color: '#C2A90F' }}>{status.name}</Col>
        );
      case 2:
        return (
          <Col className="request-status font-weight-bold pl-5 text-danger">{status.name}</Col>
        );
      default:
        return (
          <Col className="request-status font-weight-bold pl-5 text-success">{status.name}</Col>
        );
    }
  };

  return (
    <Container data-test="request-item">
      <Container className="request-item mb-3 p-3">
        <Container>
          <Row className="p-3">
            <Col md={9} className="text-primary">
              {item.departureDate}
              {' | '}
              {item.type.name}
              {' Trip'}
            </Col>
            {renderStatus(item.status)}
          </Row>

          <Row className="p-3">
            <Col>
              {item.destinations.map((destination, i) => (
                <DestinationItem destination={destination} key={destination.id} index={i} />
              ))}
            </Col>
          </Row>

          <Row className="p-3">
            <Col md={9}>
              <span className="font-weight-bold">
                Return Date:
              </span>
              {' '}
              {item.returnDate || 'N/A'}
            </Col>
            <Col>
              <Link to={`/requests/${item.id}`}>
                <Button variant="primary">
                  VIEW REQUEST
                </Button>
              </Link>
            </Col>
          </Row>

        </Container>
      </Container>
    </Container>
  );
};

RequestItem.propTypes = {
  item: PropTypes.object,
};

export default RequestItem;
