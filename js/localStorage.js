import { todoList } from "./app.js"

//Local Storage for todos
function checkTodos() {
    let todos

    if(localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }

    return todos
}

//Saving to local storage
function saveLocalTodos(todo) {
    let todos = checkTodos()

    todos.push(todo)
    localStorage.setItem('todos', JSON.stringify(todos))

}

//After HTML loaded checkking for saved todos
function getTodos() {
    let todos = checkTodos()

    todos.forEach(function(todo) {
        const todoDiv = document.createElement('div')
        todoDiv.classList.add('todo', '_preloaded')
    
        const newTodo = document.createElement('li');
        newTodo.innerText = todo.todo
        newTodo.classList.add('todo-item')
        todoDiv.appendChild(newTodo)
    
        const completedButton = document.createElement('button')
        completedButton.innerHTML = `<i class="fas fa-check"></i>`
        completedButton.classList.add('complete-btn')
        todoDiv.appendChild(completedButton)

        //Adding mark after refreshing page
        if (todo.checked === true) {
            todoDiv.classList.toggle('_completed')
        }

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
    }) 
}

function addLocalTodos(todo) {
    let todos = checkTodos()

    const todoIndex = todo.children[0].innerText

    let indexTodo = todos.find(item => {
        return item.todo === todoIndex
    } )

    if (indexTodo.checked === false) {
        indexTodo.checked = true
    } else {
        indexTodo.checked = false
    }

    localStorage.setItem("todos", JSON.stringify(todos))
}

function removeLocalTodos(todo) {
    let todos = checkTodos()
    
    const todoIndex = todo.children[0].innerText
    let indexTodo = todos.findIndex(item => {
        return item.todo === todoIndex
    })

    todos.splice(indexTodo, 1)
    localStorage.setItem("todos", JSON.stringify(todos))
}

export {checkTodos, saveLocalTodos, getTodos, addLocalTodos, removeLocalTodos}