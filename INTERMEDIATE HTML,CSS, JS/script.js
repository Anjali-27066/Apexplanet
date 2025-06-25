function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskList = document.getElementById('taskList');

  const task = taskInput.value.trim();
  if (task !== '') {
    const li = document.createElement('li');
    li.className = 'task-item';

    const taskText = document.createElement('span');
    taskText.textContent = task;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = '❌';
    removeBtn.className = 'remove-btn';
    removeBtn.onclick = () => li.remove();

    li.appendChild(taskText);
    li.appendChild(removeBtn);
    taskList.appendChild(li);

    taskInput.value = '';
  }
}
