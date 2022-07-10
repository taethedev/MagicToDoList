
var currentList = [];
var counter = 0;
var timer = 4;
const textbox = document.getElementById('todoInput');
let addButton = document.getElementById("addTodo");
let saveButton = document.getElementById("save");
addButton.addEventListener("click", ()=> addToList(textbox.innerHTML))
saveButton.addEventListener("click", ()=> console.log(currentList))
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

// Init start
createTodoList();

// Empty list text
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
// Create todo list
function createTodoList() {
    getLocalStorage();
    if(currentList && currentList.length) {
        currentList.forEach((element)=>{
            let idx = Object.keys(element)[0];
            addToList(element, idx, true);
        })
    }
}
// Add todo block to list
function addToList(value, idx, init) {
    if(value) {
        if(init) {
            todoList.appendChild(createBlock(value, idx));
        }else {
            todoList.prepend(createBlock(value, counter));
            let obj = {[counter]: value};
            currentList.unshift(obj)
            // console.log(currentList)
            counter += 1;
            setLocalStorage();
        }
        textbox.innerHTML = '';
        textbox.focus();
        setupEmptyList();
    }
}
// Create a content block with user entered data
function createBlock(input, idx) {
    const divBlock = document.createElement('div');
    divBlock.classList.add('todo__list-block');
    divBlock.setAttribute('id', idx);

    const divDelete = document.createElement('div');
    divDelete.classList.add('todo__delete');
    const btnDelete = document.createElement('button');
    btnDelete.classList.add('block-delete-btn');
    const btnImg = document.createElement('img');
    btnImg.classList.add('block-delete-btn-svg');
    btnImg.src = 'assets/svg/close_black_24dp.svg';
    btnImg.alt = 'X';
    // Remove from list
    btnImg.addEventListener('click', ()=>{
        removeFromList(divBlock)
    });
    const divContent = document.createElement('div');
    divContent.classList.add('todo__block-content');
    const pContent = document.createElement('p');
    pContent.setAttribute('contenteditable', 'true');
    pContent.setAttribute('id', 'contentText');
    
    const saveDiv = document.createElement('div');
    saveDiv.classList.add('save');
    saveDiv.setAttribute('id', 'saveText');

    // Auto Save content after 3 sec of change
    pContent.addEventListener('focus', ()=>{
        const interval = setInterval(function() {
            timer ++;
            if (timer == 3 ) {
                saveBlock(divBlock.id, divBlock);
            }
        }, 1000);
        let changed = false;
        pContent.addEventListener('keydown', () =>{
            timer = 0;
            changed = true;
        })
        pContent.addEventListener('keyup', () =>{
            timer = 0;
        })
        pContent.addEventListener('blur', ()=>{
            clearInterval(interval);
            if (changed) saveBlock(divBlock.id, divBlock);
        })
    })
   
    pContent.innerHTML = typeof(input) == 'string' ? input : input[Object.keys(input)[0]];

    divBlock.appendChild(divDelete);
    divDelete.appendChild(btnDelete);
    btnDelete.appendChild(btnImg);
    divBlock.appendChild(divContent);
    divBlock.appendChild(saveDiv);
    divContent.appendChild(pContent);

    return divBlock;
}
// Edit todo block
function saveBlock (id, element) {
    let save = element.querySelector('#saveText')
    console.log(element)
    save.classList.add('save-animation');
    setTimeout(() => {
        save.classList.remove('save-animation');
    }, 3000);
    let contentText = element.querySelector('#contentText');
    currentList.forEach((e)=> {
        if(Object.keys(e) == id) {
            e[id] = contentText.innerHTML;
        }
    })
    setLocalStorage();
}
// Remove todo block from list
function removeFromList(element) {
    if(element instanceof HTMLElement) {
        let idx = element.id;
        // console.log(element)
        let newList = [];
        newList = currentList.filter((e)=> {
            console.log(idx)
            console.log(!e[idx])
            return !e[idx];
        })
        // console.log(newList)
        currentList = newList;
        element.remove();
        setLocalStorage();
        setupEmptyList();
    }
}
// Delete all todo blocks from list
function deleteAll() {
    currentList = [];
    localStorage.clear();
    while (todoList.firstChild) {
        todoList.removeChild(todoList.firstChild);
    }
    setupEmptyList();
}
// Save to local storage
function setLocalStorage(){
    localStorage.clear();
    localStorage.setItem('todoList', JSON.stringify(currentList));
    localStorage.setItem('todoListIdx', counter);
}
// Get from local storage
function getLocalStorage(){
    counter = localStorage.getItem('todoListIdx') ? localStorage.getItem('todoListIdx') : 0;
    counter = Number.parseInt(counter);
    currentList = localStorage.getItem('todoList') ? localStorage.getItem('todoList') : [];
    if(currentList.length) currentList = JSON.parse(currentList);
    console.log(currentList)
}

// Check if list is empty
function isListEmpty(list) {
    if(list instanceof HTMLElement) {
       return list.childElementCount == 0;
    }
}