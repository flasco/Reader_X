import React, {PureComponent} from 'react'
import {View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, Dimensions} from 'react-native'

export const RefreshState = {
    Idle: 0,
    HeaderRefreshing: 1,
    NoMoreData: 3,
    Failure: 4,
}

const DEBUG = false
const log = (text: string) => {DEBUG && console.log(text)}

type Props = {
    refreshState: number,
    onHeaderRefresh: (refreshState: number) => void,
    data: Array<any>,
    
    listRef?: any,
}

type State = {}

class RefreshListView extends PureComponent {
    props: Props
    state: State

    componentWillReceiveProps(nextProps: Props) {
        log('[RefreshListView]  RefreshListView componentWillReceiveProps ' + nextProps.refreshState)
    }

    componentDidUpdate(prevProps: Props, prevState: State) {
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

export default RefreshListView;