
const API_URL = 'https://furthermore-suggestions-rpm-legends.trycloudflare.com';

// Helper function to fetch data from API
export async function fetchData(url, method = 'GET', body = null) {
    try {
        const options = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            }
        };

        if (body) {
            options.body = JSON.stringify(body);
        }
        console.log(url)
        const response = await fetch(url, options);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}

// Function to add a new todo
export async function addTodo(newText) {
    const newTodo = {
        text: newText
    };

    const response = await fetchData(`${API_URL}/todos`, 'POST', newTodo);

    if (response) {
        console.log('Todo added:', response);
    }
}

// Function to edit a todo
export async function editTodo(id, newText) {
    const updatedTodo = {
        text: newText
    };
    const response = await fetchData(`${API_URL}/todos/${id}`, 'PUT', updatedTodo);
    if (response) {
        console.log('Todo updated:', response);
    }
}

// Function to delete a todo
export async function deleteTodo(id) {
    console.log(id)
    const response = await fetchData(`${API_URL}/todos/${id}`, 'DELETE');
    if (response) {
        console.log('Entry Deleted:', response);
    }
}


// Function to fetch todos
export async function fetchTodos() {
    const todos = await fetchData(`${API_URL}/todos`, 'GET');
    return todos
}
