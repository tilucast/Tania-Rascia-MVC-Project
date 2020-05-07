import { Model } from "../model/Model.js"

export class View {

    constructor() {
        this.root = document.querySelector('.root')
        this.todosList = document.querySelector('.todos-list')
        this.input = document.querySelector('input')
        this.model = new Model()
    }

    displayTodos(todos){
        
        if(todos.length === 0){
            this.todosList.innerHTML = 
            `
                <p>Nothing to do. Add a task!</p>
            `
        } else{
            return this.todosList.innerHTML = todos.map(({id, text, complete}) =>{
                if(!complete){
                return `
                        <li id="${id}">
                            <input type="checkbox">
                            <span contenteditable="true" class="editable">${text}</span>
                            <button class="delete">Delete</button>
                        </li>
                    `
                } else{
                    return `
                        <li id="${id}">
                            <input type="checkbox">
                            <span contenteditable="true" class="editable"><s>${text}</s></span>
                            <button class="delete">Delete</button>
                        </li>
                    `
                }
            }).join("") 
            
        }
    }

    get _todoText(){
        return this.input.value
    }

    _resetInput(){
        this.input.value = ''
    }
}