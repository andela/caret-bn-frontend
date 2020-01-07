/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Star, StarBorderOutlined, Close } from '@material-ui/icons';
import { bookmarkAccommodation } from '../../../actions/bookmarkActions';

class BookMark extends Component {
  state = {
    bookmarking: false,
  }

  componentDidMount = () => {
    const {
      hasBookmarked,
    } = this.props;

    switch (hasBookmarked) {
      case true:
        this.setState({
          bookmarking: false,
        });
        break;
      default:
        this.setState({
          bookmarking: true,
        });
    }
  }

  processBookmark = async () => {
    const { bookmarkAccommodation, slug, reloadAction } = this.props;
    const { processedBookmarking, bookmarking } = this.state;
    await bookmarkAccommodation(slug);
    this.setState({
      processedBookmarking: !processedBookmarking,
      bookmarking: !bookmarking,
    });
    if (reloadAction) {
      reloadAction();
    }
  };

  render() {
    const { bookmarking } = this.state;
    const { closeRequired } = this.props;
    if (closeRequired) {
      return (
        <Close className="remove-bookmark" data-test="close" onClick={() => this.processBookmark()} />
      );
    }
    return (
      <p className="bookmark">
        {(!bookmarking) ? <Star style={{ color: '#FFB404' }} onClick={() => this.processBookmark()} data-test="bookmarked" />
          : <StarBorderOutlined style={{ color: '#FFB404' }} onClick={() => this.processBookmark()} data-test="unbookmarked" />}
      </p>
    );
  }
}

const mapStateToProps = (state) => ({
  bookmark: state.bookmarks,
  status: state.bookmarks.bookmarkStatus,
});

export default connect(mapStateToProps, { bookmarkAccommodation })(BookMark);
