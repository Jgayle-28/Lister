// DEFINE UI VARIABLES
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// LOAD ALL EVENT LISTENERS
loadEventListeners();

// LOAD ALL EVENT LISTENERS
function loadEventListeners(){
    // DOM LOAD EVENT
    document.addEventListener('DOMContentLoaded', getTasks)
    // ADD TASK EVEN
    form.addEventListener('submit', addTask);
    // REMOVE TASK EVENT
    taskList.addEventListener('click', removeTask);
    // CLEAR LIST EVENT
    clearBtn.addEventListener('click', clearTasks);
    // FILTER THROUGH TASKS
    filter.addEventListener('keyup', filterTasks);
}

// GET TASKS FROM LOCAL STORAGE
function getTasks(){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
    // CREATE LI ELEMENT
    const li = document.createElement('li');

    // ADD CLASS
    li.className = 'collection-item';

    // CREATE TEXT NODE & APPEND TO LI
    li.appendChild(document.createTextNode(task));

    // CREATE A NEW LINK ELEMENT
    const link = document.createElement('a');

    // ADD CLASS TO LINK
    link.className = 'delete-item secondary-content';

    // ADD ICON HTML
    link.innerHTML = '<i class="fa fa-remove"></i>';

    // APPEND LINK TO LI
    li.appendChild(link);

    // APPEND LI TO UL
    taskList.appendChild(li);
  });
}

//  ADD TASK

function addTask(e){
    // CHECK TO SEE IF THERE IS A VALUE IN INPUT APON SUBMIT
    if(taskInput.value === ''){
        alert('Please add an item');
    }
    // CREATE LI ELEMENT
    const li = document.createElement('li');

    // ADD CLASS
    li.className = 'collection-item';

    // CREATE TEXT NODE & APPEND TO LI
    li.appendChild(document.createTextNode(taskInput.value));

    // CREATE A NEW LINK ELEMENT
    const link = document.createElement('a');

    // ADD CLASS TO LINK
    link.className = 'delete-item secondary-content';

    // ADD ICON HTML
    link.innerHTML = '<i class="fa fa-remove"></i>';

    // APPEND LINK TO LI
    li.appendChild(link);

    // APPEND LI TO UL
    taskList.appendChild(li);

    // STORE IN LOCAL STORAGE
    storeTaskInLocalStorage(taskInput.value);

    // CLEAR INPUT
    taskInput.value = '';

    e.preventDefault();
}

// STORE TASK
function storeTaskInLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// REMOVE TASK

function removeTask(e){
  if(e.target.parentElement.classList.contains('delete-item')) {
    if(confirm('Are you sure?')){
      e.target.parentElement.parentElement.remove();
      
      // REMOVE FROM LOCAL STORAGE
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// REMOVE FROM LOCAL STORAGE
function removeTaskFromLocalStorage(taskItem){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// CLEAR TASKS

function clearTasks(){
  // ONE WAY TO CLEAR TASKS
  // taskList.innerHTML = '';
  // FASTER WAY TO CLEAR TASKS
  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
  }

  // CLEAR FROM LOCAL STORAGE
  clearTasksFromLocalStorage();
}

// CLEAR TASKS FROM LOCAL STORAGE
function clearTasksFromLocalStorage(){
  localStorage.clear();
}

// FILTER TASKS 

function filterTasks(e){
  // SETS TEXT TO WHAT IS BEING TYPED
  const text = e.target.value.toLowerCase();

  // SELECTS ALL THE COLLECTION-ITEMS AND LOOPS THROUGH THEM
  document.querySelectorAll('.collection-item').forEach
  (function(task){
    const item = task.firstChild.textContent;
    // CHECK TO SEE IF WHAT IS BEING SEARCHED FOR IS IN THE TASK LIST AND MATCHES IT
    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });

}