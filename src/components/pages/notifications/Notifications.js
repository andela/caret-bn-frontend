import React, { Component } from 'react';
import {
  Container, Row, Col, Button, Spinner,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { getNotifsAction, markAllNotifAction } from '../../../actions/notificationsActions';
import Breadcrumbs from '../../global/Breadcrumbs';
import NotificationItem from './NotificationItem';

export class Notifications extends Component {
  state = {
    isLoading: false,
  };

  async componentDidMount() {
    const { props } = this;
    const { getNotifsAction } = props;

    this.setState({ isLoading: true });
    await getNotifsAction();
    this.setState({ isLoading: false });
  }

  markAllUnread = async () => {
    const { props } = this;
    await props.markAllNotifAction('unread');
    await props.getNotifsAction();
  };

  render() {
    document.tile = 'Barefoot Nomad - Notifications';
    const { props, state: { isLoading } } = this;
    const { notifsData } = props;

    if (notifsData) {
      notifsData.sort((recent, old) => moment(`${old.createdAt}`) - moment(`${recent.createdAt}`));
    }

    return (
      <Container>
        <Row>
          <Col md={4} className="breadcrumbs">
            <Breadcrumbs itemsArray={['> Home', 'Notifications']} />
          </Col>
        </Row>
          {isLoading ? (
          <div className="d-flex justify-content-center">
                  <Spinner animation="grow" size="lg" variant="primary" />
          </div>
          ) : ''}

        {notifsData && (
          <Row className="bg-white rounded">
              {notifsData.map((item) => (
                <NotificationItem className="notif-item" item={item} />
              ))}
          </Row>
        )}

        {!notifsData && (
          <Row className="bg-white">
              You have no notifications yet!
          </Row>
        )}
      </Container>
    );
  }
}

Notifications.propTypes = {
  getNotifsAction: PropTypes.func,
  markAllNotifAction: PropTypes.func,
  notifsData: PropTypes.object,
};

export const mapStateToProps = (state) => ({
  notifsData: state.allNotifs.notifsData,
  notifsDataError: state.allNotifs.notifsDataError,
});


export default connect(mapStateToProps, { getNotifsAction, markAllNotifAction })(Notifications);
