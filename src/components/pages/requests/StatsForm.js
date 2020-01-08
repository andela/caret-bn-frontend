import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import {
  Container, Row, Col, Button, Form,
} from 'react-bootstrap';
import moment from 'moment';
import { getStatsAction } from '../../../actions/requestsActions';

export class StatsForm extends Component {
  state = {
    isLoading: false,
    startDate: '',
    endDate: '',
    emptyParams: false,
  };

  handleStartDate = (startDate) => {
    const dateValue = moment(startDate).format('YYYY-MM-DD');
    this.setState((state) => ({ ...state, startDate: dateValue }));
  }

  handleEndDate = (endDate) => {
    const dateValue = moment(endDate).format('YYYY-MM-DD');
    this.setState((state) => ({ ...state, endDate: dateValue }));
  }

  getStats = async () => {
    const { props } = this;
    const { startDate, endDate } = this.state;

    if (!startDate || !endDate) {
      this.setState({ emptyParams: true });
    } else {
      this.setState({ isLoading: true, emptyParams: false });

      const statsParams = `?startDate=${startDate}&endDate=${endDate}`;
      await props.getStatsAction(statsParams);

      this.setState({ isLoading: false });
    }
  }

  render() {
    const {
      isLoading, startDate, endDate, emptyParams,
    } = this.state;

    const today = new Date();

    return (
      <>
        <Row>
          <Col>
            Enter a date range to get the stats...
          </Col>
        </Row>

        <Row>
          <Col xs={12} sm={6} md={4} lg={4}>
            <Form.Group className="day-picker-custom">
              <DayPickerInput className="day-picker" inputProps={{ style: { border: 0, outline: 0 } }} placeholder="Start Date..." value={startDate} onDayChange={this.handleStartDate} dayPickerProps={{ disabledDays: { after: today } }} />
            </Form.Group>
          </Col>
          <Col xs={12} sm={6} md={4} lg={4}>
            <Form.Group className="day-picker-custom">
              <DayPickerInput className="day-picker" inputProps={{ style: { border: 0, outline: 0 } }} placeholder="End Date..." value={endDate} onDayChange={this.handleEndDate} dayPickerProps={{ disabledDays: { after: today } }} />
            </Form.Group>
          </Col>
          <Col xs={12} sm={6} md={4} lg={4}>
            <Button className="btn-block" style={{ width: '100%' }} onClick={() => this.getStats()} data-test="get-stats">
              {isLoading ? <i className="fas fa-spinner fa-pulse" /> : 'Submit'}
            </Button>
          </Col>
        </Row>

        {emptyParams && (
          <small className="text-danger">
            Please provide a
            {' '}
            <b>Start Date</b>
            {' '}
            and an
            {' '}
            <b>End Date.</b>
          </small>
        )}
      </>
    );
  }
}

StatsForm.propTypes = {
  getStatsAction: PropTypes.func.isRequired,
};

export const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps, { getStatsAction })(StatsForm);
