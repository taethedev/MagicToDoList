
var currentList = [];
const input = document.getElementById('todoInput');
let addButton = document.getElementById("addTodo");
addButton.addEventListener("click", ()=> addToList(input.value))
const todoList = document.getElementById("todoList");    
const deleteBtn = document.getElementById('deleteAll');
deleteBtn.addEventListener('click', ()=> deleteAll())


input.focus();
input.addEventListener('keypress', (e)=>{
    if(e.key === 'Enter') {
        addToList(input.value);
    }
})
getLocalStorage();
createTodoList();

function addToList(value, init) {
    if(value) {
        const li = document.createElement('li');
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete');
        deleteBtn.textContent = 'X';
        deleteBtn.addEventListener('click', ()=>{
            removeFromList(li);
        })
        li.textContent = value;
        li.appendChild(deleteBtn);
        li.classList.add('todoItem');
        todoList.appendChild(li);
        todoInput.value = '';
        todoInput.focus();
        
        if(!init) {
            currentList.push(value)
            setLocalStorage();
        }
       
    }
}
function removeFromList(element) {
    if(element instanceof HTMLElement) {
        let content = element.firstChild.textContent;
        currentList.splice(currentList.indexOf(content), 1);
        element.remove();
        setLocalStorage();
    }
}
function setLocalStorage(){
    localStorage.clear();
    localStorage.setItem('todoList', currentList);
}
function getLocalStorage(){
    currentList = localStorage.getItem('todoList') ? localStorage.getItem('todoList') : [];
    currentList = currentList.length ? currentList.split(',') : [];
}
function createTodoList() {
    if(currentList && currentList.length) {
        currentList.forEach((element)=>{
            addToList(element, true);
        })
    }
}
function deleteAll() {
    currentList = [];
    localStorage.clear();
    
    while (todoList.firstChild) {
        todoList.removeChild(todoList.firstChild);
    }
}