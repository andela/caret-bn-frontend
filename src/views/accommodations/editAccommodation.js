/* eslint-disable guard-for-in */
/* eslint-disable no-console */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-prototype-builtins */
import React, { Component } from 'react';
import {
  Row, Col, Button, Container, Form, Card,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import { Edit } from '@material-ui/icons';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { GetSingleAccommodation, updateAccommodation, resetAccommodationState } from '../../actions/accommodationActions';
import { getLocations } from '../../actions/locationActions';
import AlertComponent from '../../components/global/AlertComponent';
import PageLaoding from '../../components/global/PageLoading';

class editAccommodation extends Component {
  state = {
    isLoading: true,
    isSaving: false,
    accommodation: this.props.accommodation,
    updatedAccommodation: {},
  }

  componentDidMount = async () => {
    const { GetSingleAccommodation, getLocations } = this.props;
    const { slug } = this.props.match.params;
    await GetSingleAccommodation(slug);
    await getLocations();
    await this.setState({
      accommodation: this.props.accommodation,
      isLoading: false,
    });
  }

  imageHolder = (image, alt, key) => (
    <div className="accommodation-edit-image-holder">
      <img src={image} alt={`${alt}`} key={key} />
    </div>
  )

  handleChange = async (e) => {
    const { name, value } = e.target;
    await this.setState((prevState) => ({
      accommodation: {
        ...prevState.accommodation,
        [name]: value,
      },
      updatedAccommodation: {
        ...prevState.updatedAccommodation,
        [name]: value,
      },
    }));
  }

  handleFileChange = async (e) => {
    const { target } = e;
    this.setState((prevState) => ({
      updatedAccommodation: {
        ...prevState.updatedAccommodation,
        images: target.files,
      },
    }));
  }

  updateAccommodation = (e) => {
    this.setState({
      isSaving: true,
    });
    e.preventDefault();
    const { updatedAccommodation } = this.state;
    const { updateAccommodation, accommodation } = this.props;
    const formData = new FormData();
    const {
      name, description, locationId, availableSpace, cost, currency, highlights, amenities, images,
    } = updatedAccommodation;
    const data = {
      name, description, locationId, availableSpace, cost, currency, highlights, amenities,
    };

    if (images) {
      Object.values(images).forEach((image) => {
        formData.append('image', image);
      });
    }

    for (const key in data) {
      if (data[key]) {
        formData.append(key, data[key]);
      }
    }
    updateAccommodation(formData, accommodation.id);
  }

  editFailed = (message, name) => <AlertComponent variant="danger" message={message} heading={`Unable to update ${name}`} dismissible data-test="error-alert" />

  render() {
    const {
      locations, status, updateError, resetAccommodationState,
    } = this.props;
    const { isLoading, accommodation, isSaving } = this.state;
    if (isLoading) {
      return <PageLaoding data-test="loading-page" />;
    }
    if (status === 'success') {
      resetAccommodationState();
      return <Redirect to={`/accommodations/${accommodation.slug}`} data-test="redirect" />;
    }

    return (
      <Container fluid>
        <Form onSubmit={this.updateAccommodation} className="edit-form" data-test="form">
          <Row className="error-holder">
            {
              (status === 'fail')
                ? this.editFailed(updateError.data.message, accommodation.name)
                : ''
            }
          </Row>
          <Row className="section">
            <h4>
              Editing
              {' '}
              {' '}
              {accommodation.name}
            </h4>
            <p>Lets get your details right</p>
            <div />
          </Row>
          <Row className="white-background">
            <Col sm="12" xs="12" md="6" lg="4">
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control as="input" onChange={this.handleChange} name="name" data-test="edit-acc-name" value={accommodation.name} required />
              </Form.Group>
            </Col>
            <Col sm="12" xs="12" md="6" lg="4">
              <Form.Group>
                <Form.Label>Available Space</Form.Label>
                <Form.Control as="input" onChange={this.handleChange} name="availableSpace" data-test="edit-acc-availableSpace" value={accommodation.availableSpace} required />
              </Form.Group>
            </Col>
            <Col sm="12" xs="12" md="6" lg="4">
              <Form.Group>
                <Form.Label>Cost</Form.Label>
                <Form.Control as="input" onChange={this.handleChange} name="cost" data-test="edit-acc-availableSpace" value={accommodation.cost} required />
              </Form.Group>
            </Col>
            <Col sm="12" xs="12" md="6" lg="4">
              <Form.Group>
                <Form.Label>Location</Form.Label>
                <Form.Control as="select" onChange={this.handleChange} name="locationId" data-test="edit-acc-location" required>
                  {locations.data.data.map((location) => <option value={location.id} selected={(accommodation.accommodationLocation.id === location.id)}>{location.name}</option>)}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row className="white-background">
            <Col xs={12} sm={12} md={6} lg={4}>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <CKEditor
                  editor={ClassicEditor}
                  data={accommodation.description}
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
            </Col>
            <Col xs={12} sm={12} md={6} lg={4}>
              <Form.Group>
                <Form.Label>Highlights</Form.Label>
                <CKEditor
                  editor={ClassicEditor}
                  data={accommodation.highlights}
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
            </Col>
            <Col xs={12} sm={12} md={6} lg={4}>
              <Form.Group>
                <Form.Label>Amenities</Form.Label>
                <CKEditor
                  editor={ClassicEditor}
                  data={accommodation.amenities}
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
            </Col>
          </Row>
          <Row className="white-background">
            <Col className="accommodation-edit-images" sm="12" xs="12" md="12" lg="12">
              {
                (accommodation.images.constructor === Array)
                  ? accommodation.images.map((image, index) => this.imageHolder(image, accommodation.name, index))
                  : this.imageHolder(accommodation.images, accommodation.name, 0)
              }
            </Col>
          </Row>
          <Row>
            <Col sm="12" xs="12" md="6" lg="4">
              <Form.Control name="images" type="file" onChange={this.handleFileChange} accept="image/*" multiple="multiple" />
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={12} md={6} lg={6}>
              <Button type="submit" className="full-width-buttons" data-test="edit-acc-update-acc">
                {isSaving ? <i style={{ fontSize: '20px' }} className="fas fa-spinner fa-pulse" /> : 'Update Accommodation'}
              </Button>
            </Col>
            <Col xs={12} sm={12} md={6} lg={4}>
              <Link to={`/accommodations/${accommodation.slug}`} className="blank-link">
                <Button type="button" className="full-width-buttons" variant="danger">
                  Cancel
                </Button>
              </Link>
            </Col>
          </Row>
        </Form>
      </Container>
    );
  }
}

editAccommodation.propTypes = {
  accommodation: PropTypes.object.isRequired,
  updateAccommodation: PropTypes.func.isRequired,
  resetAccommodationState: PropTypes.func.isRequired,
};

const matchStateToProps = (state) => ({
  accommodation: state.accommodation.singleAccommodation,
  status: state.accommodation.updateStatus,
  updateError: state.accommodation.updateError,
  locations: state.locations,
});

export default connect(matchStateToProps, {
  GetSingleAccommodation, getLocations, updateAccommodation, resetAccommodationState,
})(editAccommodation);
