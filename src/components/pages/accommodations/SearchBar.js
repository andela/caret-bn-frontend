import React, { Component } from 'react';
import {
  Col, Button, Row, Form,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { showAlert } from '../../../actions/alertAction';
import AlertComponent from '../../global/AlertComponent';
import { getLocations } from '../../../actions/locationActions';
import { accommodationSearch } from '../../../actions/accommodationActions';

class SearchBar extends Component {
  state = {
    params: null,
    error: {
      status: false,
      heading: null,
      message: null,
    },
  }

  componentDidMount = async () => {
    const { getLocations } = this.props;
    await getLocations();
  }

  submitSearch = async () => {
    const { params } = this.state;
    const {
      showAlert, startSearch, accommodationSearch, stopLoader,
    } = this.props;
    await this.setState({
      error: {
        status: false,
        heading: null,
      },
    });
    if (params === null) {
      await this.setState({
        error: {
          status: true,
          heading: 'Empty Search',
          message: 'You need to enter details',
        },
      });
      return showAlert();
    }
    let searchParams = '';
    Object.keys(params).forEach((key) => {
      if (params[`${key}`] !== '') {
        searchParams += `${key}=${params[`${key}`]}&`;
      }
    });
    searchParams = searchParams.substring(0, searchParams.length - 1);
    if (searchParams !== '') {
      searchParams = `?${searchParams}`;
    }
    startSearch();
    await accommodationSearch(searchParams);
    stopLoader();
  };

  handleChange = async (e) => {
    const { name, value } = e.target;
    await this.setState((prevState) => ({
      params: {
        ...prevState.params,
        [name]: value,
      },
    }));
  }

  render() {
    const { locations, endSearch } = this.props;
    const { error } = this.state;
    return (
      <Row style={{ margin: '10px' }}>
        <Form>
          <Row className="center-items">
            {
              (error.status) ? <AlertComponent variant="danger" heading={error.heading} message={error.message} /> : ''
            }
          </Row>
          <Row>
            <Col xs={12} sm={12} md={6} lg={6}>
              <Form.Group>
                <Form.Control as="select" name="location" data-test="location" onChange={(e) => this.handleChange(e)}>
                  <option selected disabled>Select Location...</option>
                  <option value="">None</option>
                  {
                    locations ? locations.data.map((location) => <option key={location.id} value={location.name}>{location.name}</option>) : null
                  }
                </Form.Control>
              </Form.Group>
            </Col>
            <Col xs={12} sm={12} md={6} lg={6}>
              <Form.Group>
                <Form.Control as="input" name="name" data-test="name" placeholder="Name" onChange={(e) => this.handleChange(e)} />
              </Form.Group>
            </Col>
            <Col xs={12} sm={12} md={6} lg={6}>
              <Form.Group>
                <Form.Control as="input" name="description" data-test="description" placeholder="Description" onChange={(e) => this.handleChange(e)} />
              </Form.Group>
            </Col>
            <Col xs={12} sm={12} md={6} lg={6}>
              <Form.Group>
                <Form.Control as="input" name="highlights" data-test="highlights" placeholder="Highlights" onChange={(e) => this.handleChange(e)} />
              </Form.Group>
            </Col>

            <Col xs={12} sm={12} md={6} lg={6}>
              <Form.Group>
                <Form.Control as="input" name="amenities" data-test="amenities" placeholder="Amenities" onChange={(e) => this.handleChange(e)} />
              </Form.Group>
            </Col>
            <Col xs={12} sm={12} md={6} lg={6}>
              <Form.Group>
                <Form.Control as="input" name="rating" data-test="rating" placeholder="Rating" onChange={(e) => this.handleChange(e)} />
              </Form.Group>
            </Col>
          </Row>
          <Row className="center-items">
            <Button className="full-width-buttons" data-test="submit-button" onClick={() => this.submitSearch()}>Search</Button>
            <Button className="full-width-buttons" data-test="show-all-button" onClick={() => endSearch()}>Show All</Button>
          </Row>
        </Form>
      </Row>
    );
  }
}

const mapStateToProps = (state) => ({
  locations: state.locations.data,
});

export default connect(mapStateToProps, { getLocations, showAlert, accommodationSearch })(SearchBar);
