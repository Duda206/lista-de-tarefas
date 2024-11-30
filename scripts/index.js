function isLoggedIn() {
    const logged = JSON.parse(localStorage.getItem("logged"));
    return logged && logged.loggedIn === true;
}

function ensureLoggedIn() {
    if (!isLoggedIn()) {
        window.location.href = "/login.html"; 
    }
}

ensureLoggedIn();

function addTask() {
    const inputTaskValue = document.getElementById('input-task').value;

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    if (inputTaskValue) {
        tasks.push({
            task: inputTaskValue,
            done: false
        });
    }

    document.getElementById('input-task').value = '';
    localStorage.setItem('tasks', JSON.stringify(tasks));
    listTasks();
}

function listTasks() {
    const divTasks = document.getElementById('tasks');
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    divTasks.innerHTML = '';

    if (tasks.length > 0) {
        tasks.forEach((taskObj, index) => {
            const taskCard = document.createElement('div');
            taskCard.classList.add('task-card');

            const taskText = document.createElement('span');
            taskText.textContent = taskObj.task;

            const actionsDiv = document.createElement('div');
            actionsDiv.classList.add('buttons-actions');

            const checkButton = document.createElement('div');
            checkButton.classList.add('button-check');
            const checkIcon = document.createElement('img');
            checkIcon.src = 'assets/icons/check-icon-active.svg';
            checkIcon.classList.add('check-icon');
            checkButton.appendChild(checkIcon);

            if (taskObj.done) {
                checkButton.classList.add('completed');
                taskText.classList.add('line-through');
            }

            checkButton.addEventListener('click', () => {
                taskObj.done = !taskObj.done;
                localStorage.setItem('tasks', JSON.stringify(tasks));
                listTasks();
            });

            const trashIcon = document.createElement('img');
            trashIcon.src = 'assets/icons/trash-icon.svg';

            trashIcon.addEventListener('click', () => removeTask(index));

            actionsDiv.appendChild(checkButton);
            actionsDiv.appendChild(trashIcon);

            taskCard.appendChild(taskText);
            taskCard.appendChild(actionsDiv);

            divTasks.appendChild(taskCard);
        });
    }
}

function removeTask(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.splice(index, 1);

    localStorage.setItem('tasks', JSON.stringify(tasks));

    listTasks();
}

function refreshTasks() {
    localStorage.setItem('tasks', JSON.stringify([]));
    listTasks();
}

function logout() {
    localStorage.removeItem('logged');
    window.location.href = '/login.html';
}

listTasks();
