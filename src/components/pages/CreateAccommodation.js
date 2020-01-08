/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */
/* eslint-disable array-callback-return */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import {
  Form, Container, Row, Col, Button, Card,
} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import createAccommodation from '../../actions/accommodationActions';
import { getLocations } from '../../actions/locationActions';
import Breadcrumbs from '../global/Breadcrumbs';
import AlertComponent from '../global/AlertComponent';

export class CreateAccommodation extends Component {
  state = {
    name: '',
    description: '',
    locationId: '',
    availableSpace: '',
    cost: '',
    currency: '',
    highlights: '',
    amenities: '',
    selectedFile: null,
    isLoading: false,
  };

  componentDidMount() {
    const { getLocations: fetchLocations } = this.props;
    fetchLocations();
  }

  static getDerivedStateFromProps(nextProps, state) {
    const {
      accommodationData, status, history,
    } = nextProps;

    switch (status) {
      case 'Success':
        if (state.isLoading) history.push(`/accommodations/${accommodationData.data.slug}`);
        return {
          isLoading: false,
        };
      case 'Failure':
        return {
          isLoading: false,
        };
      default:
        return null;
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleFileChange = (e) => {
    this.setState({ selectedFile: e.target.files });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ isLoading: true });
    const {
      name, description, locationId, availableSpace, cost, currency, highlights, amenities, selectedFile,
    } = this.state;

    const formData = new FormData();

    Object.values(selectedFile).forEach((image) => {
      formData.append('image', image);
    });
    const data = {
      name, description, locationId, availableSpace, cost, currency, highlights, amenities,
    };
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        formData.append(key, data[key]);
      }
    }
    const { createAccommodation: addAccommodation } = this.props;
    addAccommodation(formData);
  };

  render() {
    const { isLoading } = this.state;
    const { accommodationError, locations } = this.props;
    return (

      <div className="create-accommodation">
        <Container>
          <Row>
            <Col className="breadcrumbs">
              <Breadcrumbs itemsArray={['> Home', 'Accommodations', 'New accommodation']} />
            </Col>
          </Row>
          <Card style={{ margin: '10px 0' }}>
            <Card.Body>
              <Card.Title>Create Accommodation</Card.Title>
              <Card.Text>
                <Form id="accommodation-form" onSubmit={this.handleSubmit}>
                  <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="name" onChange={this.handleChange} placeholder="Name..." title="Enter the name" required />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Available Space</Form.Label>
                    <Form.Control type="number" min="1" name="availableSpace" onChange={this.handleChange} placeholder="Available space..." title="Enter the number of available rooms" required />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Cost</Form.Label>
                    <Form.Control name="cost" type="number" min="1" onChange={this.handleChange} placeholder="Cost..." title="Enter the cost" maxLength="100" required />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Currency</Form.Label>
                    <Form.Control as="select" name="currency" onChange={this.handleChange} required>
                      <option selected disabled>Select currency</option>
                      <option value="RWF">RWF</option>
                      <option value="UGX">UGX</option>
                      <option value="KSH">KSH</option>
                      <option value="USD">USD</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Location</Form.Label>
                    <Form.Control as="select" name="locationId" onChange={this.handleChange} required>
                      <option selected disabled>Select location</option>
                      {
                        locations ? locations.data.map((location) => <option value={location.id}>{location.name}</option>) : null
                      }
                    </Form.Control>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <CKEditor
                      editor={ClassicEditor}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        const handleChangeData = {
                          target: {
                            name: 'description',
                            value: data,
                          },
                        };
                        this.handleChange(handleChangeData);
                      }}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Amenities</Form.Label>
                    <CKEditor
                      editor={ClassicEditor}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        const handleChangeData = {
                          target: {
                            name: 'amenities',
                            value: data,
                          },
                        };
                        this.handleChange(handleChangeData);
                      }}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Highlights</Form.Label>
                    <CKEditor
                      editor={ClassicEditor}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        const handleChangeData = {
                          target: {
                            name: 'highlights',
                            value: data,
                          },
                        };
                        this.handleChange(handleChangeData);
                      }}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Image(s)</Form.Label>
                    <Form.Control id="image" name="selectedFile" type="file" onChange={this.handleFileChange} accept="image/*" multiple="multiple" required />
                  </Form.Group>
                  <Button variant="primary" type="submit" className="full-width-buttons">
                    {isLoading ? <i style={{ fontSize: '20px' }} className="fas fa-spinner fa-pulse" /> : 'Create'}
                  </Button>
                </Form>
                <Row>
                    <Col>
                      {accommodationError && <AlertComponent variant="danger" heading="Error" message={accommodationError.data.message} />}
                    </Col>
                </Row>
              </Card.Text>
            </Card.Body>
          </Card>
        </Container>

      </div>
    );
  }
}

CreateAccommodation.propTypes = {
  createAccommodation: PropTypes.func,
  getLocations: PropTypes.func,
  accommodationData: PropTypes.object,
  accommodationError: PropTypes.object,
  status: PropTypes.string,
  locations: PropTypes.array,
  history: PropTypes.object,
};

const mapStateToProps = (state) => ({
  accommodationData: state.accommodation.accommodationData,
  accommodationError: state.accommodation.accommodationError,
  status: state.accommodation.status,
  locations: state.locations.data,
  locationError: state.locations.dataError,
});

export default compose(withRouter, connect(mapStateToProps, { getLocations, createAccommodation }))(CreateAccommodation);
