document.addEventListener('DOMContentLoaded', function () {
    const logoutButton = document.getElementById('logout-btn');

    logoutButton.addEventListener('click', function () {
        window.location.href = '/ui/task-notes-frontend/login.html';
    });

    function attachEventListeners() {
        document.querySelector('.task-list').addEventListener('click', function (e) {
            if (e.target.classList.contains('edit-btn')) {
                editTask(e.target);
            } else if (e.target.classList.contains('delete-btn')) {
                deleteTask(e.target);
            } else if (e.target.classList.contains('complete-btn')) {
                toggleComplete(e.target);
            }
        });
    }

    const taskForm = document.getElementById('task-form');
    taskForm.addEventListener('submit', function (e) {
        e.preventDefault();
        let isValid = true;
        const title = document.getElementById('task-title');
        const description = document.getElementById('task-description');

        document.getElementById('title-error').textContent = '';
        document.getElementById('description-error').textContent = '';

        if (title.value.trim() === '') {
            document.getElementById('title-error').textContent = 'Title is required';
            isValid = false;
        }

        if (description.value.trim() === '') {
            document.getElementById('description-error').textContent = 'Description is required';
            isValid = false;
        }

        if (isValid) {
            if (editingTask) {
                updateTask(editingTask, title.value, description.value, document.getElementById('task-priority').value, document.getElementById('task-status').value);
            } else {
                createTask(title.value, description.value, document.getElementById('task-priority').value, document.getElementById('task-status').value);
            }

            taskForm.reset();
            editingTask = null;
        }
    });

    let editingTask = null;

    function createTask(title, description, priority, status) {
        const taskList = document.querySelector('.task-list');
        const taskCard = document.createElement('div');
        taskCard.classList.add('task-card');
        taskCard.innerHTML = `
            <div class="task-info">
                <h3 class="task-title">${title}</h3>
                <p class="task-description">${description}</p>
                <div class="task-status">
                    <span class="status-label ${status === 'completed' ? 'completed' : 'pending'}">${status.charAt(0).toUpperCase() + status.slice(1)}</span>
                </div>
                <div class="task-priority">
                    <span class="priority-level ${priority}">${priority.charAt(0).toUpperCase() + priority.slice(1)} Priority</span>
                </div>
            </div>
            <div class="task-actions">
                <button class="edit-btn">
                    <i class="fas fa-edit"></i>Edit
                </button>
                <button class="delete-btn">
                    <i class="fas fa-trash-alt"></i>Delete
                </button>
                <button class="complete-btn">
                    <i class="fas fa-check"></i>Complete
                </button>
            </div>
        `;
        taskList.prepend(taskCard);
    }

    function updateTask(taskCard, title, description, priority, status) {
        taskCard.querySelector('.task-title').textContent = title;
        taskCard.querySelector('.task-description').textContent = description;
        taskCard.querySelector('.priority-level').textContent = priority.charAt(0).toUpperCase() + priority.slice(1) + ' Priority';
        taskCard.querySelector('.priority-level').className = 'priority-level ' + priority;
        taskCard.querySelector('.status-label').textContent = status.charAt(0).toUpperCase() + status.slice(1);
        taskCard.querySelector('.status-label').className = 'status-label ' + (status === 'completed' ? 'completed' : 'pending');
    }

    function toggleComplete(button) {
        const taskCard = button.closest('.task-card');
        taskCard.classList.toggle('completed');
        const statusLabel = taskCard.querySelector('.status-label');
        if (taskCard.classList.contains('completed')) {
            statusLabel.textContent = 'Completed';
            statusLabel.classList.replace('pending', 'completed');
        } else {
            statusLabel.textContent = 'Pending';
            statusLabel.classList.replace('completed', 'pending');
        }
    }

    function deleteTask(button) {
        const taskCard = button.closest('.task-card');
        if (confirm('Are you sure you want to delete this task?')) {
            taskCard.remove();
        }
    }

    function editTask(button) {
        const taskCard = button.closest('.task-card');
        const title = taskCard.querySelector('.task-title').textContent;
        const description = taskCard.querySelector('.task-description').textContent;
        const priority = taskCard.querySelector('.priority-level').classList[1];
        const status = taskCard.querySelector('.status-label').textContent.toLowerCase();

        document.getElementById('task-title').value = title;
        document.getElementById('task-description').value = description;
        document.getElementById('task-priority').value = priority;
        document.getElementById('task-status').value = status === 'completed' ? 'completed' : 'pending';

        editingTask = taskCard;
    }

    attachEventListeners();
});
