const taskInput = document.getElementById('new-task');
const addButton = document.querySelector('.add-button');
const incompleteTaskHolder = document.querySelector(
  '.incomplete-tasks-section'
);
const completedTasksHolder = document.querySelector('.completed-tasks-section');

const DEFAULT_DATA = [
  { text: 'Pay Bills', isEdit: false, isCompleted: false },
  { text: 'Go Shopping', isEdit: true, isCompleted: false },
  { text: 'See the Doctor', isEdit: false, isCompleted: true },
];

DEFAULT_DATA.map((data) => {
  const listItem = createNewTaskElement(data.text);

  listItem.querySelector('.task-checkbox').checked = data.isCompleted;

  if (data.isEdit) {
    toggleEditedTask(listItem);
  }

  appendTask(listItem);
});

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
  toggleEditedTask(listItem);
}

function toggleEditedTask(listItem) {
  const editInput = listItem.querySelector('.task-input');
  const label = listItem.querySelector('.task-text');
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
  appendTask(listItem);
}

function appendTask(listItem) {
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
