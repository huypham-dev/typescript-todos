import { Todo } from './TodoModel';
import { State } from './Enums';
import Utils from './Utils';

export interface ITodoService {
    addTodo(name: string): Todo;
    removeTodo(id: string): boolean;
    editTodo(id: string, name: string): Todo;
    completeTodo(id: string): void;
    getAll(): Todo[];
}

export default class TodoService implements ITodoService {
    private allTodo: Todo[] = [];

    constructor(todos: Todo[]) {
        let data: Todo[] = Utils.store('tasks');
        if (!data) {
            data = todos;
        }
        data.map(item => {
          this.allTodo.push(new Todo(item.id, item.name, item.state));
        });

        // save storage
        Utils.store('tasks', this.allTodo);
    }
    
    addTodo(name: string): Todo {
        let newTodo = new Todo(Utils.genId(), name);
        this.allTodo.push(newTodo);

        Utils.store('tasks', this.allTodo);
        return newTodo;
    }

    removeTodo (id: string): boolean {
        this.allTodo = this.allTodo.filter(item => {
          return item.id !== id;
        });
          
        // save storage
        Utils.store('tasks', this.allTodo);
        return true;
    }

    completeTodo (id: string): void {
        let todoItem = this.allTodo.find(item => {
          return item.id === id;
        });
        todoItem.state = (todoItem.state === State.Active) ? State.Complete : State.Active;

        // save storage
        Utils.store('tasks', this.allTodo);
    }

    editTodo (id: string, name: string): Todo {
        let todoItem = this.allTodo.find(item => {
          return item.id === id;
        });
        todoItem.name = name;

        // save storage
        Utils.store('tasks', this.allTodo);
        return todoItem;
    }

    getAll(): Todo[] {
        return this.allTodo;
    }
}