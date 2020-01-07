import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Container, Row, Col, Form, Button,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import moment from 'moment';
import { getLocations } from '../../../actions/locationActions';
import { searchRequestAction } from '../../../actions/requestsActions';
import { managerSearchRequestAction } from '../../../actions/managerRequestAction';
import authHelper from '../../../helpers/authHelper';

const { checkManager } = authHelper;
export class SearchBar extends Component {
  state = {
    origin: '',
    destination: '',
    statusId: '',
    duration: '',
    departureDate: '',
    reasons: '',
    isLoading: false,
    openSearch: false,
    emptyParams: false,
  };

  componentDidMount() {
    const { getLocations } = this.props;
    getLocations();
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleDayChange = (departureDate) => {
    const dateValue = moment(departureDate).format('YYYY-MM-DD');
    this.setState((state) => ({ ...state, departureDate: dateValue }));
  }

  hideFilter = () => {
    const { state: { openSearch } } = this;
    this.setState((state) => ({ ...state, openSearch: !openSearch }));
  };

  searchRequest = async () => {
    const { state, props } = this;
    let searchParams = '';
    const {
      isLoading, openSearch, emptyParams, ...options
    } = state;

    Object.keys(options).forEach((key) => {
      if (options[`${key}`] !== '') {
        searchParams += `${key}=${options[`${key}`]}&`;
      }
    });

    searchParams = searchParams.substring(0, searchParams.length - 1);
    if (searchParams !== '') {
      searchParams = `?${searchParams}`;
      this.setState((state) => ({ ...state, isLoading: true }));
      if (!checkManager()) {
        await props.managerSearchRequestAction(searchParams);
      } else {
        await props.searchRequestAction(searchParams);
      }
      this.setState((state) => ({ ...state, isLoading: false, emptyParams: false }));
    } else {
      this.setState({ emptyParams: true });
    }
  }

  render() {
    const { props, state } = this;
    const {
      isLoading, openSearch, departureDate, emptyParams,
    } = state;
    const { locations } = props;
    return (
      <>
        <div className="search-box py-3">
          <Container>
            <Row>
              <Col xs={12} sm={6} md={4} lg={4}>
                <Button className="btn-block" style={{ width: '100%' }} onClick={() => this.hideFilter()} data-test="filter-request">
                  { !openSearch ? 'Search By...' : 'Hide Search'}
                </Button>
              </Col>
            </Row>

            { openSearch && (
              <>
                <Row className="search-bar">
                  { (!checkManager() && window.location.pathname !== '/requests') && (
                    <Col xs={12} sm={6} md={4} lg={4}>
                      <Form.Group>
                        <Form.Control type="text" name="username" onChange={this.handleChange} placeholder="Username..." minLength="10" maxLength="100" />
                      </Form.Group>
                    </Col>
                  )}
                  {(!checkManager() && window.location.pathname !== '/requests') ? (
                  <Col xs={12} sm={6} md={4} lg={4}>
                  <Form.Group>
                    <Form.Control as="select" name="origin" onChange={this.handleChange}>
                      <option selected disabled>Select Origin...</option>
                      <option value="">None</option>
                      {
                        locations ? locations.data.map((location) => <option key={location.id} value={location.name}>{location.name}</option>) : null
                      }
                    </Form.Control>
                  </Form.Group>
                  </Col>
                  ) : (
                    <Col xs={12} sm={6} md={6} lg={6}>
                  <Form.Group>
                    <Form.Control as="select" name="origin" onChange={this.handleChange}>
                      <option selected disabled>Select Origin...</option>
                      <option value="">None</option>
                      {
                        locations ? locations.data.map((location) => <option key={location.id} value={location.name}>{location.name}</option>) : null
                      }
                    </Form.Control>
                  </Form.Group>
                    </Col>
                  )}

                {(!checkManager() && window.location.pathname !== '/requests') ? (
                  <Col xs={12} sm={6} md={4} lg={4}>
                  <Form.Group>
                    <Form.Control as="select" name="destination" onChange={this.handleChange}>
                      <option selected disabled>Select Destination...</option>
                      <option value="">None</option>
                      {
                        locations ? locations.data.map((location) => <option key={location.id} value={location.name}>{location.name}</option>) : null
                      }
                    </Form.Control>
                  </Form.Group>
                  </Col>
                ) : (
                    <Col xs={12} sm={6} md={6} lg={6}>
                  <Form.Group>
                    <Form.Control as="select" name="destination" onChange={this.handleChange}>
                      <option selected disabled>Select Destination...</option>
                      <option value="">None</option>
                      {
                        locations ? locations.data.map((location) => <option key={location.id} value={location.name}>{location.name}</option>) : null
                      }
                    </Form.Control>
                  </Form.Group>
                    </Col>
                )}

                  <Col xs={12} sm={6} md={4} lg={4}>
                    <Form.Group>
                      <Form.Control as="select" onChange={this.handleChange} name="statusId" data-test="status-id">
                        <option selected disabled>Select Status...</option>
                        <option value="">None</option>
                        <option value={1}>1 - Pending</option>
                        <option value={2}>2 - Rejected</option>
                        <option value={3}>3 - Approved</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>

                  <Col xs={12} sm={6} md={4} lg={4}>
                    <Form.Group>
                      <Form.Control type="number" onChange={this.handleChange} name="duration" min="1" max="999" data-test="duration" placeholder="Duration in days..." />
                    </Form.Group>
                  </Col>

                  <Col xs={12} sm={6} md={4} lg={4}>
                    <Form.Group className="day-picker-custom">
                      <DayPickerInput className="day-picker" inputProps={{ style: { border: 0, outline: 0 } }} placeholder="Departure Date..." value={departureDate} onDayChange={this.handleDayChange} />
                      {/* <i className="fa fa-times reset-cross" aria-hidden="true" onClick={this.resetDate} /> */}
                    </Form.Group>
                  </Col>

                  <Col xs={12} sm={6} md={8} lg={8}>
                    <Form.Group>
                      <Form.Control type="text" name="reasons" onChange={this.handleChange} placeholder="Reasons..." minLength="10" maxLength="100" />
                    </Form.Group>
                  </Col>

                  <Col xs={12} sm={6} md={4} lg={4}>
                    <Button className="btn-block" style={{ width: '100%' }} onClick={() => this.searchRequest()} data-test="search-request">
                      SEARCH
                    </Button>
                  </Col>
                  <Col xs={12} sm={6} md={4} lg={4}>
                    {emptyParams && (<small className="text-danger">Search options cannot be empty</small>)}
                  </Col>
                </Row>

                <Row>
                <Col xs={12} sm={6} md={4} lg={4}>
                  {!checkManager() ? (
                    <Button className="btn-block" style={{ width: '100%' }} onClick={() => window.location.replace('/user-manager')} data-test="all-requests-button">
                      All requests
                    </Button>
                  ) : (
                    <Button className="btn-block" style={{ width: '100%' }} onClick={() => window.location.replace('/requests')} data-test="all-requests-button">
                      All requests
                    </Button>
                  )}
                </Col>
                </Row>
              </>
            )}
          </Container>
        </div>

        <Container>
          <Row className="text-center mx-auto">
            {isLoading ? <i className="fas fa-spinner fa-pulse loader-big" /> : ''}
          </Row>
        </Container>
      </>
    );
  }
}

SearchBar.propTypes = {
  getLocations: PropTypes.func.isRequired,
  searchRequestAction: PropTypes.func.isRequired,
  managerSearchRequestAction: PropTypes.func.isRequired,
  locations: PropTypes.any,
};

export const mapStateToProps = (state) => ({
  locations: state.locations.data,
});

export default connect(mapStateToProps, { getLocations, searchRequestAction, managerSearchRequestAction })(SearchBar);
