import React from 'react';
import { Redirect } from 'react-router-dom';
import CreateAccommodation from '../../components/pages/CreateAccommodation';
import { checkSupplier } from '../../helpers/authHelper';

export const Accommodations = () => (checkSupplier() ? (<CreateAccommodation />) : <Redirect to="/accommodations" />);

export default Accommodations;
