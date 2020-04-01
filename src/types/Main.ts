import { TodoApp } from './TodoApp';

let todos = [{
    id: 1,
    name: 'Basic Design',
    state: 2
  }, {
    id: 2,
    name: 'Function Design',
    state: 1
  },
  {
    id: 3,
    name: 'Make Code',
    state: 1
  }
]

let app = new TodoApp(todos);
app.initialize();
