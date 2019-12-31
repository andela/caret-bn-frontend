/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Container, Row, Button, Col,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { getManagerRequestAction } from '../../actions/managerRequestAction';
import Breadcrumbs from '../../components/global/Breadcrumbs';
import ManagerItem from '../../components/pages/manager/ManagerItem';
import Alert from '../../components/global/AlertComponent';
import SearchBar from '../../components/pages/requests/SearchBar';

export class ManagerView extends Component {
  state = {
    isLoading: false,
  }

  async componentDidMount() {
    const { props } = this;
    this.setState({ isLoading: true });


    await props.getManagerRequestAction();

    this.setState({ isLoading: false });
  }

  renderResults = (data, dataError) => (

    <div>
    { data && data.length === 0 && (
      <Row>
        No request
      </Row>
    ) }
    { data && data.map((item) => (
          <Row key={item.id}>
            <ManagerItem item={item} user={item.requester.username} email={item.requester.email} />
          </Row>
    )) }
        <Row>
          { dataError && <Row>{dataError.message}</Row> }
        </Row>
    </div>
  );

  render() {
    let data;
    let dataError;
    const { isLoading } = this.state;
    const { props } = this;
    const { managerSearchRequest } = props;
    const { status, managerSearchDataError, managerSearchData } = managerSearchRequest;
    // eslint-disable-next-line no-nested-ternary
    props.data ? data = props.data.data : props.dataError ? dataError = props.dataError : '';

    return (
      <>
      <Container>
        <Row>
          <Col md={4} className="breadcrumbs">
            <Breadcrumbs itemsArray={['> Home', 'Management']} />
          </Col>
          <Col md={5} />
        </Row>

        <Row className="text-center mx-auto">
          {isLoading ? <i className="fas fa-spinner fa-pulse loader-big" /> : ''}
        </Row>
        <Row />
        <SearchBar />
        {data && data.length === 0 && <Alert variant="danger" heading="Error" message="No Requests Found" />}
        {status === '' && data && data.map((user) => (
          user.requests.map((item) => (
            <Row key={item.id}>
              <ManagerItem item={item} user={user.username} email={user.email} />
            </Row>
          ))
        ))}
        <Row>
          {dataError && <Alert variant="danger" heading="Error" message={dataError.message} />}
        </Row>
        <Row />
          { status !== '' && this.renderResults(managerSearchData, managerSearchDataError)}
      </Container>
      </>
    );
  }
}

export const mapStateToProps = (state) => ({
  data: state.managerRequest.data,
  dataError: state.managerRequest.dataError,
  managerSearchRequest: state.managerSearchRequest,
});

ManagerView.propTypes = {
  getManagerRequestAction: PropTypes.func.isRequired,
  history: PropTypes.any,
  data: PropTypes.object,
  dataError: PropTypes.object,
  managerSearchRequest: PropTypes.object,
  status: PropTypes.string,
  managerSearchData: PropTypes.object,
  managerSearchDataError: PropTypes.object,
};

export default connect(mapStateToProps, { getManagerRequestAction })(ManagerView);
