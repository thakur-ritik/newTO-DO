const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

let todos = [];

// Get all todos
app.get("/api/todos", (req, res) => {
    res.json(todos);
});

// Add todo
app.post("/api/todos", (req, res) => {
    const todo = {
        id: Date.now(),
        text: req.body.text,
        completed: false
    };
    todos.push(todo);
    res.json(todo);
});

// Delete todo
app.delete("/api/todos/:id", (req, res) => {
    todos = todos.filter(t => t.id != req.params.id);
    res.json({ message: "Deleted" });
});

// Toggle complete
app.put("/api/todos/:id", (req, res) => {
    todos = todos.map(t => 
        t.id == req.params.id ? { ...t, completed: !t.completed } : t
    );
    res.json({ message: "Updated" });
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
