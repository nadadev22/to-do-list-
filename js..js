document.getElementById('addTaskBtn').addEventListener('click', addTask);

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText) {
        const taskList = document.getElementById('taskList');
        const li = document.createElement('li');

        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.addEventListener('change', () => {
            li.classList.toggle('completed');
            playCompletionSound();
            createConfetti(li);
            checkAllTasks(); 
        });

       
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'حذف ';
        deleteButton.className = 'delete';
        deleteButton.addEventListener('click', () => {
            li.remove();
            checkAllTasks(); 
        });

        li.appendChild(checkbox);
        li.appendChild(document.createTextNode(taskText));
        li.appendChild(deleteButton);

        taskList.appendChild(li);
        taskInput.value = '';

        
        li.style.opacity = 0;
        setTimeout(() => {
            li.style.opacity = 1;
            li.style.transform = 'translateY(-10px)';
            li.style.transition = 'all 0.3s';
        }, 10);
    }
}

function playCompletionSound() {
    const audio = new Audio('completion-sound.mp3'); 
    audio.play();
}

function createConfetti(target) {
    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = getRandomColor();
        document.body.appendChild(confetti);

        setTimeout(() => {
            confetti.style.transform = 'translateY(100vh)';
        }, 50);

        setTimeout(() => {
            confetti.remove();
        }, 2000);
    }
}

function getRandomColor() {
    const colors = ['#FF6F61', '#FF3D4D', '#FFD93D', '#4CAF50', '#00BFFF'];
    return colors[Math.floor(Math.random() * colors.length)];
}

function checkAllTasks() {
    const taskList = document.getElementById('taskList');
    const tasks = taskList.querySelectorAll('li');
    const allCompleted = Array.from(tasks).every(task => task.classList.contains('completed'));

    const congratulations = document.getElementById('congratulations');
    if (allCompleted && tasks.length > 0) {
        congratulations.classList.remove('hidden');
    } else {
        congratulations.classList.add('hidden');
    }
}
