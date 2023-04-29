const form = document.querySelector('form');
const itemInput = document.querySelector('#item');
const desInput = document.querySelector('#description');
const priInput = document.querySelector('#price');
const qntyInput = document.querySelector('#quantity');
const totlInput= document.querySelector('#total');
const plist = document.querySelector('#Purchaselist');

form.addEventListener('submit', (e) => {
    e.preventDefault();
const item = itemInput.value;
const des = desInput.value;
const pri = priInput.value;
const qnty = qntyInput.value;
const totl = totlInput.value;

const userData = {
    item,
    des,
    pri,
    qnty,
    totl,
    id: Date.now()
};

//adding details to local storage
let storedData = JSON.parse(localStorage.getItem('userData')) || [];
storedData.push(userData);
localStorage.setItem('userData', JSON.stringify(storedData));

displayData();
clearInputs();

});

//functionality to display data in a local storage

function displayData() {
    const storedData = JSON.parse(localStorage.getItem("userData")) || [];
    let data = "";
    storedData.forEach((user) => {
      data += `<ul> <li> Item : ${user.item}</li>
          <li> Description : ${user.des}</li>
          <li> Price : ${user.pri}</li>
          <li> Quantity : ${user.qnty}</li>
          <li>Total : ${user.totl}</li> </ul>
          <button class="edit-btn" data-id="${user.id}"> Edit </button>
          <button class="delete-btn" data-id="${user.id}"> Delete </button>
          <hr>`;
    });
    plist.innerHTML = data;
    addDeleteEventListeners();
    addEditEventListeners();
  }
  

//deletebutton function
  function addDeleteEventListeners() {
    const deleteBtns = document.querySelectorAll(".delete-btn");
    deleteBtns.forEach((btn, index) => {
      btn.addEventListener("click", () => {
        const storedData = JSON.parse(localStorage.getItem("userData")) || [];
        storedData.splice(index, 1);
        localStorage.setItem("userData", JSON.stringify(storedData));
        displayData();
      });
    });
  }
  
  

function addEditEventListeners(){
    const editBtns = document.querySelectorAll(".edit-btn");
    editBtns.forEach((btn) => {
            btn.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            const storedData = JSON.parse(localStorage.getItem('userData')) || [];
            const user= storedData.find((user) =>user.id == id);
            const updatedData= storedData.filter((user) => user.id != id);
            localStorage.setItem('userData', JSON.stringify(updatedData));

            itemInput.value = user.item;
            desInput.value = user.des;
            priInput.value = user.pri;
            qntyInput.value = user.qnty;
            totlInput.value = user.totl;
            displayData();
        });
    });
}

  

function clearInputs(){
    itemInput.value = '';
    desInput.value = '';
    priInput.value = '';
    qntyInput.value = '';
    totlInput.value = '';
}

//call displayData function on page load
displayData();

