import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  Container, Row, Button, Col, Form, Spinner,
} from 'react-bootstrap';
import { CheckCircleOutlineOutlined, HighlightOffOutlined } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { singleRequestAction, processRequestAction } from '../../actions/requestsActions';
import { editRequestAction } from '../../actions/requestActions';
import { getLocations } from '../../actions/locationActions';
import Breadcrumbs from '../../components/global/Breadcrumbs';
import Alert from '../../components/global/AlertComponent';
import DestinationDisplay from '../../components/pages/requests/DestinationDisplay';
import { checkSupplier, checkManager, checkManagerRequest } from '../../helpers/authHelper';
import Confirm from '../../components/global/Confirm';
import CommentDisplay from '../../components/pages/requests/CommentDisplay';
import { hideAlert } from '../../actions/alertAction';

export class SingleRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      status: false,
      isDisabled: true,
      departureDate: '',
      returnDate: '',
      locationId: '',
      destinations: [],
    };
  }

  async componentDidMount() {
    const { props } = this;
    const { getLocations, singleData } = props;
    const { requestId } = props.match.params;
    this.setState({ isLoading: true });
    await props.singleRequestAction(requestId);
    await getLocations();
    this.setState({
      isLoading: false,
      departureDate: this.props.singleData.departureDate,
      returnDate: this.props.singleData.returnDate,
      locationId: this.props.singleData.origin.id,
      isDisabled: true,
      destinations: this.props.singleData.destinations,
    });
  }

  async componentWillUnmount() {
    const { hideAlert } = this.props;
    await hideAlert();
  }

  processAction = async (action, id) => {
    const { props } = this;
    await props.processRequestAction(action, id);
    await props.singleRequestAction(id);
  };

  handleEdit = (e) => {
    e.preventDefault();
    this.setState({ isDisabled: false });
  }

  handleDestinationChange(e) {
    e.preventDefault();
    const keys = e.target.id.split('-');
    const temp = this.state.destinations;
    temp[parseInt(keys[1])][keys[0]] = e.target.value;
    this.setState({ destinations: temp });
  }

  handleCancel = (e) => {
    e.preventDefault();
    this.componentDidMount();
  }

  handleChange = (e) => {
    const { target } = e;
    const { value } = target;
    const { name } = target;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { props, state } = this;
    const { singleData } = props;
    const { requestId } = props.match.params;

    const OneWayRequestData = {
      departureDate: state.departureDate,
      locationId: state.locationId,
      destinations: [
        {
          id: state.id,
          reasons: state.reasons,
          arrivalDate: state.arrivalDate,
        },
      ],
    };

    const destinations = state.destinations.map((data) => ({
      id: data.id,
      arrivalDate: data.arrivalDate,
      departureDate: data.departureDate,
      reasons: data.reasons,
    }));

    const MultiCityRequestData = {
      departureDate: state.departureDate,
      returnDate: state.returnDate,
      locationId: state.locationId,
      destinations,
    };

    this.setState({ isLoading: true });
    await props.editRequestAction(requestId, singleData.type.id === 1 ? OneWayRequestData : MultiCityRequestData);
    this.setState({ isLoading: false, isDisabled: true });
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
    const { props, state } = this;
    const { requestId } = props.match.params;
    const {
      singleData, dataError, locations, editData, editError,
    } = props;
    const { isLoading, isDisabled } = this.state;
    const id = singleData && singleData.requester.id;
    return (
      <>
        {checkSupplier() && <Redirect to="/" />}
        <Container>
          <Row>
            <Col md={5} className="breadcrumbs">
              <Breadcrumbs itemsArray={['> Home', 'Requests', `Request ${requestId}`]} />
            </Col>
          </Row>

          <Row className="center-items">
            {isDisabled ? isLoading ? (
              <div className="d-flex justify-content-center">
                <Spinner animation="grow" size="lg" variant="primary" />
              </div>
            ) : '' : null}
          </Row>

          <Row>
            <Col>
              {dataError && <Alert variant="danger" heading="Error" message={dataError.message} />}
              {editData && <Alert variant="success" heading="success" message={editData.message} />}
              {editError && <Alert variant="danger" heading="Error" message={(Array.isArray(editError.error)) ? editError.error[0] : editError.message} />}
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
                      <p>
                        Requester:
                        {' '}
                        {singleData.requester.username}
                      </p>
                      <p>
                        Email:
                        {' '}
                        {singleData.requester.email}
                      </p>
                    </Row>
                  </>
                )}
                <Row className="section">
                  <p>
                    Status:
                    {' '}
                    {this.renderStatus(singleData.status)}
                  </p>
                </Row>
                <Row className="center-items">
                  <Form className="form-section" onSubmit={this.handleSubmit}>
                    <Col xs={12} sm={12} md={6} lg={3}>
                      <Form.Group>
                        <Form.Label>Trip Type</Form.Label>
                        <Form.Control name="typeId" as="select" defaultValue={singleData.type.id} disabled>
                          <option value={singleData.type.id}>{singleData.type.name}</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>

                    <Col xs={12} sm={12} md={6} lg={3}>
                      <Form.Group>
                        <Form.Label>Origin</Form.Label>
                        <Form.Control name="locationId" data-test="location-field" as="select" defaultValue={singleData.origin.id} onChange={(e) => this.handleChange(e)} disabled={isDisabled}>
                          <option value={state.locationId}>{singleData.origin.name}</option>
                          {locations.data && locations.data.data.map((location) => (<option value={location.id} key={location.id}>{location.name}</option>))}
                        </Form.Control>
                      </Form.Group>
                    </Col>

                    <Col xs={12} sm={12} md={6} lg={3}>
                      <Form.Group>
                        <Form.Label>Departure Date</Form.Label>
                        <Form.Control as="input" data-test="departureDate-field" type="date" name="departureDate" defaultValue={singleData.departureDate} value={state.departureDate} onChange={(e) => this.handleChange(e)} disabled={isDisabled} />
                      </Form.Group>
                    </Col>

                    <Col xs={12} sm={12} md={6} lg={3}>
                      <Form.Group>
                        <Form.Label>Return Date</Form.Label>
                        <Form.Control id="qwert" data-test="returnDate-field" as="input" type="date" name="returnDate" defaultValue={singleData.returnDate} value={state.returnDate} onChange={(e) => this.handleChange(e)} disabled={locations && locations.data && singleData.type.name === 'One Way' ? true : isDisabled} />
                      </Form.Group>
                    </Col>
                    <Row className="section">
                      <h4>Destinations</h4>
                      <p>Details on the locations you will be visiting during your trip.</p>
                    </Row>
                    <Row className="center-items">
                      {state.destinations.map((destination, index) => (
                        <Row key={destination.id}>
                          <DestinationDisplay
                            destination={destination}
                            index={index}
                            disabled={isDisabled}
                            departureDisable={locations && locations.data && singleData.type.name === 'One Way' ? true : isDisabled}
                            location={locations.data && locations.data.data.map((location) => (<option value={location.id} key={location.id}>{location.name}</option>))}
                            onChange={(e) => this.handleDestinationChange(e)}
                            id={destination.id}
                            arrivalDate={destination.arrivalDate}
                            departureDate={destination.departureDate}
                            reasons={destination.reasons}
                          />
                        </Row>
                      ))}
                      {singleData && singleData.status.name === 'Pending' ? (
                        checkManagerRequest(id) ? (
                          <Button data-test="edit-Button" className="full-width-buttons" id="save-button" variant="primary" onClick={isDisabled ? (e) => this.handleEdit(e) : (e) => this.handleSubmit(e)} disabled={!(singleData && singleData.status.name === 'Pending')}>
                            {isDisabled ? 'EDIT REQUEST' : isLoading ? <i style={{ fontSize: '20px' }} className="fas fa-spinner fa-pulse" /> : 'SAVE CHANGES'}
                          </Button>
                        ) : null
                      ) : null}
                      {isDisabled || isLoading ? null
                        : (
                          <Button className="full-width-buttons" variant="primary" onClick={(e) => this.handleCancel(e)}>
                            {isDisabled ? null : 'CANCEL'}
                          </Button>
                        )}
                    </Row>
                  </Form>
                </Row>
                {!checkManager() && (
                  <Row className="mb-3">
                    <Col md={2} />
                    <Col md={4}>
                      <Confirm data-test="single-confirm" variant="success" action="approve" id={requestId} processAction={this.processAction} title="approve" size="md" buttonClass="process-request-button btn-block" disabled={singleData.status.id === 3} icon={<CheckCircleOutlineOutlined />} />
                    </Col>
                    <Col md={4}>
                      <Confirm variant="danger" action="reject" id={requestId} processAction={this.processAction} title="reject" size="md" buttonClass="process-request-button btn-block" disabled={singleData.status.id === 2} icon={<HighlightOffOutlined />} />
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
  editData: state.requests.editData,
  editError: state.requests.editError,
  locations: state.locations,
});

SingleRequest.propTypes = {
  match: PropTypes.object.isRequired,
  singleRequestAction: PropTypes.func.isRequired,
  processRequestAction: PropTypes.func.isRequired,
  message: PropTypes.string,
  singleData: PropTypes.any,
  dataError: PropTypes.any,
  locations: PropTypes.any,
  editData: PropTypes.any,
  editError: PropTypes.any,
};

export default connect(mapStateToProps, {
  singleRequestAction, processRequestAction, getLocations, editRequestAction, hideAlert,
})(SingleRequest);
