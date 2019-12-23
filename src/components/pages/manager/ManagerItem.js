/* eslint-disable react/self-closing-comp */
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container, Button, Row, Col,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import DestinationItem from '../requests/DestinationItem';
import ProcessRequest from '../requests/ProcessRequest';

const ManagerItem = ({ item, user, email }) => {
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
          <Row className="px-4 py-1 mb-0">
            <span className="font-weight-bold">
            Requester:
              {' '}
              {' '}
            {user}
            </span>
          </Row>
          <Row className="px-4 py-1 mb-0">
            <span className="font-weight-bold">
            E-mail:
              {' '}
              {' '}
            {email}
            </span>
          </Row>
          <Row className="px-2 py-1 mb-0">
            <Col md={9} className="text-primary">
              {item.departureDate}
              {' | '}
              {item.type.name}
              {' Trip'}
            </Col>
            {renderStatus(item.status)}
          </Row>
          <Row className="px-2 py-1 mb-0">
            <Col>
              {item.destinations.map((destination, i) => (
                <DestinationItem destination={destination} key={destination.id} index={i} />
              ))}
            </Col>
          </Row>
          <Row>
            <Col md={8} className="px-3 pb-3 mb-0">
              <span className="font-weight-bold">
                Return Date:
              </span>
              {' '}
              {item.returnDate || 'N/A'}
            </Col>
            {item.status.id === 1 && (
              <>
                <Col md={2}>
                  <ProcessRequest action="approve" id={item.id} variant="success" />
                </Col>
                <Col md={2}>
                  <ProcessRequest action="reject" id={item.id} variant="danger" />
                </Col>
              </>
            ) }
          </Row>
          <Row>
            <Col md={9} className="px-3 mb-0">
              <span className="font-weight-bold">
                Reasons:
              </span>
              {item.reasons || 'N/A'}
            </Col>
            <Col>
              <Link to={`/requests/${item.id}`}>
                <Button variant="primary">
                  View request
                </Button>
              </Link>
            </Col>
          </Row>
      </Container>
    </Container>
  );
};

ManagerItem.propTypes = {
  item: PropTypes.object,
};

export default ManagerItem;
