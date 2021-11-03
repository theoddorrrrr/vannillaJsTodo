import {addLocalTodos, removeLocalTodos} from './localStorage.js'
import filterTodo from './filter.js'

//Checkmarks
function checkMark(e) {
    const targetElement = e.target

    const todo = targetElement.parentElement
    todo.classList.toggle('_completed')
    addLocalTodos(todo)
    todo.addEventListener('transitionend', () => {
        filterTodo()
    }) 
}
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

export {checkMark, deleteCheck}