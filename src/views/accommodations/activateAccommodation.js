import React from 'react';
import { Redirect } from 'react-router-dom';
import ActivateDeactivateAccommodation from '../../components/pages/ActivateDeactivateAccommodation';
import { checkTravel } from '../../helpers/authHelper';

export const ActivateAccommodations = (props) => (checkTravel() ? (<ActivateDeactivateAccommodation slug={props.match.params.slug} />) : <Redirect to="/accommodations" />);

export default ActivateAccommodations;
