/* eslint-disable no-unused-expressions */
/* eslint-disable no-plusplus */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Container, Row, Button, Col, Pagination, Spinner,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Add } from '@material-ui/icons';
import { Link, Redirect } from 'react-router-dom';
import { getRequestsAction } from '../../actions/requestsActions';
import Breadcrumbs from '../../components/global/Breadcrumbs';
import RequestItem from '../../components/pages/requests/RequestItem';
import SearchBar from '../../components/pages/requests/SearchBar';
import { checkSupplier, checkManager } from '../../helpers/authHelper';
import { cancelResetPageAction } from '../../actions/resetPageAction';
import AlertComponent from '../../components/global/AlertComponent';
import { hideAlert } from '../../actions/alertAction';


export class ViewRequests extends Component {
  state = {
    isLoading: false,
    currentPage: 1,
  }

  async componentDidMount() {
    const { props } = this;
    this.setState({ isLoading: true });

    await props.getRequestsAction();

    this.setState({ isLoading: false });
  }

  async componentWillUnmount() {
    const { hideAlert } = this.props;
    await hideAlert();
  }

  pageList = (currentPage, data) => {
    const numberPages = Math.ceil(data.length / 6);
    const pages = [];
    for (let i = 1; i <= numberPages; i++) {
      pages.push(
        <Pagination.Item key={i} onClick={() => this.setState({ currentPage: i })} active={currentPage === i}>{i}</Pagination.Item>,
      );
    }
    return pages;
  }

  resetPage = () => {
    const { props } = this;
    props.cancelResetPageAction();
    this.setState({
      currentPage: 1,
    });
  };

  renderResults = (data, dataError, currentPage) => {
    const start = (currentPage - 1) * 6;
    return (
      <div className="mx-2">
        { data && data.length === 0 && (
          <Row>
            No request
          </Row>
        ) }

        {data && data.length > 0 && (
          <p>
            Showing requests
            {' '}
            { start + 1 }
            {' '}
            to
            {' '}
            { data.slice(start, currentPage * 6).length + start }
          </p>
        )}

        <Row className="d-flex">
          { data && data.slice(start, currentPage * 6).map((item) => (
            <RequestItem key={item.id} item={item} />
          )) }
        </Row>
      </div>
    );
  }

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
    const { props } = this;
    const {
      searchDataError, searchData, status, resetState,
    } = props;
    const { isLoading, currentPage } = this.state;

    if (props.data) {
      data = props.data;
    }
    if (props.dataError) {
      dataError = props.dataError;
    }

    if (props.statsData) {
      statsData = props.statsData.data.Trips;
    }
    if (props.statsError) {
      statsError = props.statsError;
    }

    (resetState) ? this.resetPage() : currentPage;

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
            {status === 'search-success' && <Row className="section"><p>Results of your search:</p></Row>}
          </Row>
          <Row className="text-center mx-auto">
          {status === 'stats-success' && (
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

          { status === 'stats-success' && this.renderResults(statsData, statsError, currentPage) }
          { status === 'all-success' && this.renderResults(data, dataError, currentPage)}
          { status === 'search-success' && this.renderResults(searchData, searchDataError, currentPage)}

          <Row>
            { status === 'stats-error' && <AlertComponent variant="danger" message={statsError.message} /> }
            { status === 'all-error' && <Row>{dataError.message}</Row> }
            { status === 'search-error' && <Row>{searchDataError.message}</Row> }
          </Row>

          {data && data.length > 0 && status === 'all-success' && (
            <Row className="center-items">
              <Pagination size="sm">
                <Pagination.First data-test="page-first" disabled={currentPage === 1} onClick={() => this.setState({ currentPage: 1 })} />
                <Pagination.Prev data-test="page-prev" disabled={currentPage === 1} onClick={() => this.setState({ currentPage: currentPage - 1 })} />
                {this.pageList(currentPage, data)}
                <Pagination.Next data-test="page-next" disabled={currentPage === Math.ceil(data.length / 6)} onClick={() => this.setState({ currentPage: currentPage + 1 })} />
                <Pagination.Last data-test="page-last" disabled={currentPage === Math.ceil(data.length / 6)} onClick={() => this.setState({ currentPage: Math.ceil(data.length / 6) })} />
              </Pagination>
            </Row>
          )}
          {searchData && searchData.length > 0 && status === 'search-success' && (
            <Row className="center-items">
              <Pagination size="sm">
                <Pagination.First data-test="page-first" disabled={currentPage === 1} onClick={() => this.setState({ currentPage: 1 })} />
                <Pagination.Prev data-test="page-prev" disabled={currentPage === 1} onClick={() => this.setState({ currentPage: currentPage - 1 })} />
                {this.pageList(currentPage, searchData)}
                <Pagination.Next data-test="page-next" disabled={currentPage === Math.ceil(searchData.length / 6)} onClick={() => this.setState({ currentPage: currentPage + 1 })} />
                <Pagination.Last data-test="page-last" disabled={currentPage === Math.ceil(searchData.length / 6)} onClick={() => this.setState({ currentPage: Math.ceil(searchData.length / 6) })} />
              </Pagination>
            </Row>
          )}
        </Container>
      </>
    );
  }
}

export const mapStateToProps = (state) => ({
  data: state.requests.data,
  dataError: state.requests.dataError,
  searchData: state.requests.searchData,
  searchDataError: state.requests.searchDataError,
  statsData: state.requests.statsData,
  statsError: state.requests.statsError,
  status: state.requests.status,
  resetState: state.resetPageReducer.resetState,

});

ViewRequests.propTypes = {
  getRequestsAction: PropTypes.func.isRequired,
  cancelResetPageAction: PropTypes.func.isRequired,
  data: PropTypes.object,
  dataError: PropTypes.object,
  status: PropTypes.string,
  searchData: PropTypes.object,
  searchDataError: PropTypes.object,
  resetState: PropTypes.any,
  statsData: PropTypes.any,
  statsError: PropTypes.any,
  hideAlert: PropTypes.func,
};

export default connect(mapStateToProps, { getRequestsAction, cancelResetPageAction, hideAlert })(ViewRequests);
