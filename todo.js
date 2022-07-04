
var currentList = [];
var index = 0;
const textbox = document.getElementById('todoInput');
let addButton = document.getElementById("addTodo");
addButton.addEventListener("click", ()=> addToList(textbox.value))
const todoList = document.getElementById("todoList");    
const deleteBtn = document.getElementById('deleteAll');
deleteBtn.addEventListener('click', ()=> deleteAll())
const divFirst = document.getElementById('first');
const divBegins = document.getElementById('begins');


textbox.focus();
// input.addEventListener('keypress', (e)=>{
//     if(e.key === 'Enter') {
//         addToList(input.value);
//     }
// })
getLocalStorage();
createTodoList();

// Create a content block with user entered data
function createBlock(input) {
    const divBlock = document.createElement('div');
    divBlock.classList.add('todo__list-block');
    const divDelete = document.createElement('div');
    divDelete.classList.add('todo__delete');
    const btnDelete = document.createElement('button');
    btnDelete.classList.add('block-delete-btn');
    const btnImg = document.createElement('img');
    btnImg.classList.add('block-delete-btn-svg');
    btnImg.src = 'assets/svg/close_black_24dp.svg';
    btnImg.alt = 'X';
    btnImg.addEventListener('click', ()=>{removeFromList(divBlock)});
    const divContent = document.createElement('div');
    divContent.classList.add('todo__block-content');
    const pContent = document.createElement('p');
    pContent.textContent = typeof(input) == 'string' ? input : input[Object.keys(input)[0]];

    divBlock.appendChild(divDelete);
    divDelete.appendChild(btnDelete);
    btnDelete.appendChild(btnImg);
    divBlock.appendChild(divContent);
    divContent.appendChild(pContent);

    return divBlock;
}
// Add user typed text to list
function addToList(value, init) {
    if(value) {
        todoList.appendChild(createBlock(value));
        textbox.value = '';
        textbox.focus();
        
        if(!init) {
            let obj = {s: value};
            currentList.push(obj)
            setLocalStorage();
        }
        setupEmptyList();
    }
}
// Remove Content Block
function removeFromList(element) {
    if(element instanceof HTMLElement) {
        let content = element.firstChild.textContent;
        currentList.splice(currentList.indexOf(content), 1);
        element.remove();
        setLocalStorage();
        setupEmptyList();
    }
}
function setLocalStorage(){
    localStorage.clear();
    localStorage.setItem('todoList', JSON.stringify(currentList));
}
function getLocalStorage(){
    currentList = localStorage.getItem('todoList') ? localStorage.getItem('todoList') : [];
    if(currentList.length) currentList = JSON.parse(currentList);
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
    setupEmptyList();
}
function isListEmpty(list) {
    if(list instanceof HTMLElement) {
       return list.childElementCount == 0;
    }
}
function setupEmptyList () {
    if(isListEmpty(todoList)) {
        divFirst.classList.remove('todo__enter-first--empty');
        divBegins.classList.add('todo__enter-begins--empty');
    }
    else {
        divFirst.classList.add('todo__enter-first--empty');
        divBegins.classList.remove('todo__enter-begins--empty');
    }
}