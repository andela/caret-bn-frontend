import React from 'react';
import { Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { hideAlert } from '../../actions/alertAction';

const AlertComponent = (props) => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.alert.isShown);
  const { variant, heading, message } = props;

  if (show) {
    return (
      <Alert data-test="data-alert" onClose={() => dispatch(hideAlert())} variant={variant} dismissible>
        <Alert.Heading>{heading}</Alert.Heading>
        <p>
          {message}
        </p>
      </Alert>
    );
  } return null;
};

AlertComponent.propTypes = {
  variant: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default AlertComponent;
