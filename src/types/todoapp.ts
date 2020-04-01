import { State } from './enums';
import TodoService, { ITodoService } from './todoservice';

export class TodoApp {
  private todoService: ITodoService;

  constructor(todos) {
    this.todoService = new TodoService(todos);
    this.loadTodos();
  }

  initialize() {
    let list = <HTMLUListElement> document.getElementById('todos');
    let nameInput = <HTMLInputElement> document.getElementById('name');
    let descInput = <HTMLInputElement> document.getElementById('desc');
    let form = < HTMLFormElement > document.getElementById('todo-form');

    form.addEventListener('submit', (event) => {
      event.preventDefault();

      if (nameInput.value && descInput.value) {
        let newTodo = this.todoService.addTodo(this.todoService.generateId(), nameInput.value, descInput.value);
        list.innerHTML += this.renderItem(newTodo.id, newTodo.name, newTodo.description, newTodo.state);

        form.reset();
        nameInput.focus();
        console.log(this.todoService.getAll());
      }
    })

    list.addEventListener('change', (e) => {
      let input = <HTMLInputElement> event.target;
      if (input.type === 'checkbox') {
        let todoItem = input.parentElement;
        let id = input.getAttribute('data-id');

        this.todoService.completeTodo(parseInt(id));
        todoItem.classList.toggle('complete');        
      }
    })

    list.addEventListener('click', (e) => {
      let removeBtn = <HTMLSpanElement> event.target;
      if (removeBtn.id === 'remove') {
        let todoItem = removeBtn.parentElement;
        let id = removeBtn.getAttribute('data-id');

        this.todoService.removeTodo(parseInt(id));
        todoItem.parentNode.removeChild(todoItem);    
      }
    })
  }

  loadTodos() {
    let list = document.getElementById('todos');
    let todos = this.todoService.getAll();
    
    todos.map((item) => {
      list.innerHTML += this.renderItem(item.id, item.name, item.description, item.state);
    });
  }

  renderItem(id: number, name: string, desc: string, state:State): string {
    let checked = state === 1 ? '' : 'checked';
    let completeClass = state === 1 ? '' : 'complete'; 
    let item =
      `<li><p id="todo-item" class="${completeClass}">
      <input data-id="${id}" type="checkbox" id="state" ${checked}><b>${name}: </b>${desc}</p> <span data-id="${id}" id="remove">&#4030;</span>
      </li>`;
    return item;
  }
}
