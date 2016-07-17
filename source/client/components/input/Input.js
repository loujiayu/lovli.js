import React, {Component, PropTypes} from 'react'
import isEqual from 'lodash.isequal'

import styles from './style'

export default class Input extends Component {
  shouldComponentUpdate(nextProps) {
    return !isEqual(nextProps.info, this.props.info)
  }

  componentDidMount() {
    this.fill()
  }

  componentDidUpdate() {
    this.fill()
    if (this.props.total - 3 < this.props.id ) {
      this.props.onAppend()
    }
  }

  fill() {
    this.refs.input.value = this.props.info
  }

  render() {
    const {info, onBlur} = this.props
    return (
      <div className={styles.inputWrapper}>
        <input
          ref="input"
          className={styles.input}
          onBlur={onBlur}
        />
      </div>
    )
  }
}
