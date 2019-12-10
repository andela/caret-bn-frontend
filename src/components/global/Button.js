import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) => {
  const {
    name, onClick, styleClass, image,
  } = props;
  return (
    <button type="submit" onClick={onClick} className={styleClass}>
      {image ? <img src={image} alt="social logo" /> : null}
      {name}
    </button>
  );
};

Button.propTypes = {
  name: PropTypes.any.isRequired,
  onClick: PropTypes.func,
  styleClass: PropTypes.any,
  image: PropTypes.any,
};

export default Button;
