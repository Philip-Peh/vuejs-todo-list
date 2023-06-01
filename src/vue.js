import { fetchTodos } from "./api.js";
import { editTodo } from "./api.js";
import { addTodo } from "./api.js";
import { deleteTodo } from "./api.js";

var app = new Vue({
    el: '#app',
    data() {
        return {
            title: 'To Do List for Success',
            task: '',
            tasks: [],
            completed: [],
            editIndex: -1,
            runningId: 0,
            deleting: [],
        }
    },
    created() {
        this.loadTasks();
    },
    methods: {

        async addTask() {
            await addTodo(this.task)
            this.task = ''
            this.loadTasks()
        },
        addNewTask(task) {
            this.tasks.push(task);
        },
        async clearAll() {
            for (let i = 0; i < this.tasks.length; i++) {
                await deleteTodo(this.tasks[i].id)
            }
            this.deleting = []
            this.loadTasks()
        },
        enterEditMode(index) {
            this.editIndex = index
            this.task = this.tasks[index].text
        },
        async deleteTask(index) {
            this.deleting.push(index);
            console.log(this.tasks[index].id)
            await deleteTodo(this.tasks[index].id)
            this.loadTasks()
            this.deleting.splice(this.deleting.indexOf(index), 1);
        },
        isDeleting(index) {
            return this.deleting.includes(index);
        },
        async exitEditMode() {
            const index = this.editIndex;
            const todoMsg = this.tasks[index].text
            console.log(this.tasks[index].id, todoMsg)
            await editTodo(this.tasks[index].id, todoMsg.toString())
                .then(() => {
                    console.log('edit success!')
                    // Handle the successful update, if needed
                    this.loadTasks()
                })
                .catch(error => {
                    console.log(error);
                });
            // Other code related to entering edit mode
            this.editIndex = -1;

        },
        loadTasks() {
            this.tasks = []
            fetchTodos()
                .then(response => {
                    response.forEach(element => {
                        console.log(element)
                        this.tasks.push({ id: element.id, text: element.text });
                    });
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
});