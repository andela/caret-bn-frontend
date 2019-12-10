import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const Home = (props) => {
  const { user } = props;
  if (user === null) {
    return <Redirect to="/login" />;
  }
  return (
    <div className="header">
      <h1>Welcome to barefoot Nomad</h1>
      <h4>{user.name}</h4>
    </div>
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
