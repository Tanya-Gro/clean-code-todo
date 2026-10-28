const taskInput = document.getElementById('new-task');
const addButton = document.querySelector('.add-button');
const incompleteTaskHolder = document.querySelector(
  '.incomplete-tasks-section'
);
const completedTasksHolder = document.querySelector('.completed-tasks-section');

const createNewTaskElement = function (taskString) {
  const listItem = document.createElement('li');

  const checkBox = document.createElement('input');
  const label = document.createElement('label');
  const editInput = document.createElement('input');
  const editButton = document.createElement('button');

  const deleteButton = document.createElement('button');
  const deleteButtonImg = document.createElement('img');

  label.innerText = taskString;
  label.className = 'task';

  checkBox.type = 'checkbox';
  editInput.type = 'text';
  editInput.className = 'task';

  editButton.innerText = 'Edit';
  editButton.className = 'edit-button';

  deleteButton.className = 'delete-button';
  deleteButtonImg.src = './remove.svg';

  deleteButton.appendChild(deleteButtonImg);
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
};

const addTask = function () {
  if (!taskInput.value) return;
  const listItem = createNewTaskElement(taskInput.value);
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem);

  taskInput.value = '';
};

const editTask = function () {
  const listItem = this.parentNode;

  const editInput = listItem.querySelector('input[type=text]');
  const label = listItem.querySelector('label');
  const editBtn = listItem.querySelector('.edit-button');
  const containsClass = listItem.classList.contains('edit-mode');

  if (containsClass) {
    label.innerText = editInput.value;
    editBtn.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = 'Save';
  }

  listItem.classList.toggle('edit-mode');
};

const deleteTask = function () {
  const listItem = this.parentNode;
  const ul = listItem.parentNode;
  ul.removeChild(listItem);
};

const toggleTaskState = function () {
  const listItem = this.parentNode;
  const isCompleted = listItem.querySelector('.task-checkbox').checked;

  isCompleted
    ? completedTasksHolder.appendChild(listItem)
    : incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem);
};

addButton.addEventListener('click', addTask);

const bindTaskEvents = function (taskListItem) {
  taskListItem
    .querySelector('.task-checkbox')
    .addEventListener('click', toggleTaskState);

  taskListItem
    .querySelector('.edit-button')
    .addEventListener('click', editTask);

  taskListItem
    .querySelector('.delete-button')
    .addEventListener('click', deleteTask);
};

[...incompleteTaskHolder.children, ...completedTasksHolder.children].map(
  (task) => bindTaskEvents(task)
);
