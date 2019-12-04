/* eslint-disable react/no-did-update-set-state */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import extractObject from '../utilities/objectExtraction';
import { socialAuthAction } from '../actions/authActions';
import error from '../assets/images/error.png';
import stopwatch from '../assets/images/stopwatch.png';

class SocialAuthSuccess extends Component {
  state = {
    loadingStatus: true,
    loadingMessage: 'Please wait...',
    loadingHeader: 'Logging you in....',
    image: stopwatch,
  }

  async componentDidMount() {
    const {
      location: { search }, socialAuthAction,
    } = this.props;
    await extractObject(search).then((user) => {
      socialAuthAction(user).then(() => {
        this.setState({
          loadingStatus: false,
        });
      });
    });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      dataError, status,
    } = nextProps;
    if (status === 'failure') {
      return { loadingMessage: dataError, loadingHeader: 'There was a problem loggin you in', image: error };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.status === 'failure') {
      this.setState({ loadingMessage: prevProps.dataError, loadingHeader: 'There was a problem loggin you in', image: error });
    }
  }

  render() {
    const {
      loadingMessage, loadingHeader, loadingStatus, image,
    } = this.state;
    const loadingState = (
      <div className="authenticating-message">
        <img src={image} alt="loader" />
        <h1>{loadingHeader}</h1>
        <h4>{loadingMessage}</h4>
      </div>
    );

    return (loadingStatus ? loadingState : <Redirect to="/" />);
  }
}

SocialAuthSuccess.propTypes = {
  location: PropTypes.object.isRequired,
  socialAuthAction: PropTypes.func.isRequired,
  dataError: PropTypes.string,
  status: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  status: state.auth.status,
  dataError: state.auth.dataError,
});

export default connect(mapStateToProps, { socialAuthAction })(SocialAuthSuccess);
