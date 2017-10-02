import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native';

export const RefreshState = {
  Idle: 0,
  HeaderRefreshing: 1,
  NoMoreData: 3,
  Failure: 4,
};

const DEBUG = false;
const log = (text) => { DEBUG && console.log(text); };

class RefreshFlatList extends PureComponent {
  componentWillReceiveProps(nextProps) {
    log('[RefreshFlatList]  RefreshFlatList componentWillReceiveProps ' + nextProps.refreshState);
  }

  componentDidUpdate(prevProps, prevState) {
    log('[RefreshFlatList]  RefreshFlatList componentDidUpdate ' + prevProps.refreshState);
  }

  onHeaderRefresh = () => {
    log('[RefreshFlatList]  onHeaderRefresh');

    if (this.shouldStartHeaderRefreshing()) {
      log('[RefreshFlatList]  onHeaderRefresh');
      this.props.onHeaderRefresh(RefreshState.HeaderRefreshing);
    }
  }

  shouldStartHeaderRefreshing = () => {
    log('[RefreshFlatList]  shouldStartHeaderRefreshing');

    if (this.props.refreshState == RefreshState.HeaderRefreshing) {
      return false;
    }

    return true;
  }

  render() {
    log('[RefreshFlatList]  render');

    return (
      <FlatList
        ref={this.props.listRef}
        onRefresh={this.onHeaderRefresh}
        refreshing={this.props.refreshState == RefreshState.HeaderRefreshing}
        {...this.props}
      />
    );
  }

}

RefreshFlatList.propTypes = {
  refreshState: PropTypes.oneOf(Object.values(RefreshState)).isRequired,
  onHeaderRefresh: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,

  listRef: PropTypes.string,
};

RefreshFlatList.defaultProps = {
  onHeaderRefresh: () => {},
};

export default RefreshFlatList;
