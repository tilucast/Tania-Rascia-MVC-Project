export class View {

    constructor() {
        this.root = this.getElement('.root')

        this.title = this.createElement('h1')
        this.title.textContent = 'Todos'

        this.form = this.createElement('form', 'formulario')

        this.input = this.createElement('input')
        this.input.type = 'text'
        this.input.placeholder = 'Add a todo'
        this.input.name = 'todo'

        this.submitBtn = this.createElement('button')
        this.submitBtn.textContent = 'Submit'

        this.todosList = this.createElement('ul', 'todos-list')

        this.form.append(this.input, this.submitBtn)

        this.root.append(this.title, this.form, this.todosList)
    }

    createElement(tag, className) {
        const element = document.createElement(tag)
        if (className) element.classList.add(className)

        return element
    }

    getElement(selector) {
        const $ = document.querySelector(selector)
        return $
    }

    get _todoText() {
        return this.input.value
    }

    _resetInput() {
        this.input.value = ''
    }

    displayTodos(todos) {
        while (this.todosList.firstChild) {
            this.todosList.removeChild(this.todosList.firstChild)
        }

        if (todos.length === 0) {
            const p = this.createElement('p')
            p.textContent = 'Nothing to do! Add a task.'
            this.todosList.append(p)

        } else {
            todos.forEach(todo => {
                const li = this.createElement('li')
                li.id = todo.id


                const checkbox = this.createElement('input')
                checkbox.type = 'checkbox'
                checkbox.checked = todo.complete


                const span = this.createElement('span')
                span.contentEditable = true
                span.classList.add('editable')


                if (todo.complete) {
                    const strike = this.createElement('s')
                    strike.textContent = todo.text
                    span.append(strike)
                } else {

                    span.textContent = todo.text
                }


                const deleteButton = this.createElement('button', 'delete')
                deleteButton.textContent = 'Delete'
                li.append(checkbox, span, deleteButton)


                this.todosList.append(li)
            })
        }
    }
}