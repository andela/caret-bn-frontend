import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { processRequestAction, singleRequestAction } from '../../../actions/requestsActions';
import { getManagerRequestAction } from '../../../actions/managerRequestAction';

export class ProcessRequest extends Component {
  state = {
    isLoading: false,
  };

  processAction = async () => {
    const { props } = this;
    const { action, id } = props;

    this.setState({ isLoading: true });

    await props.processRequestAction(action, id);
    await props.getManagerRequestAction();
    await props.singleRequestAction(id);

    this.setState({ isLoading: false });
  };

  render() {
    const { isLoading } = this.state;
    const { action, variant, disabled } = this.props;

    return (
      <Button data-test="process-request-button" className="process-request-button btn-block" onClick={this.processAction} variant={variant} disabled={disabled}>
        { isLoading ? <i className="fas fa-spinner fa-pulse" /> : action }
      </Button>
    );
  }
}

ProcessRequest.propTypes = {
  action: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  id: PropTypes.number.isRequired,
  processRequestAction: PropTypes.func,
  getManagerRequestAction: PropTypes.func,
  singleRequestAction: PropTypes.func,
};

export const mapStateToProps = (state) => ({
  processRequest: state.processRequest,
});

export default connect(mapStateToProps, { processRequestAction, getManagerRequestAction, singleRequestAction })(ProcessRequest);
