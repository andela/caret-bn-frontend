import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Container, Row, Button, Col, Form,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { singleRequestAction } from '../../actions/requestsActions';
import Breadcrumbs from '../../components/global/Breadcrumbs';
import Alert from '../../components/global/AlertComponent';
import DestinationDisplay from '../../components/pages/requests/DestinationDisplay';

export class SingleRequest extends Component {
  state = {
    isLoading: false,
  }

  async componentDidMount() {
    const { props } = this;
    const { requestId } = props.match.params;
    this.setState({ isLoading: true });
    await props.singleRequestAction(requestId);
    this.setState({ isLoading: false });
  }

  render() {
    const { props } = this;
    const { requestId } = props.match.params;
    const { isLoading } = this.state;
    const { singleData, dataError } = props;

    return (
      <Container>
        <Row>
            <Col md={5} className="breadcrumbs">
              <Breadcrumbs itemsArray={['> Home', 'Requests', `Request ${requestId}`]} />
            </Col>
        </Row>

        <Row>
            {isLoading ? <i className="fas fa-spinner fa-pulse loader-big" /> : ''}
        </Row>

        <Row>
          <Col>
            { dataError && <Alert variant="danger" heading="Error" message={dataError.message} /> }
          </Col>
        </Row>
        {
          singleData
          && (
          <Row className="row row-center">
            <Form className="form-section">
              <Form.Group controlId="tripRequests.TripTypeInputs">
                <h6>Trip Type</h6>
                <Form.Control className="select" name="typeId" as="select" defaultValue={singleData.data.type.id}>
                  <option value={singleData.data.type.id}>{singleData.data.type.name}</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="tripRequests.TripTypeInputs">
                <h6>Origin</h6>
                <Form.Control name="locationId" className="select" as="select" defaultValue={singleData.data.origin.id}>
                  <option value={singleData.data.origin.id}>{singleData.data.origin.name}</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="tripRequests.TripTypeInputs">
                <h6>Departure Date</h6>
                <DayPickerInput value={singleData.data.departureDate} />
              </Form.Group>

              <Row className="destinations">
                {singleData.data.destinations.map((destination, index) => (
                  <Row key={destination.id}>
                    <DestinationDisplay destination={destination} index={index} />
                  </Row>
                ))}
              </Row>
            </Form>
          </Row>
          )
        }
      </Container>
    );
  }
}

export const mapStateToProps = (state) => ({
  singleData: state.requests.singleData,
  dataError: state.requests.dataError,
});

SingleRequest.propTypes = {
  requestId: PropTypes.number.isRequired,
  singleRequestAction: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  params: PropTypes.object,
  message: PropTypes.string,
  singleData: PropTypes.any,
  dataError: PropTypes.any,
};

export default connect(mapStateToProps, { singleRequestAction })(SingleRequest);
