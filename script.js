// Supabase configuration
const supabaseUrl = 'https://srhegccxceqeovyojrtm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNyaGVnY2N4Y2VxZW92eW9qcnRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE3OTg0MDksImV4cCI6MjA0NzM3NDQwOX0.HjCwlon-lqdt5RUwfAdPSCAb_nkzoV8_niMeGB6GAwE';
const client = supabase.createClient(supabaseUrl, supabaseKey);

const classesDropdown = document.getElementById('class-select');
const tasksContainer = document.getElementById('tasks-container');

// Fetch and populate regular classes in dropdown
async function loadClasses() {
    const { data, error } = await client.rpc('get_class_list');
    if (error) {
        console.error('Fehler beim Laden der Klassen:', error);
        return;
    }

    const regularClasses = data.filter(cls => cls.is_regular);
    regularClasses.forEach(({ class_name }) => {
        const option = document.createElement('option');
        option.value = class_name;
        option.textContent = class_name;
        classesDropdown.appendChild(option);
    });
}

// Fetch and display tasks for a specific class
async function loadTasks(className) {
    const { data, error } = await client.rpc('get_tasks', { class_name: className });
    if (error) {
        console.error('Fehler beim Laden der Aufgaben:', error);
        tasksContainer.innerHTML = '<p>Fehler beim Laden der Aufgaben.</p>';
        return;
    }

    displayTasks(data);
}

// Display tasks grouped by date
function displayTasks(tasks) {
    tasksContainer.innerHTML = '';
    if (tasks.length === 0) {
        tasksContainer.innerHTML = '<p>Keine Aufgaben gefunden.</p>';
        return;
    }

    const groupedTasks = tasks.reduce((acc, task) => {
        const date = new Date(task.date).toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
        if (!acc[date]) acc[date] = [];
        acc[date].push(task);
        return acc;
    }, {});

    Object.entries(groupedTasks).forEach(([date, tasks]) => {
        const dateGroup = document.createElement('div');
        dateGroup.className = 'task-date-group';

        const dateTitle = document.createElement('h3');
        dateTitle.className = 'task-date-title';
        dateTitle.textContent = date;
        dateGroup.appendChild(dateTitle);

        tasks.forEach(task => {
            const taskItem = document.createElement('div');
            taskItem.className = 'task-item';
            taskItem.textContent = `${task.subject}: ${task.short}`;
            taskItem.addEventListener('click', () => toggleTaskDetails(taskItem, task.long));

            dateGroup.appendChild(taskItem);
        });

        tasksContainer.appendChild(dateGroup);
    });
}

// Toggle task details visibility
function toggleTaskDetails(taskElement, detailsText) {
    let details = taskElement.querySelector('.task-details');
    if (details) {
        details.remove();
    } else {
        details = document.createElement('div');
        details.className = 'task-details';
        details.textContent = detailsText;
        taskElement.appendChild(details);
    }
}

// Event listeners
classesDropdown.addEventListener('change', (event) => {
    const className = event.target.value;
    if (className) loadTasks(className);
});

// Initialize
loadClasses();
