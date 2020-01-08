import React, { Component } from 'react';
import {
  Container, Row, Col, Button,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { markOneNotifAction, getNotifsAction } from '../../../actions/notificationsActions';

export class NotificationItem extends Component {
  state = {
    isLoading: false,
  };

  markUnmark = async (notifId) => {
    const { props } = this;

    this.setState({ isLoading: true });

    await props.markOneNotifAction(notifId);
    await props.getNotifsAction();

    this.setState({ isLoading: false });
  };

  markLink = (item) => {
    if (!item.isRead) {
      this.markUnmark(item.id);
    }
  };

  render() {
    const { props, state } = this;
    const { item } = props;
    const { isLoading } = state;

    return (
      <Container className={item.isRead ? '' : 'notif-unread'}>
        <Row>
          <Col xs={12} sm={12} md={6} lg={9} className={item.isRead ? '' : 'font-weight-bold'}>
            <div>
              {item.activity.substring(0, item.activity.indexOf('.'))}
              {'.'}
            </div>
          </Col>
          <Col xs={12} sm={12} md={6} lg={3}>
            <Button data-test="button-click" className="btn-sm" onClick={() => this.markUnmark(item.id)}>
              {isLoading
                ? (
                  <>
                    <i style={{ fontSize: '20px' }} className="fas fa-spinner fa-pulse" />
                    {' '}
                    Marking...
                  </>
                )
                : (
                  <>
                  Mark as
                  {' '}
                  { item.isRead ? 'Unread' : 'Read' }
                  </>
                )}
            </Button>
          </Col>
        </Row>
        <div>
          {item.activity.substring(item.activity.indexOf('.') + 1, item.activity.indexOf(': '))}
          {': '}
          <u>
            <Link data-test="link-click" className="text-underline" to={`/${item.entity}s/${item.entityId}`} onClick={() => this.markLink(item)}>
              {item.entity}
            </Link>
          </u>
        </div>
        <div className="text-muted">
          <small>
            {moment(`${item.createdAt}`).fromNow()}
          </small>
        </div>
        <hr />
      </Container>
    );
  }
}

NotificationItem.propTypes = {
  item: PropTypes.object,
  markOneNotifAction: PropTypes.func,
  getNotifsAction: PropTypes.func,
};

export const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps, { markOneNotifAction, getNotifsAction })(NotificationItem);
