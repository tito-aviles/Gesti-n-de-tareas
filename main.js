const taskList = document.getElementById('taskList');
const taskInput = document.getElementById('taskInput');
const userNameInput = document.getElementById('userNameInput');
const priorityInput = document.getElementById('priorityInput');
const filterStatus = document.getElementById('filterStatus');

let tasks = []; // Arreglo global para almacenar las tareas

// Función para agregar una tarea
function addTask() {
    const taskName = taskInput.value.trim();
    const userName = userNameInput.value.trim();
    const priority = priorityInput.value;

    if (taskName === '') {
        alert('Por favor, escribe una tarea.');
        return;
    }

    if (userName === '') {
        alert('Por favor, escribe tu nombre.');
        return;
    }

    const newTask = {
        id: Date.now(),
        text: taskName,
        user: userName,
        priority: priority, // Prioridad asignada por el usuario
        completed: false
    };
    tasks.push(newTask);

    console.log('Tarea agregada:', newTask); // Verifica si la tarea se agrega correctamente
    console.log('Lista de tareas:', tasks); // Verifica el estado del arreglo tasks

    renderTasks();
    taskInput.value = '';
    userNameInput.value = '';
    priorityInput.value = 'low'; // Restablecer la prioridad a "Baja"
}

// Función para renderizar las tareas en la lista
function renderTasks() {
    console.log('Renderizando tareas...'); // Verifica si la función se ejecuta
    taskList.innerHTML = ''; // Limpiar la lista actual

    tasks.forEach(task => {
        console.log('Renderizando tarea:', task); // Verifica cada tarea que se renderiza
        const li = document.createElement('li');
        li.className = `task ${task.priority}`;
        li.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}">
                ${task.text} <span class="priority">(${task.user})</span>
            </span>
            <div class="task-details">
                <span>Prioridad: ${task.priority === 'low' ? 'Baja' : task.priority === 'medium' ? 'Media' : 'Alta'}</span>
            </div>
            <button onclick="toggleComplete(${task.id})">${task.completed ? 'Desmarcar' : 'Completar'}</button>
            <button class="delete-btn" onclick="deleteTask(${task.id})">Eliminar</button>
        `;
        taskList.appendChild(li);
    });
}

// Función para marcar una tarea como completada o pendiente
function toggleComplete(taskId) {
    tasks = tasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    renderTasks(); // Actualizar la lista visualmente
}

// Función para eliminar una tarea
function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId); // Eliminar la tarea del arreglo
    renderTasks(); // Actualizar la lista visualmente
}

// Filtrar tareas
filterStatus.addEventListener('change', renderTasks);