// Initial Data
let tasks = [
    { id: Date.now() + 1, text: "Apprendre le DOM", completed: false },
    { id: Date.now() + 2, text: "Maîtriser JavaScript", completed: true }
];

const taskList = document.getElementById('task-list');
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const taskCountLabel = document.getElementById('task-count');
const filterBtns = document.querySelectorAll('.filter-btn');

let currentFilter = 'all';

// Main Render Function
function renderTasks() {
    taskList.innerHTML = '';
    
    const filteredTasks = tasks.filter(task => {
        if (currentFilter === 'active') return !task.completed;
        if (currentFilter === 'completed') return task.completed;
        return true;
    });

    filteredTasks.forEach(task => {
        const card = document.createElement('div');
        card.className = `task-card ${task.completed ? 'terminee' : ''}`;
        
        card.innerHTML = `
            <div class="checkbox"></div>
            <span class="task-text">${task.text}</span>
            <button class="delete-btn">×</button>
        `;

        // Event: Toggle Complete
        card.querySelector('.checkbox').addEventListener('click', () => {
            task.completed = !task.completed;
            renderTasks();
            updateCounter();
        });

        // Event: Delete
        card.querySelector('.delete-btn').addEventListener('click', () => {
            tasks = tasks.filter(t => t.id !== task.id);
            renderTasks();
            updateCounter();
        });

        taskList.appendChild(card);
    });
}

function updateCounter() {
    const activeTasks = tasks.filter(t => !t.completed).length;
    taskCountLabel.textContent = activeTasks;
}

// Add Task
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = todoInput.value.trim();
    if (text) {
        tasks.push({ id: Date.now(), text, completed: false });
        todoInput.value = '';
        renderTasks();
        updateCounter();
    }
});

// Filters
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        renderTasks();
    });
});

// Initialize
renderTasks();
updateCounter();