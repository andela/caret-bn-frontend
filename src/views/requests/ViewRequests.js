import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Container, Row, Button, Col,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Add } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { getRequestsAction } from '../../actions/requestsActions';
import Breadcrumbs from '../../components/global/Breadcrumbs';
import RequestItem from '../../components/pages/requests/RequestItem';
import Alert from '../../components/global/AlertComponent';

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

  render() {
    let data;
    let dataError;
    const { isLoading } = this.state;
    const { props } = this;
    if (props.data) {
      data = props.data.data;
    }
    if (props.dataError) {
      dataError = props.dataError;
    }

    return (
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

        <Row className="text-center mx-auto">
          {isLoading ? <i className="fas fa-spinner fa-pulse loader-big" /> : ''}
        </Row>
        <Row />
        {data && data.length === 0 && <Alert variant="danger" heading="Error" message="No Requests Found" />}
        {data && data.map((item) => (
          <Row key={item.id}>
            <RequestItem item={item} />
          </Row>
        ))}
        <Row>
          {dataError && <Alert variant="danger" heading="Error" message={dataError.message} />}
        </Row>
      </Container>
    );
  }
}

export const mapStateToProps = (state) => ({
  data: state.requests.data,
  dataError: state.requests.dataError,
});

ViewRequests.propTypes = {
  getRequestsAction: PropTypes.func.isRequired,
  history: PropTypes.any,
  data: PropTypes.object,
  dataError: PropTypes.object,
};

export default connect(mapStateToProps, { getRequestsAction })(ViewRequests);
