import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Container, Row, Button, Col,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Add } from '@material-ui/icons';
import { Link, Redirect } from 'react-router-dom';
import { getRequestsAction } from '../../actions/requestsActions';
import Breadcrumbs from '../../components/global/Breadcrumbs';
import RequestItem from '../../components/pages/requests/RequestItem';
import SearchBar from '../../components/pages/requests/SearchBar';
import { checkSupplier } from '../../helpers/authHelper';

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
    { data && data.map((item) => (
          <Row key={item.id}>
            <RequestItem item={item} />
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
    const { searchRequests } = props;
    const { status, searchDataError } = searchRequests;
    const { searchData } = searchRequests;

    if (props.data) {
      data = props.data;
    }
    if (props.dataError) {
      dataError = props.dataError;
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

          <SearchBar />

          <Row className="text-center mx-auto">
            {isLoading ? <i className="fas fa-spinner fa-pulse loader-big" /> : ''}
          </Row>

          <Row className="text-center mx-auto">
          {status && <Row className="section"><h4>Results of your search:</h4></Row>}
          </Row>

          <Row />
          { status === '' && this.renderResults(data, dataError)}
          { status !== '' && this.renderResults(searchData, searchDataError)}
        </Container>
      </>
    );
  }
}

export const mapStateToProps = (state) => ({
  data: state.requests.data,
  dataError: state.requests.dataError,

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
