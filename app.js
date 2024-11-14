// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyADHP-7WbK-eLTBKaz7XLaFicV_qpiRN4E",
    authDomain: "bauemli-agenda.firebaseapp.com",
    databaseURL: "https://bauemli-agenda-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "bauemli-agenda",
    storageBucket: "bauemli-agenda.firebasestorage.app",
    messagingSenderId: "379163939889",
    appId: "1:379163939889:web:9ed6ce9bd3bd892494f110",
    measurementId: "G-YJG0HVYW11"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Add task
document.getElementById('task-form').addEventListener('submit', e => {
    e.preventDefault();
    const task = document.getElementById('task').value;
    const className = document.getElementById('class').value;
    const dueDate = document.getElementById('dueDate').value;

    db.ref('tasks').push({
        task,
        className,
        dueDate
    });
    document.getElementById('task-form').reset();
});

// Fetch tasks for students
const tasksList = document.getElementById('tasks-list');
db.ref('tasks').on('value', snapshot => {
    tasksList.innerHTML = '';
    snapshot.forEach(childSnapshot => {
        const data = childSnapshot.val();
        const taskElement = document.createElement('div');
        taskElement.innerText = `Aufgabe: ${data.task} | Klasse: ${data.className} | Fällig: ${data.dueDate}`;
        tasksList.appendChild(taskElement);
    });
});

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/service-worker.js")
    .then(() => console.log("Service Worker registered"))
    .catch(error => console.error("Service Worker registration failed:", error));
}
