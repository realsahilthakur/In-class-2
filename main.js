const toDoInput = document.querySelector('.todo-input');
const toDoBtn = document.querySelector('.todo-btn');
const toDoList = document.querySelector('.todo-list');
const standardTheme = document.querySelector('.standard-theme');
const lightTheme = document.querySelector('.light-theme');
const darkerTheme = document.querySelector('.darker-theme');

// Event Listeners
toDoBtn.addEventListener('click', addToDo);
toDoList.addEventListener('click', deleteCheck);
document.addEventListener("DOMContentLoaded", getTodos);
standardTheme.addEventListener('click', () => changeTheme('standard'));
lightTheme.addEventListener('click', () => changeTheme('light'));
darkerTheme.addEventListener('click', () => changeTheme('darker'));

// Apply saved theme or default to standard
let savedTheme = localStorage.getItem('savedTheme') || 'standard';
changeTheme(savedTheme);

// Load todos from localStorage
function getTodos() {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(todo => {
        addTodoToDOM(todo.text, todo.id, todo.completed);
    });
}

// Add todo to DOM
function addTodoToDOM(text, id, completed) {
    const toDoDiv = document.createElement("div");
    toDoDiv.classList.add('todo', `${savedTheme}-todo`);
    if (completed) toDoDiv.classList.add('completed');

    const newToDo = document.createElement('li');
    newToDo.innerText = text;
    newToDo.classList.add('todo-item');
    toDoDiv.appendChild(newToDo);

    const checked = document.createElement('button');
    checked.innerHTML = '<i class="fas fa-check"></i>';
    checked.classList.add('check-btn', `${savedTheme}-button`);
    checked.dataset.id = id;
    toDoDiv.appendChild(checked);

    const deleted = document.createElement('button');
    deleted.innerHTML = '<i class="fas fa-trash"></i>';
    deleted.classList.add('delete-btn', `${savedTheme}-button`);
    deleted.dataset.id = id;
    toDoDiv.appendChild(deleted);

    toDoList.appendChild(toDoDiv);
}

// Add new todo
function addToDo(event) {
    event.preventDefault();
    if (toDoInput.value.trim() === '') {
        alert("You must write something!");
        return;
    }

    const todo = {
        id: Date.now(), // Use timestamp as unique ID
        text: toDoInput.value,
        completed: false
    };

    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));

    addTodoToDOM(todo.text, todo.id, todo.completed);
    toDoInput.value = '';
}

// Handle delete and check actions
function deleteCheck(event) {
    const item = event.target;
    const id = item.dataset.id;
    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    if (item.classList[0] === 'delete-btn') {
        const todo = item.parentElement;
        todo.classList.add("fall");
        todos = todos.filter(todo => todo.id !== parseInt(id));
        localStorage.setItem('todos', JSON.stringify(todos));
        todo.addEventListener('transitionend', () => todo.remove());
    }

    if (item.classList[0] === 'check-btn') {
        const todo = item.parentElement;
        const todoItem = todos.find(todo => todo.id === parseInt(id));
        if (todoItem) {
            todoItem.completed = !todoItem.completed;
            localStorage.setItem('todos', JSON.stringify(todos));
            todo.classList.toggle('completed');
        }
    }
}

// Change theme
function changeTheme(color) {
    localStorage.setItem('savedTheme', color);
    savedTheme = color;
    document.body.className = color;
    color === 'darker' ?
        document.getElementById('title').classList.add('darker-title') :
        document.getElementById('title').classList.remove('darker-title');
    document.querySelector('input').className = `todo-input ${color}-input`;
    document.querySelectorAll('.todo').forEach(todo => {
        todo.className = `todo ${color}-todo ${todo.classList.contains('completed') ? 'completed' : ''}`;
    });
    document.querySelectorAll('button').forEach(button => {
        if (button.classList.contains('check-btn')) {
            button.className = `check-btn ${color}-button`;
        } else if (button.classList.contains('delete-btn')) {
            button.className = `delete-btn ${color}-button`;
        } else if (button.classList.contains('todo-btn')) {
            button.className = `todo-btn ${color}-button`;
        }
    });
}