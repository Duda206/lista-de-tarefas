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

    const logged = JSON.parse(localStorage.getItem("logged"));
    const userEmail = logged.email;

    const allTasks = JSON.parse(localStorage.getItem('tasks')) || {};
    const userTasks = allTasks[userEmail] || [];

    if (inputTaskValue) {
        userTasks.push({
            task: inputTaskValue,
            done: false
        });
    }

    allTasks[userEmail] = userTasks;
    document.getElementById('input-task').value = '';
    localStorage.setItem('tasks', JSON.stringify(allTasks));
    listTasks();
}

function listTasks() {
    const divTasks = document.getElementById('tasks');

    const logged = JSON.parse(localStorage.getItem("logged")); 
    const userEmail = logged.email;

    const allTasks = JSON.parse(localStorage.getItem('tasks')) || {};
    const userTasks = allTasks[userEmail] || [];

    divTasks.innerHTML = '';

    if (userTasks.length > 0) {
        userTasks.forEach((taskObj, index) => {
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
                allTasks[userEmail] = userTasks;
                localStorage.setItem('tasks', JSON.stringify(allTasks));
                listTasks();
            });

            const trashIcon = document.createElement('img');
            trashIcon.src = 'assets/icons/trash-icon.svg';

            trashIcon.addEventListener('click', () => {
                userTasks.splice(index, 1);
                allTasks[userEmail] = userTasks;
                localStorage.setItem('tasks', JSON.stringify(allTasks));
                listTasks();
            });

            actionsDiv.appendChild(checkButton);
            actionsDiv.appendChild(trashIcon);

            taskCard.appendChild(taskText);
            taskCard.appendChild(actionsDiv);

            divTasks.appendChild(taskCard);
        });
    }
}

function refreshTasks() {
    const logged = JSON.parse(localStorage.getItem("logged"));
    const userEmail = logged.email;

    const allTasks = JSON.parse(localStorage.getItem('tasks')) || {};
    allTasks[userEmail] = [];

    localStorage.setItem('tasks', JSON.stringify(allTasks));
    listTasks();
}

function logout() {
    localStorage.removeItem('logged');
    window.location.href = '/login.html';
}

listTasks();
