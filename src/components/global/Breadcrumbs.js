/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
import PropTypes from 'prop-types';

const Breadcrumbs = ({ itemsArray }) => (
  <div>
    <Breadcrumb className="bc-bg">
      {itemsArray.map((item, i) => (
        <Breadcrumb.Item active={(i === itemsArray.length - 1)} key={i}>
          {item}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  </div>
);

Breadcrumbs.propTypes = {
  itemsArray: PropTypes.array.isRequired,
};

export default Breadcrumbs;
