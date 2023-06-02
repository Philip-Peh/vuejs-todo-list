const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

// Create an instance of the Express server
const app = express();

// Keep track of the previous length
let previousLength;

// Middleware to parse request bodies as JSON
app.use(bodyParser.json());

// Middleware to enable CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

let todos = [
    { id: uuidv4(), text: 'Go for a hike' },
    { id: uuidv4(), text: 'Learn to juggle' },
    { id: uuidv4(), text: 'Try a new recipe' },
    { id: uuidv4(), text: 'Write a poem' },
    { id: uuidv4(), text: 'Play a board game' },
    { id: uuidv4(), text: 'Watch a comedy show' },
    { id: uuidv4(), text: 'Build a sandcastle' },
    { id: uuidv4(), text: 'Learn a magic trick' },
    { id: uuidv4(), text: 'Paint a picture' },
    { id: uuidv4(), text: 'Have a picnic' }
];

// Endpoint to handle POST requests for adding a new todo
app.post('/todos', (req, res) => {
    const newTodo = req.body;
    newTodo.id = uuidv4();
    todos.push(newTodo);
    console.log('Todo added:', newTodo);
    res.status(201).json({ message: 'Todo added successfully' });
});

// Endpoint to handle PUT requests for editing a todo
app.put('/todos/:id', (req, res) => {
    const todoId = req.params.id;
    const updatedTodo = req.body;

    todos = todos.map(todo => {
        if (todo.id.toString() === todoId) {
            todo.text = updatedTodo.text;
            return todo;
        }
        return todo;
    });

    console.log('Todo updated:', updatedTodo);
    res.json({ message: 'Todo updated successfully' });
});

// Endpoint to handle DELETE requests for deleting a todo
app.delete('/todos/:id', (req, res) => {
    const todoId = req.params.id;

    todos = todos.filter(todo => todo.id.toString() !== todoId);

    console.log('Todo deleted:', todoId);
    res.json({ message: 'Todo deleted successfully' });
});


// Endpoint to handle GET requests for fetching todos
app.get('/todos', (req, res) => {
    if (todos.length !== previousLength) {
        console.log('Total entries:', todos.length);
        previousLength = todos.length; // Update the previous length
    }
    res.json(todos);
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
