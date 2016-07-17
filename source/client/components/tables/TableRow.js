import React, {Component, PropTypes} from 'react'

import Input from '../input/Input'
import CustomSelect from '../select/Select'

import styles from './style'

export default class TableRow extends Component {
  static propTypes = {
    children: PropTypes.node
  }

  state = {
    collection: this.props.horizon('todos')
  }

  onBlur = (event) => {
    this.state.collection.upsert({info: event.target.value, id: this.props.todo.id})
  }

  onSelectName(collection, value) {
    const key = this.props.todo.id
    collection.find({id: key}).fetch().subscribe(
      msg => {
        var names = new Set(msg.name) || new Set()
        names.add(value)
        collection.upsert({name: [...names], id: key})
      },
      error => console.log(error)
    );
  }

  onDeselectName(collection, value) {
    const key = this.props.todo.id
    collection.find({id: key}).fetch().subscribe(
      msg => {
        var names = msg.name
        var index = names.indexOf(value)
        if(index > -1) {
          names.splice(index, 1)
        }
        collection.upsert({name: names, id: key})
      },
      error => console.log(error)
    )
  }

  onSelectTag(collection, value) {
    const key = this.props.todo.id
    collection.find({id: key}).fetch().subscribe(
      msg => {
        var tags = new Set(msg.tags) || new Set()
        tags.add(value)
        collection.upsert({tags: [...tags], id: key})
      },
      error => console.log(error)
    );
  }

  onDeselectTag(collection, value) {
    const key = this.props.todo.id
    collection.find({id: key}).fetch().subscribe(
      msg => {
        var tags = msg.tags
        var index = tags.indexOf(value)
        if(index > -1) {
          tags.splice(index, 1)
        }
        collection.upsert({tags: tags, id: key})
      },
      error => console.log(error)
    )
  }

  onSelectSex(collection, value) {
    collection.upsert({sex: value, id: this.props.todo.id})
  }

  render() {
    const mult = ['jack','lucy','john','roy']
    const tags = ['a10', '18', 'c8','d10','b31']
    const bl = ['f','m']

    const {collection} = this.state
    const {todo, horizon, total, onAppend} = this.props
    return (
      <div className={styles.row} key={todo.id}>
        <Input
          onBlur={this.onBlur}
          info={todo.info}
          id={todo.id}
          total={total}
          onAppend={onAppend}
        />
        <CustomSelect
          multiple
          options={mult}
          onSelect={this.onSelectName.bind(this,collection)}
          onDeselect={this.onDeselectName.bind(this,collection)}
          value={todo.name}
          id={todo.id}
          total={total}
          onAppend={onAppend}
        />
        <CustomSelect
          tags
          options={tags}
          onSelect={this.onSelectTag.bind(this, collection)}
          onDeselect={this.onDeselectTag.bind(this,collection)}
          value={todo.tags}
          id={todo.id}
          total={total}
          onAppend={onAppend}
        />
        <CustomSelect
          options={bl}
          onSelect={this.onSelectSex.bind(this, collection)}
          value={todo.sex}
          id={todo.id}
          total={total}
          onAppend={onAppend}
        />
      </div>
    )
  }
}
