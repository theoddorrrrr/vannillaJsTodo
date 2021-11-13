import { todoList, filter } from "./app.js"

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

export default filterTodo