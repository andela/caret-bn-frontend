import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Home = () =>(
  <>
  </>
);

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
