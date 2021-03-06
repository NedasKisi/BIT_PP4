const text = document.getElementById("text");
const addItemButton = document.getElementById("add__item");
const saveItemButton = document.getElementById("save__item");
const listBox = document.getElementById("listBox");
const saveInd = document.getElementById("saveIndex");

let currentIndex = 0;

let itemsArray = [];

// Helper funkcijos
const getItems = () => localStorage.getItem("shopItem");

addItemButton.addEventListener("click", (e) => {
   e.preventDefault();
   itemsArray = getItems() ? JSON.parse(getItems()) : [];
   itemsArray.push({value: text.value, done: false});
   text.value = "";
   localStorage.setItem("shopItem", JSON.stringify(itemsArray));
   readItems();
});

function readItems() {
   itemsArray = getItems() ? JSON.parse(getItems()) : [];
   currentIndex = itemsArray.length;

   let htmlCode = "";
   itemsArray.forEach((item, ind) => {
     htmlCode += 
     `
     <div class='itemsLi'>
     <input onchange='toggle(${ind})' type='checkbox' id=check-${ind} ${item.done ? 'checked' : ''}>
     <p class='itemText'>${item.value}</p>
     <button onclick='edit(${ind})' class='edit__button'><i class="fa fa-pencil-square-o fa-2x" aria-hidden="true" id="edit__icon"></i></button>
     <button onclick='deleteshopItem(${ind})' class='deleteButton'><i class="fa fa-trash fa-2x" aria-hidden="true" id="bin__icon"></i></button>
     </div>
     `;
   });
   listBox.innerHTML = htmlCode;
}

function deleteshopItem(ind) {
   itemsArray.splice(ind, 1);
   localStorage.setItem("shopItem", JSON.stringify(itemsArray));
   readItems();
}

function edit(ind) {
   currentIndex = ind;
   text.value = itemsArray[ind].value;
   addItemButton.style.display = "none";
   saveItemButton.style.display = "inline";
}

function toggle(ind) {
   itemsArray[ind].done = !itemsArray[ind].done;
   localStorage.setItem("shopItem", JSON.stringify(itemsArray));
}

saveItemButton.addEventListener("click", () => {
   itemsArray[currentIndex] = {value: text.value, done: false};
   addItemButton.style.display = "inline";
   saveItemButton.style.display = "none";
   text.value = "";
   localStorage.setItem("shopItem", JSON.stringify(itemsArray));
   readItems();
});

readItems()