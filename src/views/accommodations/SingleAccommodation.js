import React from 'react';
import SingleAccommodation from '../../components/pages/SingleAccommodation';

const GetsingleAccommodation = (props) => {
  const { slug } = props.match.params;
  return (
        <div>
            <SingleAccommodation data-test="singleAccommodation" slug={slug} />
        </div>
  )
};

export default GetsingleAccommodation;
