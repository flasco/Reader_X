import React, { PureComponent, PropTypes } from 'react'
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, Dimensions } from 'react-native'

export const RefreshState = {
  Idle: 0,
  HeaderRefreshing: 1,
  NoMoreData: 3,
  Failure: 4,
}

const DEBUG = false
const log = (text) => { DEBUG && console.log(text) }

class RefreshListView extends PureComponent {
  componentWillReceiveProps(nextProps) {
    log('[RefreshListView]  RefreshListView componentWillReceiveProps ' + nextProps.refreshState)
  }

  componentDidUpdate(prevProps, prevState) {
    log('[RefreshListView]  RefreshListView componentDidUpdate ' + prevProps.refreshState)
  }

  onHeaderRefresh = () => {
    log('[RefreshListView]  onHeaderRefresh')

    if (this.shouldStartHeaderRefreshing()) {
      log('[RefreshListView]  onHeaderRefresh')
      this.props.onHeaderRefresh(RefreshState.HeaderRefreshing)
    }
  }


  shouldStartHeaderRefreshing = () => {
    log('[RefreshListView]  shouldStartHeaderRefreshing')

    if (this.props.refreshState == RefreshState.HeaderRefreshing) {
      return false
    }

    return true
  }

  render() {
    log('[RefreshListView]  render')

    return (
      <FlatList
        ref={this.props.listRef}
        onRefresh={this.onHeaderRefresh}
        refreshing={this.props.refreshState == RefreshState.HeaderRefreshing}
        {...this.props}
      />
    )
  }

}

RefreshListView.propTypes = {
  refreshState: PropTypes.arrayOf(Object.values(RefreshState)).isRequired,
  onHeaderRefresh: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,

  listRef: PropTypes.string,
}

RefreshListView.defaultProps = {
  onHeaderRefresh: () => {},
}

export default RefreshListView;