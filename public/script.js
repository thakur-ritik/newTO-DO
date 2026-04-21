const API = "/api/todos";

async function fetchTodos() {
    const res = await fetch(API);
    const data = await res.json();
    renderTodos(data);
}

async function addTodo() {
    const input = document.getElementById("todoInput");
    if (!input.value) return;

    await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input.value })
    });

    input.value = "";
    fetchTodos();
}

async function deleteTodo(id) {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    fetchTodos();
}

async function toggleTodo(id) {
    await fetch(`${API}/${id}`, { method: "PUT" });
    fetchTodos();
}

function renderTodos(todos) {
    const list = document.getElementById("todoList");
    list.innerHTML = "";

    todos.forEach(todo => {
        const li = document.createElement("li");

        li.innerHTML = `
            <span onclick="toggleTodo(${todo.id})" class="${todo.completed ? 'completed' : ''}">
                ${todo.text}
            </span>
            <button onclick="deleteTodo(${todo.id})">❌</button>
        `;

        list.appendChild(li);
    });
}

fetchTodos();
