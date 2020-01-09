/* eslint-disable no-nested-ternary */
/* eslint-disable no-shadow */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import {
  Col, Container, Button, Row, Card, Spinner,
} from 'react-bootstrap';
import { Add, SearchOutlined } from '@material-ui/icons';
import { checkSupplier } from '../../helpers/authHelper';
import { GetAllAccommodation, likeUnlikeAccommodation } from '../../actions/accommodationActions';
import { getLocations } from '../../actions/locationActions';
import Breadcrumbs from '../global/Breadcrumbs';
import isAuthenticated from '../../helpers/isAuthenticated';
import { showAlert } from '../../actions/alertAction';
import SearchBar from './accommodations/SearchBar';
import AlertComponent from '../global/AlertComponent';
import AccommodationListItem from './accommodations/AccommodationListItem';


export class AllAccommodation extends React.Component {
  state = {
    isLoading: false,
    isSearching: false,
    userId: null,
    showSearch: false,
  };

  showSearch = () => {
    const currentSearchState = this.state.showSearch;
    this.setState({
      showSearch: !currentSearchState,
    });
  }

  stopLoader = () => {
    this.setState({
      isLoading: false,
    });
  }

  startSearch = () => {
    this.setState({
      isLoading: true,
      isSearching: true,
    });
  }

  endSearch = () => {
    this.setState({
      isSearching: false,
    });
    this.componentDidMount();
  }

  componentDidMount = async () => {
    this.setState({ isLoading: true });
    const userInfo = isAuthenticated();
    await this.props.GetAllAccommodation();
    this.setState({ isLoading: false });
    this.renderAcommodation = this.renderAcommodation.bind(this);
    await this.setState({
      userId: userInfo.payload.id,
    });
  }

  handleLike = async (slug, action) => {
    const { likeUnlikeAccommodation, GetAllAccommodation } = this.props;
    await likeUnlikeAccommodation(slug, action);
    await GetAllAccommodation();
  }

  handleDislike = async (slug, action) => {
    const { likeUnlikeAccommodation, GetAllAccommodation } = this.props;
    await likeUnlikeAccommodation(slug, action);
    await GetAllAccommodation();
  }

  renderAcommodation() {
    const {
      accommodations, searchResults, searchError, showAlert,
    } = this.props;
    let displayItems = {};
    if (searchError) {
      showAlert();
      return (
        <Container className="container-fluid">
          <AlertComponent message={searchError.message} heading="" variant="danger" />
        </Container>
      );
    }
    (!this.state.isSearching) ? displayItems = accommodations : displayItems = searchResults.data;
    if (displayItems) {
      const accommodation = displayItems.map((post) => (
        <AccommodationListItem post={post} handleLike={this.handleLike} handleDislike={this.handleDislike} userId={this.state.userId} data-test="accommodation-item" />
      ));
      return accommodation;
    }
    return (
      <div className="d-flex justify-content-center">
        <i className="fas fa-spinner fa-pulse loader-big" />
      </div>
    );
  }

  render() {
    const { isLoading, showSearch } = this.state;
    return (
      <div className="accommodation">
        <Row>
          <Col md={5} className="breadcrumbs">
            <Breadcrumbs itemsArray={['> Home', '  accommodations']} />
          </Col>
          <Col>
            {checkSupplier() ? (
              <Link to="/accommodations/new">
                <Button>
                  <Add />
                  Create new accommodation
                </Button>
              </Link>
            ) : null}
          </Col>
        </Row>
        <Row className="center-items">
          <Card className="acc-searchBar">
            <Row className="center-items">
              <Button className="full-width-button" onClick={() => this.showSearch()}>
                <SearchOutlined />
                {' '}
                {(showSearch) ? 'Close' : 'Open'}
                {' '}
                search panel
              </Button>
            </Row>
            {(showSearch)
              ? <SearchBar history={this.props.history} startSearch={this.startSearch} endSearch={this.endSearch} stopLoader={this.stopLoader} data-test="search-acc" />
              : ''}
          </Card>
        </Row>
        {isLoading
          ? (

            <div className="d-flex justify-content-center">
              <Spinner animation="border" animation="grow" size="lg" variant="primary" />
            </div>
          )
          : this.renderAcommodation()}
      </div>
    );
  }
}
AllAccommodation.propTypes = {
  GetAllAccommodation: PropTypes.func.isRequired,
  likeUnlikeAccommodation: PropTypes.func.isRequired,
  accommodations: PropTypes.array.isRequired,
};
export const mapStateToProps = (state) => ({
  accommodations: state.accommodation.getAccommodation,
  searchResults: state.accommodation.searchResults,
  searchError: state.accommodation.searchError,
});

export default withRouter(connect(mapStateToProps, {
  GetAllAccommodation, likeUnlikeAccommodation, showAlert, getLocations,
})(AllAccommodation));
