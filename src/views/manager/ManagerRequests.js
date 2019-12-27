/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Table, Container, Row } from 'react-bootstrap';
import moment from 'moment';
import PageLoading from '../../components/global/PageLoading';
import { getRequests, searchRequests } from '../../actions/managerActions';
import { getLocations } from '../../actions/locationActions';
import ManagerSearchBar from '../../components/pages/requests/managerSearchBar';
import AlertComponent from '../../components/global/AlertComponent';
import RequestItem from '../../components/pages/requests/RequestItem';

class ManagerRequests extends Component {
  state = {
    isLoading: true,
    searchCriteria: {},
    status: '',
    errorMessage: '',
    isSearching: false,
  }

  handleChange = async (e) => {
    const { name, value } = e.target;
    await this.setState((prevState) => ({
      searchCriteria: {
        ...prevState.searchCriteria,
        [name]: value,
      },
    }));
  }

  handleDayChange = async (departureDate) => {
    const dateValue = moment(departureDate).format('YYYY-MM-DD');
    await this.setState((prevState) => ({
      searchCriteria: {
        ...prevState.searchCriteria,
        departureDate: dateValue,
      },
    }));
  }

  searchRequests = () => {
    const { searchRequests } = this.props;
    const criteria = this.state.searchCriteria;
    let searchParams = '';
    Object.keys(criteria).forEach((key) => {
      if (criteria[`${key}`] !== '') {
        searchParams += `${key}=${criteria[`${key}`]}&`;
      }
    });
    searchRequests(searchParams);
    this.setState({
      isSearching: true,
    });
  }

  componentDidMount = async () => {
    const { getRequests, getLocations } = this.props;
    await getRequests();
    await getLocations();
    await this.setState({
      isLoading: false,
    });
  }

  showRequests = () => {
    const {
      requests, locations, errorMessage, status,
    } = this.props;
    return (
      <Container fluid>
        <ManagerSearchBar locations={locations.data} handleChange={this.handleChange} handleDayChange={this.handleDayChange} searchRequests={this.searchRequests} />
        <Row className="error-container">
          {(status === 'error') ? <AlertComponent heading="Error" message={errorMessage.data.message} variant="danger" /> : null}
        </Row>
        <Table responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Number of Requests</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr>
                <td>{request.id}</td>
                <td>{request.username}</td>
                <td>{request.email}</td>
                <td>{request.requests.length}</td>
              </tr>
            ))}
            ;
          </tbody>
        </Table>
      </Container>
    );
  }

  errorHandler = () => {
    console.log('Is searching');
    this.setState({
      isSearching: false,
    });
  }

  showFilteredRequests = () => {
    const { filteredRequests } = this.props;
    return (
      <Container fluid>
        {filteredRequests.map((request) => (
          <Row key={request.id}>
            <RequestItem item={request} />
          </Row>
        ))}
      </Container>
    );
  }

  render() {
    const { isLoading, isSearching } = this.state;
    const { filteredRequests, status } = this.props;
    console.log(status);
    return (
      (isLoading) ? <PageLoading />
        : (!isSearching)
          ? <this.showRequests />
          : (filteredRequests && isSearching) ? <this.showFilteredRequests /> : (status === 'error')
            ? <this.showRequests />
            : ''
    );
  }
}

ManagerRequests.PropTypes = {
  requests: PropTypes.object.isRequired,
  locations: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  requests: state.manager.data,
  filteredRequests: state.manager.filteredRequests,
  errorMessage: state.manager.dataError,
  status: state.manager.status,
  locations: state.locations,
});

export default connect(mapStateToProps, { getRequests, getLocations, searchRequests })(ManagerRequests);
