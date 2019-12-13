import React from 'react';
import { Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';

const AlertComponent = (props) => {
  const { variant, heading, message } = props;
  return (
        <Alert variant={variant} dismissible>
            <Alert.Heading>{heading}</Alert.Heading>
            <p>
                {message}
            </p>
        </Alert>
  );
};

AlertComponent.propTypes = {
  variant: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default AlertComponent;
