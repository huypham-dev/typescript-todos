import { TodoApp } from './TodoApp';
import Utils from './Utils';

let todos = [{
    id: Utils.genId(),
    name: 'Basic Design',
    state: 2
  }, {
    id: Utils.genId(),
    name: 'Function Design',
    state: 1
  },
  {
    id: Utils.genId(),
    name: 'Make Code',
    state: 1
  }
]

let app = new TodoApp(todos);
app.initialize();
