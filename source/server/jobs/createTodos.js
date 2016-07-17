import later from 'later';
import { r, r_internal } from '../db';

const initialDB = () => {
  r_internal.table('collections').insert({id: 'todos', table: 'todo1'}).run().then(() => {
    return r_internal.table('collections').get('todos').run()
  }).then((result) => {
    return r.tableCreate(result.table).run().bind(null, result)
  }).then((result) => {
    for (let i=0; i < 4; i++) {
      r.table(result.table).insert({info: 'null', name: 'null', tags: [], sex: 'null'}).run()
    }
  })

}
initialDB()
//
// const todos = [
//   'Bring out the trash.',
//   'Clean up lovli.js',
//   'Make lovli.js even simpler.',
//   'Create a short tutorial.',
//   'Fix multiline-todos in lovli.',
//   'Praise horizon.',
//   'Build a shrine for horizon.',
//   'Invest in shrimps.',
//   'Watch GoT Season 6.',
//   'Go out with the kids.',
//   'Buy a birthday present.',
//   'Clean the house.',
//   'Wash the dishes.',
//   'Connect horizon-react with redux.',
//   'Eat some ice cream!'
// ];
//
// const createRandomTodo = () => {
//   const rand = Math.round(Math.random() * todos.length - 1, 0);
//   r_internal.table('collections').get('todos').run()
//   .then(function(result) {
//     r.table(result.table).insert({ text: todos[rand], $hz_v$: 1 }).run();
//   });
// };
//
// const every2minutes = later.parse.text('every 2 minutes');
//
// later.setInterval(createRandomTodo, every2minutes);
