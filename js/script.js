const todoInput = document.querySelector('.todo-input')
const todoList = document.querySelector('.todo-list')
const filter = document.querySelector('.filter-todo')

document.addEventListener('click', documentActions)
document.addEventListener('DOMContentLoaded', getTodos)
document.addEventListener('DOMContentLoaded', getInput)
todoInput.oninput = saveInput

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
    if (targetElement.classList.contains('filter-todo')) {
        filterTodo()
    }
}

let todo = {
    todo: 0,
    checked: false,
}

//Adding to lis todos
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


//Checkmarks
function deleteCheck(e) {
    const targetElement = e.target

    const todo = targetElement.parentElement
    todo.classList.remove('_preloaded', '_loaded')
    todo.classList.add('_deleted')
    removeLocalTodos(todo)

    todo.addEventListener('transitionend', () => {
        todo.remove()
    })
    
}

function checkMark(e) {
    const targetElement = e.target

    const todo = targetElement.parentElement
    todo.classList.toggle('_completed')
    addLocalTodos(todo)
    filterTodo()
}

//Making
function addedTodo(e) {
    const targetElement = e.target

    const todo = targetElement.parentElement
    todo.classList.add('_added')
}


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


//Filter
function filterTodo() {
    const todos = todoList.childNodes
    todos.forEach(function(todo) {
        switch(filter.value) {
            case "all":
                todo.style.display = 'flex'
                break
            case "completed":
                if(todo.classList.contains('_completed')) {
                    todo.style.display = 'flex'
                } else {
                    todo.style.display = 'none'
                }
                break
            case "uncompleted":
            if(!todo.classList.contains('_completed')) {
                todo.style.display = 'flex'
            } else {
                todo.style.display = 'none'
            }
            break
        }
    })
}


//Input
function saveInput() {
    let input = todoInput.value
    localStorage.setItem("input", input);
    getInput()
}

function clearInput() {
    localStorage.setItem('input', '')
}

//Add to input value after refresh
function getInput() {
    let input = localStorage.getItem("input")
    todoInput.value = input
}