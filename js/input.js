import { todoInput } from "./script.js";

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

export {saveInput, clearInput, getInput}