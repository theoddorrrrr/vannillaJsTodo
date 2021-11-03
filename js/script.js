import {saveInput, clearInput, getInput} from './input.js'
import {saveLocalTodos, getTodos} from './localStorage.js'
import filterTodo from './filter.js'
import {checkMark, deleteCheck} from './checkMarks.js'

export const todoInput = document.querySelector('.todo-input')
export const todoList = document.querySelector('.todo-list')
export const filter = document.querySelector('.filter-todo')

document.addEventListener('DOMContentLoaded', getTodos)
document.addEventListener('DOMContentLoaded', getInput)
document.addEventListener('click', documentActions)
todoInput.addEventListener('input', saveInput)
filter.addEventListener('change', function() {filterTodo()})

function documentActions(e) {
    const targetElement = e.target

    if (targetElement.classList.contains('todo-button')) {
        e.preventDefault()
        addTodo(e);
    }
    if (targetElement.classList.contains('delete-btn')) {
        e.preventDefault()
        deleteCheck(e)
    }
    if (targetElement.classList.contains('complete-btn')) {
        e.preventDefault()
        checkMark(e)
    }
}

let todo = {
    todo: 0,
    checked: false,
}

//Adding to list todos
function addTodo() {
    if (todoInput.value.length > 0) {

        const todoDiv = document.createElement('div')
        todoDiv.classList.add('todo', '_preloaded')

        const newTodo = document.createElement('li');
        newTodo.innerText = todoInput.value
        newTodo.classList.add('todo-item')
        todoDiv.appendChild(newTodo)

        //Saving to local storage
        todo = {
            todo: todoInput.value,
            checked: false
        }
        saveLocalTodos(todo)

        const completedButton = document.createElement('button')
        completedButton.innerHTML = `<i class="fas fa-check"></i>`
        completedButton.classList.add('complete-btn')
        todoDiv.appendChild(completedButton)

        const deleteButton = document.createElement('button')
        deleteButton.innerHTML = `<i class="fas fa-trash"></i>`
        deleteButton.classList.add('delete-btn')
        todoDiv.appendChild(deleteButton)

        todoList.appendChild(todoDiv)

        todoInput.value = ""
        setTimeout(() => {todoDiv.classList.add('_loaded')}, 100)
        
        filterTodo()
        clearInput()
    }  
}





