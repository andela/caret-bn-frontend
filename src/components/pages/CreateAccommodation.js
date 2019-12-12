/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */
/* eslint-disable array-callback-return */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Form, Container, Row, Col,
} from 'react-bootstrap';
import createAccommodation from '../../actions/accommodationActions';
import Button from '../global/Button';
import MenuBar from '../global/menuBar';
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

    static getDerivedStateFromProps(nextProps) {
      const {
        accommodationData, status,
      } = nextProps;

      switch (status) {
        case 'Success':
          window.location.replace(`/accommodations/${accommodationData.data.slug}`);
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
      e.preventDefault();
      const { name, value } = e.target;
      this.setState({
        [name]: value,
      });
    };

    handleFileChange = (e) => {
      this.setState({ selectedFile: e.target.files });
    };

    // handleFileUpload = () => {
    //   const { selectedFile } = this.state;
    //   const formData = new FormData();
    //   for (let x = 0; x <= selectedFile.length; x += 1) {
    //     formData.append('image', selectedFile[x]);
    //   }
    // }

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
      // formData.append('name', name);
      // formData.append('description', description);
      // formData.append('locationId', locationId);
      // formData.append('availableSpace', availableSpace);
      // formData.append('cost', cost);
      // formData.append('currency', currency);
      // formData.append('highlights', highlights);
      // formData.append('amenities', amenities);

      const { createAccommodation: addAccommodation } = this.props;
      addAccommodation(formData);
    };

    render() {
      const { isLoading } = this.state;
      const { accommodationError } = this.props;

      return (

        <div className="create-accommodation">
          <MenuBar />
        <Container>
          <Row>
            <Col md={6} className="breadcrumbs">
              <Breadcrumbs itemsArray={['> Home', 'Accommodations', 'New accommodation']} />
            </Col>
          </Row>
          <Form id="accommodation-form" onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" onChange={this.handleChange} placeholder="Name..." title="Enter the name" minLength="10" maxLength="100" required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Available Space</Form.Label>
              <Form.Control type="number" min="1" max="99990" name="availableSpace" onChange={this.handleChange} placeholder="Available space..." title="Enter the number of available rooms" required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Cost</Form.Label>
              <Form.Control name="cost" type="number" min="1" max="99999" onChange={this.handleChange} placeholder="Cost..." title="Enter the cost" maxLength="100" required />
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
                  <option value="1">Kigali Office</option>
                  <option value="2">Nairobi office</option>
                  <option value="3">Kampala office</option>
                  <option value="4">Blantyre Office</option>
                  <option value="5">Lagos Office</option>
                  <option value="6">Accra Office</option>
                  <option value="7">Harare Office</option>
                </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows="3" id="description" name="description" type="text" onChange={this.handleChange} placeholder="Short description..." title="Enter a short description" minLength="10" maxLength="250" required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Amenities</Form.Label>
              <Form.Control as="textarea" rows="3" name="amenities" type="text" onChange={this.handleChange} placeholder="Amenities..." title="Enter available amenities" minLength="10" maxLength="250" required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Highlights</Form.Label>
              <Form.Control as="textarea" rows="3" name="highlights" type="text" onChange={this.handleChange} placeholder="Highlights..." title="Enter a few highlights" minLength="10" maxLength="250" required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Image(s)</Form.Label>
              <Form.Control id="image" name="selectedFile" type="file" onChange={this.handleFileChange} accept="image/*" multiple="multiple" required />
            </Form.Group>
            <Row>
              <Col>
                { accommodationError && <AlertComponent variant="danger" heading="Error" message={accommodationError.data.message} /> }
              </Col>
            </Row>
            <Button name={isLoading ? <i style={{ fontSize: '20px' }} className="fas fa-spinner fa-pulse" /> : 'Create'} />
          </Form>
        </Container>
        </div>
      );
    }
}

CreateAccommodation.propTypes = {
  createAccommodation: PropTypes.func,
  accommodationData: PropTypes.object,
  accommodationError: PropTypes.object,
  status: PropTypes.string,
};

const mapStateToProps = (state) => ({
  accommodationData: state.accommodation.accommodationData,
  accommodationError: state.accommodation.accommodationError,
  status: state.accommodation.status,
});

export default connect(mapStateToProps, { createAccommodation })(CreateAccommodation);
