const taskInput = document.getElementById('new-task');
const addButton = document.querySelector('.add-button');
const incompleteTaskHolder = document.querySelector(
  '.incomplete-tasks-section'
);
const completedTasksHolder = document.querySelector('.completed-tasks-section');

function createNewTaskElement(taskString) {
  const template = document.getElementById('task-template');
  const fragment = template.content.cloneNode(true);
  const listItem = fragment.querySelector('li');

  listItem.querySelector('.task-text').textContent = taskString;

  return listItem;
}

function addTask() {
  if (!taskInput.value) return;
  const listItem = createNewTaskElement(taskInput.value);
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem);

  taskInput.value = '';
}

function editTask() {
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
}

function deleteTask() {
  const listItem = this.parentNode;
  const ul = listItem.parentNode;
  ul.removeChild(listItem);
}

function toggleTaskState() {
  const listItem = this.parentNode;
  const isCompleted = listItem.querySelector('.task-checkbox').checked;

  isCompleted
    ? completedTasksHolder.appendChild(listItem)
    : incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem);
}

addButton.addEventListener('click', addTask);

function bindTaskEvents(taskListItem) {
  taskListItem
    .querySelector('.task-checkbox')
    .addEventListener('click', toggleTaskState);

  taskListItem
    .querySelector('.edit-button')
    .addEventListener('click', editTask);

  taskListItem
    .querySelector('.delete-button')
    .addEventListener('click', deleteTask);
}

[...incompleteTaskHolder.children, ...completedTasksHolder.children].map(
  (task) => bindTaskEvents(task)
);
