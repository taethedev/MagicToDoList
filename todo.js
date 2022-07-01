function addToList() {
    const todoInput = document.getElementById("todoInput");
    const todo = todoInput.value;
    if(todo) {
        const todoList = document.getElementById("todoList");    
        const li = document.createElement('li');
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete');
        deleteBtn.textContent = 'X';
        deleteBtn.addEventListener('click', ()=>{li.remove()})
        li.textContent = todo;
        li.appendChild(deleteBtn);
        li.classList.add('todoItem');
        todoList.appendChild(li);
        todoInput.value = '';
        todoInput.focus();
    }
    
}
let addButton = document.getElementById("addTodo");
addButton.addEventListener("click", ()=> addToList())

const input = document.getElementById('todoInput');
input.focus();
input.addEventListener('keypress', (e)=>{
    if(e.key === 'Enter') {
        addToList();
    }
})