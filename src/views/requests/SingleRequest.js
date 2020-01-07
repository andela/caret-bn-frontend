import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  Container, Row, Button, Col, Form,
} from 'react-bootstrap';
import { CheckCircleOutlineOutlined, HighlightOffOutlined } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { singleRequestAction, processRequestAction } from '../../actions/requestsActions';
import Breadcrumbs from '../../components/global/Breadcrumbs';
import Alert from '../../components/global/AlertComponent';
import DestinationDisplay from '../../components/pages/requests/DestinationDisplay';
import { checkSupplier, checkManager } from '../../helpers/authHelper';
import Confirm from '../../components/global/Confirm';
import CommentDisplay from '../../components/pages/requests/CommentDisplay';

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

  processAction = async (action, id) => {
    const { props } = this;
    await props.processRequestAction(action, id);
    await props.singleRequestAction(id);
  };

  renderStatus = (status) => {
    switch (status.id) {
      case 1:
        return (
          <span className="request-status font-weight-bold" style={{ color: '#C2A90F' }}>{status.name}</span>
        );
      case 2:
        return (
          <span className="request-status font-weight-bold text-danger">{status.name}</span>
        );
      default:
        return (
          <span className="request-status font-weight-bold text-success">{status.name}</span>
        );
    }
  };

  render() {
    const { props } = this;
    const { requestId } = props.match.params;
    const { isLoading } = this.state;
    const { singleData, dataError } = props;

    return (
      <>
        { checkSupplier() && <Redirect to="/" />}
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
              <div className="bg-white">
                <Row className="section">
                  <h4>Request Information</h4>
                  <p>Details on the Trip Request.</p>
                </Row>
                {!checkManager() && (
                  <>
                    <Row className="section">
                      <h4>
                        Requester:
                        {' '}
                        {singleData.data.requester.username}
                      </h4>
                    </Row>
                    <Row className="section">
                      <h4>
                        Email:
                        {' '}
                        {singleData.data.requester.email}
                      </h4>
                    </Row>
                  </>
                )}
                <Row className="section">
                  <h4>
                    Status:
                    {' '}
                    {this.renderStatus(singleData.data.status)}
                  </h4>
                </Row>
                <Row className="center-items">
                  <Form className="form-section">
                    <Col xs={12} sm={12} md={6} lg={3}>
                      <Form.Group>
                        <Form.Label>Trip Type</Form.Label>
                        <Form.Control name="typeId" as="select" defaultValue={singleData.data.type.id} disabled>
                          <option value={singleData.data.type.id}>{singleData.data.type.name}</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>

                    <Col xs={12} sm={12} md={6} lg={3}>
                      <Form.Group>
                        <Form.Label>Origin</Form.Label>
                        <Form.Control name="locationId" as="select" defaultValue={singleData.data.origin.id} disabled>
                            <option value={singleData.data.origin.id}>{singleData.data.origin.name}</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>

                    <Col xs={12} sm={12} md={6} lg={3}>
                      <Form.Group>
                        <Form.Label>Departure Date</Form.Label>
                        <Form.Control as="input" type="date" name="departureDate" defaultValue={singleData.data.departureDate} disabled />
                      </Form.Group>
                    </Col>

                    <Col xs={12} sm={12} md={6} lg={3}>
                      <Form.Group>
                        <Form.Label>Return Date</Form.Label>
                        <Form.Control as="input" type="date" name="returnDate" defaultValue={singleData.data.returnDate} disabled />
                      </Form.Group>
                    </Col>
                    <Row className="section">
                      <h4>Destinations</h4>
                      <p>Details on the locations you will be visiting during your trip.</p>
                    </Row>

                    <Row className="center-items">
                      {singleData.data.destinations.map((destination, index) => (
                        <Row key={destination.id}>
                          <DestinationDisplay destination={destination} index={index} />
                        </Row>
                      ))}
                    </Row>
                  </Form>
                </Row>
                {!checkManager() && (
                <Row className="mb-3">
                  <Col md={2} />
                  <Col md={4}>
                <Confirm data-test="single-confirm" variant="success" action="approve" id={requestId} processAction={this.processAction} title="approve" size="md" buttonClass="process-request-button btn-block" disabled={singleData.data.status.id === 3} icon={<CheckCircleOutlineOutlined />} />
                  </Col>
                  <Col md={4}>
                    <Confirm variant="danger" action="reject" id={requestId} processAction={this.processAction} title="reject" size="md" buttonClass="process-request-button btn-block" disabled={singleData.data.status.id === 2} icon={<HighlightOffOutlined />} />
                  </Col>
                </Row>
                )}
                <CommentDisplay requestId={requestId} />
              </div>
            )
          }
        </Container>
      </>
    );
  }
}

export const mapStateToProps = (state) => ({
  singleData: state.requests.singleData,
  dataError: state.requests.dataError,
});

SingleRequest.propTypes = {
  match: PropTypes.object.isRequired,
  singleRequestAction: PropTypes.func.isRequired,
  processRequestAction: PropTypes.func.isRequired,
  message: PropTypes.string,
  singleData: PropTypes.any,
  dataError: PropTypes.any,
};

export default connect(mapStateToProps, { singleRequestAction, processRequestAction })(SingleRequest);
