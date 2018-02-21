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
    // ADD TASK EVEN
    form.addEventListener('submit', addTask);
    // REMOVE TASK EVENT
    taskList.addEventListener('click', removeTask);
    // CLEAR LIST EVENT
    clearBtn.addEventListener('click', clearTasks);
    // FILTER THROUGH TASKS
    filter.addEventListener('keyup', filterTasks);
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
    // CLEAR INPUT
    taskInput.value = '';

    e.preventDefault();
}

// REMOVE TASK

function removeTask(e){
  if(e.target.parentElement.classList.contains('delete-item')) {
    if(confirm('Are you sure?')){
      e.target.parentElement.parentElement.remove();
    }
  }
}

// CLEAR TASKS

function clearTasks(){
  // ONE WAY TO CLEAR TASKS
  // taskList.innerHTML = '';
  // FASTER WAY TO CLEAR TASKS
  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
  }
}

// FILTER TASKS 

function filterTasks(e){
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach
  (function(task){
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });

}