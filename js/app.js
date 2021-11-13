import {saveInput, clearInput, getInput} from './input.js'
import {checkTodos, saveLocalTodos, getTodos} from './localStorage.js'
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

    if (targetElement.classList.contains('todo-button') &&
        !targetElement.classList.contains('todo-edit')) {
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
    if (targetElement.classList.contains('edit-btn')) {
        e.preventDefault()
        editTodo(e)
    }
    if (targetElement.classList.contains('todo-edit')) {
        e.preventDefault()
        refreshTodo()
        saveTodo(e)
    }
}

let todo = {
    todo: 0,
    checked: false,
}

let prevInput = null

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

        const editButton = document.createElement('button')
        editButton.innerHTML = `<i class="fas fa-edit"></i>`
        editButton.classList.add('edit-btn')
        todoDiv.appendChild(editButton)

        const deleteButton = document.createElement('button')
        deleteButton.innerHTML = `<i class="fas fa-trash"></i>`
        deleteButton.classList.add('delete-btn')
        todoDiv.appendChild(deleteButton)

        todoList.appendChild(todoDiv)

        
        setTimeout(() => {todoDiv.classList.add('_loaded')}, 100)
        
        filterTodo()
        clearInput()
    }  
}

//Editing todo
function editTodo(e) {
    const targetElement = e.target

    let text = targetElement.parentNode.childNodes[0].innerText
    todoInput.value = text

    const addTodo = document.querySelector('.todo-button')
    const square = addTodo.childNodes[1]

    if (!addTodo.classList.contains('todo-edit')) {
        addTodo.classList.add('todo-edit')
        square.classList.replace('fa-plus-square', 'fa-save')
    } 

    prevInput = text
}

function refreshTodo() {
    let todos = checkTodos()
    let currentInput = todoInput.value

    let indexTodo = todos.find(item => {
        return item.todo === prevInput
    } )

    indexTodo.todo = currentInput

    const todoList = document.querySelectorAll('.todo-item')
    todoList.forEach(item => {
        if (item.innerText == prevInput) {
            item.innerText = currentInput
        }
    })

    localStorage.setItem("todos", JSON.stringify(todos))
}

function saveTodo(e) {
    const targetElement = e.target
    const square = targetElement.childNodes[1]

    targetElement.classList.remove('todo-edit')
    square.classList.replace('fa-save', 'fa-plus-square')

    clearInput()
}






