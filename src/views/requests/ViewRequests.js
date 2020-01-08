import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Container, Row, Button, Col, Spinner,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Add } from '@material-ui/icons';
import { Link, Redirect } from 'react-router-dom';
import { getRequestsAction } from '../../actions/requestsActions';
import Breadcrumbs from '../../components/global/Breadcrumbs';
import RequestItem from '../../components/pages/requests/RequestItem';
import SearchBar from '../../components/pages/requests/SearchBar';
import { checkSupplier, checkManager } from '../../helpers/authHelper';

export class ViewRequests extends Component {
  state = {
    isLoading: false,
  }

  async componentDidMount() {
    const { props } = this;
    this.setState({ isLoading: true });

    await props.getRequestsAction();

    this.setState({ isLoading: false });
  }

  renderResults = (data, dataError) => (
    <div>
      { data && data.length === 0 && (
        <Row>
          No request
        </Row>
      ) }
      <Row className="d-flex justify-content-center mx-auto">
        { data && data.map((item) => (
          <RequestItem key={item.id} item={item} />
        )) }
      </Row>
      <Row>
        { dataError && <Row>{dataError.message}</Row> }
      </Row>
    </div>
  );

  allRequestsButton = () => (
    <Row>
      <Col xs={12} sm={6} md={4} lg={4}>
        <Button className="btn-block" style={{ width: '100%' }} onClick={() => this.componentDidMount()} data-test="all-requests-button">
          All requests
        </Button>
      </Col>
    </Row>
  )

  render() {
    let data;
    let dataError;
    let statsData;
    let statsError;
    const { isLoading } = this.state;
    const { props } = this;
    const { searchRequests, statsStatus } = props;
    const { status, searchDataError } = searchRequests;
    const { searchData } = searchRequests;

    if (props.data) {
      data = props.data;
    }
    if (props.dataError) {
      dataError = props.dataError;
    }

    if (statsStatus) {
      statsData = props.statsData.data.Trips;
      statsError = props.statsError;
    }

    return (
      <>
      { checkSupplier() && <Redirect to="/" />}
        <Container>
          <Row>
            <Col md={4} className="breadcrumbs">
              <Breadcrumbs itemsArray={['> Home', 'Requests']} />
            </Col>
            <Col md={5} />
            <Col>
              <Link to="/requests/create">
                <Button
                  variant="primary"
                >
                  <Add />
                  Place Request
                </Button>
              </Link>

            </Col>
          </Row>

          <SearchBar allRequestsButton={this.allRequestsButton} />

          <Row className="d-flex justify-content-center">
          {isLoading && (
            <div className="d-flex justify-content-center">
              <Spinner animation="grow" size="lg" variant="primary" />
            </div>
          )}
          </Row>

          <Row className="text-center mx-auto">
          {status && <Row className="section"><p>Results of your search:</p></Row>}
          </Row>
          <Row className="text-center mx-auto">
          {statsData && (
            <Row className="section">
              <p>
                You have made
                {' '}
                {statsData.length}
                {' '}
                trip(s)
              </p>
            </Row>
          )}
          </Row>

          <Row />
          { status === '' && statsStatus === null && this.renderResults(data, dataError) }
          { status !== '' && this.renderResults(searchData, searchDataError) }
          { statsStatus === 'success' && this.renderResults(statsData, statsError) }
        </Container>
      </>
    );
  }
}

export const mapStateToProps = (state) => ({
  data: state.requests.data,
  dataError: state.requests.dataError,
  statsData: state.requests.statsData,
  statsError: state.requests.statsError,
  statsStatus: state.requests.statsStatus,

  searchRequests: state.searchRequests,
});

ViewRequests.propTypes = {
  getRequestsAction: PropTypes.func.isRequired,
  data: PropTypes.object,
  dataError: PropTypes.object,
  searchRequests: PropTypes.object,
  status: PropTypes.string,
  searchData: PropTypes.object,
  searchDataError: PropTypes.object,
};

export default connect(mapStateToProps, { getRequestsAction })(ViewRequests);
