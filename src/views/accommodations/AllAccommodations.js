/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { Add } from '@material-ui/icons';
import authHelper from '../../helpers/authHelper';

const { checkSupplier } = authHelper;

export class AllAccommodations extends Component {
  render() {
    return (
            <div>
                <h1>All Accommodations</h1>
                { checkSupplier() ? (
                    <ButtonToolbar>
                        <Button href="/accommodations/new">
                            <Add />
                            Create new accommodation
                        </Button>
                    </ButtonToolbar>
                ) : null}
            </div>
    );
  }
}

export default AllAccommodations;
