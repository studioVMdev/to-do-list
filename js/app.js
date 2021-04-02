//! Define UI variables

const itemInput = document.getElementById('itemInput');
const addItemBtn = document.getElementById('add-btn');
const clearBtn = document.getElementById('clear-list');
const completeBtn = document.querySelectorAll('.complete-item');
const editBtn = document.querySelectorAll('.edit-item');
const deleteBtn = document.querySelectorAll('.delete-item');
let itemListEl = document.querySelector('.item-list');

//---------------------------------------------------------

//! Load Event Listeners
loadEventListeners();

function loadEventListeners() {
  document.addEventListener('DOMContentLoaded', getTodosFromLS);
  addItemBtn.addEventListener('click', e => {
    e.preventDefault();
    addTodoToUI();
  });
  itemListEl.addEventListener('click', e => {
    if (e.target.parentElement.classList.contains('complete-item')) {
      completeTodo(e);
    } else if (e.target.parentElement.classList.contains('edit-item')) {
      console.log('edit me');
      editTodo(e);
    } else if (e.target.parentElement.classList.contains('delete-item')) {
      console.log('delete me');
      deleteTodo(e);
    };
  });
  clearBtn.addEventListener('click', clearTodos);
}

//! Functions
//^ Get todos from LS

function getTodosFromLS() {
  let todosData;
  if (localStorage.getItem('todosLS') === null) {
    todosData = [];
    console.log(todosData);
  } else {
    todosData = JSON.parse(localStorage.getItem('todosLS'));
  }
  displayTodos(todosData);
  return todosData;
};

//^ Display todos to UI
function displayTodos(todosData) {
  itemListEl.innerHTML = "";
  todosData.forEach(todoData => {
    const todoEl = document.createElement("div");
    todoEl.classList.add('item', 'my-3');
    todoEl.innerHTML =
      ` <h5 class="item-name text-capitalize ${todoData.completed ? 'completed' : ''}">${todoData.todo}</h5>
    <div class="item-icons">
      <a href="#" class="complete-item mx-2 item-icon"><i class="far fa-check-circle"></i></a>
      <a href="#" class="edit-item mx-2 item-icon"><i class="far fa-edit"></i></a>
      <a href="#" class="delete-item item-icon"><i class="far fa-times-circle"></i></a>
      </div>`;
    itemListEl.appendChild(todoEl);
  });
}
//^ Add todo to UI
function addTodoToUI() {
  if (itemInput.value == '') {
    alert('Please type a task');
  } else {
    const todosData = getTodosFromLS();
    todosData.push({
      todo: itemInput.value,
      completed: false
    });
    addTodosToLS(todosData);
    itemInput.value = '';
    displayTodos(todosData);
  };
};
//^ Add todos to LS
function addTodosToLS(todosData) {
  localStorage.setItem('todosLS', JSON.stringify(todosData));
}
//^ Complete todo
function completeTodo(e) {
  const todosData = getTodosFromLS();
  let value = e.target.parentElement.parentElement.parentElement.firstElementChild.innerText;
  console.log(value);
  todosData.forEach((item, idx) => {
    if (item.todo == value) {
      todosData[idx].completed = !todosData[idx].completed;
    }
  });
  addTodosToLS(todosData);
  displayTodos(todosData);
}

// //^ Edit todo
function editTodo(e) {
  const todosData = getTodosFromLS();
  let value = e.target.parentElement.parentElement.parentElement.firstElementChild.innerText;
  console.log(value);
  let edited;
  todosData.forEach((item, idx) => {
    if (item.todo == value) {
      edited = todosData.splice(idx, 1);
      console.log(edited);
    }
  });
  itemInput.value = value;
  addTodosToLS(todosData);
  displayTodos(todosData);
};

//^ Delete todo
function deleteTodo(e) {
  if (confirm('Are you sure?')) {
    const todosData = getTodosFromLS();
    let value = e.target.parentElement.parentElement.parentElement.firstElementChild.innerText;
    console.log(value);
    todosData.forEach((item, idx) => {
      if (item.todo == value) {
        todosData.splice(idx, 1);
      }
    });
    addTodosToLS(todosData);
    displayTodos(todosData);
  }

}
//^ Clear todos
function clearTodos() {
  if (confirm('Are you sure?')) {
    localStorage.removeItem('todosLS');
    displayTodos();
  }
}




