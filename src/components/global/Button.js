import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) => {
  const { name } = props;
  return (
    <button type="submit" className="button">{name}</button>
  );
};

Button.propTypes = {
  name: PropTypes.any.isRequired,
};

export default Button;
