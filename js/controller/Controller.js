import {
    Model
} from '../model/Model.js'
import {
    View
} from '../view/View.js'

class Controller {

    constructor(model, view) {
        this.model = model
        this.view = view

        this.form = document.querySelector('.formulario')
        this.todoList = document.querySelector('.todos-list')

        this.onTodoListChanged(this.model.todos)
    }

    onTodoListChanged(todos) {
        this.view.displayTodos(todos)
    }

    _commit(todos) {
        this.onTodoListChanged(todos)
        localStorage.setItem('todos', JSON.stringify(todos))
    }

    handleAddTodo() {
        this.form.addEventListener('submit', (event) => {
            event.preventDefault()

            if (this.view._todoText) {
                this.model.addTodo(this.view._todoText)
                this._commit(this.model.todos)
                this.onTodoListChanged(this.model.todos)
                this.view._resetInput()
                //console.log(this.model.todos)
            }
        })
    }

    handleEditTodo() {
        this.todoList.addEventListener('focusout', event => {
            let text = event.target.innerText
            const id = parseInt(event.target.parentElement.id)
            this.model.editTodo(id, text)
            this.onTodoListChanged(this.model.todos)
            this._commit(this.model.todos)
            //console.log(this.model.todos)
        })
    }

    handleDeleteTodo() {
        this.todoList.addEventListener('click', event => {
            if (event.target.className === 'delete') {
                const id = parseInt(event.target.parentElement.id)
                this.model.deleteTodo(id)
                this._commit(this.model.todos)
                this.onTodoListChanged(this.model.todos)
                //console.log(this.model.todos)
            }
        })
    }

    handleToggleTodo() {
        this.todoList.addEventListener('click', event => {
            if (event.target.type === 'checkbox') {
                const id = parseInt(event.target.parentElement.id)
                this.model.toggleTodo(id)
                this._commit(this.model.todos)
                this.onTodoListChanged(this.model.todos)
                //console.log(this.model.todos)
            }
        })
    }
}

const controller = new Controller(new Model(), new View())
controller.handleAddTodo()
controller.handleDeleteTodo()
controller.handleToggleTodo()
controller.handleEditTodo()