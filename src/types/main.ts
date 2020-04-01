import { TodoApp } from './todoapp';

let todos = [{
    id: 1,
    name: 'Basic Design',
    description: 'design analysis',
    state: 2
  }, {
    id: 2,
    name: 'Function Design',
    description: 'design analysis',
    state: 1
  },
  {
    id: 3,
    name: 'Make Code',
    description: 'implement code for features',
    state: 1
  }
]

let app = new TodoApp(todos);
app.initialize();
