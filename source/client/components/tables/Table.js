import React, {Component, PropTypes} from 'react'
import { subscribe } from 'horizon-react';
import { createDoc } from 'horizon-react/lib/utils';

import TableRow from './TableRow'
import styles from './style'

class Table extends Component {
  state = {
    messages: []
  }

  componentWillMount() {
    const collection = this.props.horizon('todos')
    this.initTodo(collection)
  }

  componentDidMount() {
    this.subscribe()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.shouldAppend ^ nextProps.shouldAppend) {
      const collection = this.props.horizon('todos')
      const len = this.state.messages.length
      collection.upsert({id: len, info:''})
    }
  }

  subscribe() {
    this.props.horizon('todos').limit(this.props.limit).watch().subscribe(messages => {
      this.setState({messages: messages})
    })
  }

  initTodo(collection) {
    collection.fetch().subscribe(
      result => {
        if (result.length > 0) {
          return
        }
        for (let i=0; i<4; i++) {
          collection.upsert({id: i, info:''})
          // collection.upsert({id: i, name: [], tags:[],sex: null, info:null})
        }
      }
    )
  }

  render() {
    const { horizon, onAppend } = this.props
    const len = this.state.messages.length
    return (
      <div className={styles.tableWrapper}>
        {this.state.messages.map(
          todo => (
            <TableRow
              onAppend={onAppend}
              total={len}
              key={todo.id}
              todo={todo}
              horizon={horizon}
            />
          )
        )}
      </div>
    )
  }
}

export default subscribe({})(Table);
