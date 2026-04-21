// 1. Data Store (The State)
let tasks = [
    { id: 1, text: "Apprendre le DOM", completed: false },
    { id: 2, text: "Maîtriser JavaScript", completed: true }
];
let currentFilter = 'all';

const elements = {
    list: document.getElementById('task-list'),
    form: document.getElementById('todo-form'),
    input: document.getElementById('todo-input'),
    count: document.getElementById('task-count'),
    filters: document.querySelectorAll('.filter-btn')
};

const render = () => {
    // Clear the list
    elements.list.innerHTML = '';

    // Filter tasks based on selection
    const filtered = tasks.filter(task => {
        if (currentFilter === 'active') return !task.completed;
        if (currentFilter === 'completed') return task.completed;
        return true;
    });

    filtered.forEach(task => {
        const card = document.createElement('div');
        card.className = `task-card ${task.completed ? 'terminee' : ''}`;
        card.innerHTML = `
            <div class="checkbox"></div>
            <span class="task-text">${task.text}</span>
            <button class="delete-btn">×</button>
        `;

        card.querySelector('.checkbox').onclick = () => {
            task.completed = !task.completed;
            refresh();
        };

        // Delete
        card.querySelector('.delete-btn').onclick = () => {
            tasks = tasks.filter(t => t.id !== task.id);
            refresh();
        };

        elements.list.appendChild(card);
    });


    const activeCount = tasks.filter(t => !t.completed).length;
    elements.count.textContent = activeCount;
};

const refresh = () => render();

elements.form.onsubmit = (e) => {
    e.preventDefault();
    const text = elements.input.value.trim();
    if (text) {
        tasks.push({ id: Date.now(), text, completed: false });
        elements.input.value = '';
        refresh();
    }
};

elements.filters.forEach(btn => {
    btn.onclick = () => {
        elements.filters.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        refresh();
    };
});

refresh();