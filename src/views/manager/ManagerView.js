/* eslint-disable array-callback-return */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Container, Row, Col, Pagination, Spinner, Button,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { getManagerRequestAction } from '../../actions/managerRequestAction';
import Breadcrumbs from '../../components/global/Breadcrumbs';
import ManagerItem from '../../components/pages/manager/ManagerItem';
import Alert from '../../components/global/AlertComponent';
import SearchBar from '../../components/pages/requests/SearchBar';
import { checkManager } from '../../helpers/authHelper';
import { cancelResetPageAction } from '../../actions/resetPageAction';

export class ManagerView extends Component {
  state = {
    isLoading: false,
    currentPage: 1,
  }

  async componentDidMount() {
    const { props } = this;
    this.setState({ isLoading: true });

    await props.getManagerRequestAction();

    this.setState({ isLoading: false });
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
    const { isLoading } = this.state;
    const start = (currentPage - 1) * 6;
    return (
      <>
      {isLoading ? null : (
      <div className="mx-2">
          { data && data.length === 0 && (
            <Row>
              No request
            </Row>
          ) }

          {data && (
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
              <ManagerItem key={item.id} item={item} user={item.requester.username} email={item.requester.email} />
            )) }
          </Row>
          <Row>
            { dataError && <Row>{dataError.message}</Row> }
          </Row>
        </div>
      )}
      </>
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
    const dataData = [];
    const { isLoading } = this.state;
    const { currentPage } = this.state;
    const { props } = this;
    const { managerSearchRequest, resetState } = props;
    const { status, managerSearchDataError, managerSearchData } = managerSearchRequest;
    props.data ? data = props.data.data : props.dataError ? dataError = props.dataError : '';
    if (props.data) {
      data.map((user) => user.requests.map((item) => {
        const newItem = item;
        newItem.requester = { username: user.username, email: user.email };
        dataData.push(item);
      }));
    }

    (resetState) ? this.resetPage() : currentPage;

    return (
      <>
      {checkManager() ? <Redirect to="/" /> : (
        <Container>
          <Row>
            <Col md={4} className="breadcrumbs">
              <Breadcrumbs itemsArray={['> Home', 'Management']} />
            </Col>
            <Col md={5} />
          </Row>


          <SearchBar allRequestsButton={this.allRequestsButton} />

          <Row className="text-center mx-auto center-items">
            {isLoading && (
              <div className="d-flex justify-content-center">
                <Spinner animation="grow" size="lg" variant="primary" />
              </div>
            )}
          </Row>

          {data && data.length === 0 && <Alert variant="danger" heading="Error" message="No Requests Found" />}
          <Row>
            {dataError && <Alert variant="danger" heading="Error" message={dataError.message} />}
          </Row>

          { status === '' && dataData && this.renderResults(dataData, dataError, currentPage)}
          { status !== '' && this.renderResults(managerSearchData, managerSearchDataError, currentPage)}

          { (!isLoading && dataData && status === '') && (
              <Row className="center-items">
                <Pagination size="sm">
                  <Pagination.First data-test="page-first" disabled={currentPage === 1} onClick={() => this.setState({ currentPage: 1 })} />
                  <Pagination.Prev data-test="page-prev" disabled={currentPage === 1} onClick={() => this.setState({ currentPage: currentPage - 1 })} />
                  {this.pageList(currentPage, dataData)}
                  <Pagination.Next data-test="page-next" disabled={currentPage === Math.ceil(dataData.length / 6)} onClick={() => this.setState({ currentPage: currentPage + 1 })} />
                  <Pagination.Last data-test="page-last" disabled={currentPage === Math.ceil(dataData.length / 6)} onClick={() => this.setState({ currentPage: Math.ceil(dataData.length / 6) })} />
                </Pagination>
              </Row>
          )}
          { (!isLoading && managerSearchData && status !== '') && (
              <Row className="center-items">
                <Pagination size="sm">
                  <Pagination.First data-test="page-first" disabled={currentPage === 1} onClick={() => this.setState({ currentPage: 1 })} />
                  <Pagination.Prev data-test="page-prev" disabled={currentPage === 1} onClick={() => this.setState({ currentPage: currentPage - 1 })} />
                  {this.pageList(currentPage, managerSearchData)}
                  <Pagination.Next data-test="page-next" disabled={currentPage === Math.ceil(managerSearchData.length / 6)} onClick={() => this.setState({ currentPage: currentPage + 1 })} />
                  <Pagination.Last data-test="page-last" disabled={currentPage === Math.ceil(managerSearchData.length / 6)} onClick={() => this.setState({ currentPage: Math.ceil(managerSearchData.length / 6) })} />
                </Pagination>
              </Row>
          )}
        </Container>
      ) }
      </>
    );
  }
}

export const mapStateToProps = (state) => ({
  data: state.managerRequest.data,
  dataError: state.managerRequest.dataError,
  managerSearchRequest: state.managerSearchRequest,
  resetState: state.resetPageReducer.resetState,
});

ManagerView.propTypes = {
  getManagerRequestAction: PropTypes.func.isRequired,
  cancelResetPageAction: PropTypes.func.isRequired,
  resetState: PropTypes.any,
  data: PropTypes.object,
  dataError: PropTypes.object,
  managerSearchRequest: PropTypes.object,
  status: PropTypes.string,
  managerSearchData: PropTypes.object,
  managerSearchDataError: PropTypes.object,
};

export default connect(mapStateToProps, { getManagerRequestAction, cancelResetPageAction })(ManagerView);
