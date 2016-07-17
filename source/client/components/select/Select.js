import React, {Component, PropTypes} from 'react'
import { Select } from 'antd'
import isEqual from 'lodash.isequal'
// const Option = Select.Option;

export default class CustomSelect extends Component {

  shouldComponentUpdate(nextProps) {
    return !isEqual(nextProps.value, this.props.value)
  }
  componentDidUpdate() {
    if (this.props.total - 3 < this.props.id ) {
      this.props.onAppend()
    }
  }

  render() {
    let items = []
    const {options, id, total, ...other} = this.props

    for (let i=0, len=options.length; i < len; i++) {
      items.push(<Select.Option key={options[i].toString()}>{options[i].toString()}</Select.Option>);
    }

    return (
      <Select style={{ flex: '1' }}  {...other}>
        {items}
      </Select>
    )
  }
}
