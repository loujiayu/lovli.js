import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'

import Table from './tables/Table'

import 'static/vendor/font-awesome/css/font-awesome.min.css';
import 'static/vendor/antd/antd.min.css'

import styles from 'styles/app';

function onAppend() {
  return (
    {type: 'SHOULDAPPEND'}
  )
}

class App extends Component {
  render() {
    return (
      <div>
        <div className={styles.container}>
          <Table
            limit={100}
            shouldAppend={this.props.append.shouldAppend}
            onAppend={this.props.onAppend}
          />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const {append} = state
  return {
    append
  }
}

export default connect(mapStateToProps, {onAppend})(App)
