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
});