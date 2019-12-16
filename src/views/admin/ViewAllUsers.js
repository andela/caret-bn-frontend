/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { Redirect } from 'react-router-dom';
import ViewUsers from '../../components/pages/admin/ViewUsers';
import { checkAdmin } from '../../helpers/authHelper';

export const ViewAllUsers = () => (checkAdmin() ? (<ViewUsers />) : <Redirect to="/profile" />);

export default ViewAllUsers;
