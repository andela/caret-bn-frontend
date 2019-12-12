import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
// import { Container } from 'react-bootstrap';
import MenuBar from './global/menuBar';

const Home = (props) => {
  const token = window.localStorage.getItem('token');
  const { user } = props;
  if (user === null && token === null) {
    return <Redirect to="/login" />;
  }

  return (
    <>
        <MenuBar />
    </>
  );
};

Home.defaultProps = {
  user: null,
};

Home.propTypes = {
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  user: state.auth.data,
});

export default connect(mapStateToProps, {})(Home);
