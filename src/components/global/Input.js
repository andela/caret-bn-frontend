import React from 'react';
import PropTypes from 'prop-types';

const Input = ({
  type, id, name, value, onChange, placeholder, pattern, title,
}) => (
    <input
      type={type}
      name={name}
      className="form-input"
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      pattern={pattern}
      title={title}
      required
    />
);
Input.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  pattern: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Input;
