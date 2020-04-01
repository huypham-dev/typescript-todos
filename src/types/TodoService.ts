import { Todo } from './TodoModel';
import { State } from './Enums';

export interface ITodoService {
    addTodo(id: number, name: string): Todo;
    removeTodo(id: number): boolean;
    editTodo(id: number, name: string): Todo;
    completeTodo(id: number): void;
    getAll(): Todo[];
    generateId(): number;
}

export default class TodoService implements ITodoService {
    private allTodo: Todo[] = [];

    constructor(todos: Todo[]) {
        let data: Todo[] = JSON.parse(localStorage.getItem('tasks'));
        if (!data) {
            data = todos;
        }
        data.map(item => {
          this.allTodo.push(new Todo(item.id, item.name, item.state));
        });

        // save storage
        localStorage.setItem('tasks', JSON.stringify(this.allTodo));
    }
    
    addTodo(id: number, name: string): Todo {
        let newTodo = new Todo(id, name);
        this.allTodo.push(newTodo);

        localStorage.setItem('tasks', JSON.stringify(this.allTodo));
        return newTodo;
    }

    removeTodo (id: number): boolean {
        this.allTodo = this.allTodo.filter(item => {
          return item.id !== id;
        });
          
        // save storage
        localStorage.setItem('tasks', JSON.stringify(this.allTodo));
        return true;
    }

    completeTodo (id: number): void {
        let todoItem = this.allTodo.find(item => {
          return item.id === id;
        });
        todoItem.state = (todoItem.state === State.Active) ? State.Complete : State.Active;

        // save storage
        localStorage.setItem('tasks', JSON.stringify(this.allTodo));
    }

    editTodo (id: number, name: string): Todo {
        let todoItem = this.allTodo.find(item => {
          return item.id === id;
        });
        todoItem.name = name;

        // save storage
        localStorage.setItem('tasks', JSON.stringify(this.allTodo));
        return todoItem;
    }

    getAll(): Todo[] {
        return this.allTodo;
    }

    generateId (): number {
        return this.allTodo[this.allTodo.length - 1].id + 1;
    }
}