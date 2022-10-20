const form = document.querySelector("form");
const input = document.querySelector("#txtTaskName");
const btnDeleteAll = document.querySelector("#btnDeleteAll");
const taskList = document.querySelector("#task-list");
let items;

//load items

loadItems();

eventListeners();
function createItem(text) {
  /*Creating li*/
  const li = document.createElement("li");
  li.className = "list-group-item list-group-item-secondary";
  li.appendChild(document.createTextNode(text));
  /*Creating a*/
  const a = document.createElement("a");
  a.className = "delete-item float-right";
  a.setAttribute("href", "#");
  a.innerHTML = '<i class ="fas fa-times"></i>';
  /*li to a*/
  li.appendChild(a);
  /*Add task ul to li*/
  taskList.appendChild(li);
}
function loadItems() {
  items = getItemsFromLocal();
  items.forEach(function (item) {
    createItem(item);
  });
}

function getItemsFromLocal() {
  if (localStorage.getItem("items") === null) {
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem("items"));
  }
  return items;
}

function setItemToLocal(text) {
  items = getItemsFromLocal();

  items.push(text);
  localStorage.setItem("items", JSON.stringify(item));
}
function deleteItemFromLocal(text) {
  items = getItemsFromLocal();
  items.forEach(function (items, index) {
    if (item === text) {
      items.splice(index, 1);
    }
  });
  localStorage.setItem("items", JSON.stringify(items));
}
function eventListeners() {
  form.addEventListener("submit", addNewItem);

  taskList.addEventListener("click", deleteItem);

  btnDeleteAll.addEventListener("click", deleteAllItems);
}
//Adding
function addNewItem(e) {
  if (input.value === "") {
    alert("Please add item first!");
  }
  //create item
  createItem(input.value);

  //save local
  setItemToLocal(input.value);

  /*Clear input text*/
  input.value = "";

  e.preventDefault;
}

//Deleting
function deleteItem(e) {
  if (e.target.className === "fas fa-times") {
    if (confirm("Are you sure about deleting?")) {
      e.target.parentElement.parentElement.remove();

      //delete from local
      deleteItemFromLocal(e.target.parentElement.parentElement(textContent));
    }
  }

  e.preventDefault();
}

//Delete All Items
function deleteAllItems(e) {
  if (confirm("Are you sure about deleting all tasks?")) {
    //taskList.innerHTML='';

    taskList.childNodes.forEach(function (item) {
      if (item.nodeType === 1) {
        item.remove();
      }
    });
    localStorage.clear();
  }
  e.preventDefault();
}
