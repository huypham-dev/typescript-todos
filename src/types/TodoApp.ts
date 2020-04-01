import { State } from './Enums';
import TodoService, { ITodoService } from './TodoService';

export class TodoApp {
  private todoService: ITodoService;

  constructor(todos) {
    this.todoService = new TodoService(todos);
    this.loadTodos();
  }

  initialize() {
    let list = <HTMLUListElement> document.getElementById('todos');
    let nameInput = <HTMLInputElement> document.getElementById('name');
    let form = < HTMLFormElement > document.getElementById('todo-form');

    // bind event submit
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      if (nameInput.value.trim()) {
        let newTodo = this.todoService.addTodo(this.todoService.generateId(), nameInput.value.trim());
        list.innerHTML += this.renderItem(newTodo.id, newTodo.name, newTodo.state);

        form.reset();
        nameInput.focus();
        console.log(this.todoService.getAll());
      }
    })

    // bind event for complete todo
    list.addEventListener('change', (e) => {
      let input = <HTMLInputElement> event.target;
      if (input.type === 'checkbox') {
        let todoItem = input.nextElementSibling;
        let id = input.getAttribute('data-id');

        this.todoService.completeTodo(parseInt(id));
        todoItem.classList.toggle('complete');        
      }
    })

    // bind event remove item
    list.addEventListener('click', (e) => {
      let removeBtn = <HTMLSpanElement> event.target;
      if (removeBtn.id === 'remove') {
        let todoItem = removeBtn.parentElement;
        let id = removeBtn.getAttribute('data-id');

        this.todoService.removeTodo(parseInt(id));
        todoItem.parentNode.removeChild(todoItem);    
      }
    })

    // bind event udpate todo when focus out
    list.addEventListener('focusout', (e) => {
      let input = <HTMLSpanElement> event.target;

      if (input.classList.contains('todo-item')) {
        let id = input.getAttribute('data-id');

        if (!input.textContent.trim()) {
          input.focus();
          return false;
        }
        let editTodo = this.todoService.editTodo(parseInt(id), input.textContent.trim())
        input.textContent = editTodo.name;
      }
    })
  }

  // load all todos
  loadTodos() {
    let list = document.getElementById('todos');
    let todos = this.todoService.getAll();
    
    todos.map((item) => {
      list.innerHTML += this.renderItem(item.id, item.name, item.state);
    });
  }

  // create template todo item
  renderItem(id: number, name: string, state:State): string {
    let checked = state === 1 ? '' : 'checked';
    let completeClass = state === 1 ? '' : 'complete'; 
    let item =
      `<li>
        <input data-id="${id}" type="checkbox" id="state" ${checked}>
        <p data-id="${id}" class="todo-item ${completeClass}" contenteditable="true">${name}</p>
        <span data-id="${id}" id="remove">&#4030;</span>
      </li>`;
    return item;
  }
}
