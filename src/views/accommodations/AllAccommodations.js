/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { Add } from '@material-ui/icons';
import Row from 'react-bootstrap/Row';
import authHelper from '../../helpers/authHelper';
import AllAccommodation from '../../components/pages/AllAccommodation';

const { checkSupplier } = authHelper;

export class GetAllAccommodations extends Component {
  render() {
    return (
            <div>
                { checkSupplier() ? (
                    <ButtonToolbar>
                         <Row className="createButton">
                          <Button href="/accommodations/new">
                            <Add />
                            Create new accommodation
                          </Button>
                         </Row>
                        <AllAccommodation data-test="AllAccommodation" />
                    </ButtonToolbar>
                ) : null}
            </div>
    );
  }
}

export default GetAllAccommodations;
