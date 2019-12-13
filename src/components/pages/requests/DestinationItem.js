import React from 'react';
import PropTypes from 'prop-types';

const DestinationItem = ({ destination, index }) => (
    <div data-test="destination-item">
      <span className="font-weight-bold">
       Destination
      </span>
      {' '}
      {index + 1}
      {': '}
      {destination.location.name}
      {' - '}
      {destination.location.country}
    </div>
);

DestinationItem.propTypes = {
  destination: PropTypes.object,
  index: PropTypes.number,
};

export default DestinationItem;
