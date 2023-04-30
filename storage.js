const form = document.querySelector('form');
const itemInput = document.querySelector('#item');
const desInput = document.querySelector('#description');
const priInput = document.querySelector('#price');
const qntyInput = document.querySelector('#quantity');
const totlInput= document.querySelector('#total');
const plist = document.querySelector('#Purchaselist');
const BASE_URL = 'https://crudcrud.com/api/6fcc9dc604994a1489bf063bc4c71017/StorageData';

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
    //id is for local storage
    //id: Date.now() 
};
axios.post(BASE_URL, userData)
.then(() => {
    displayData();
    clearInputs();
})
.catch((error) => {
    console.log(error);
});

//adding details to local storage
// let storedData = JSON.parse(localStorage.getItem('userData')) || [];
// storedData.push(userData);
// localStorage.setItem('userData', JSON.stringify(storedData));

// displayData();
// clearInputs();

});

//functionality to display data in a local storage

function displayData() {
    
    axios.get(BASE_URL)
    .then((response) =>{
        let data = "";
    response.data.forEach((user) => {
      data += `<ul> <li> Item : ${user.item}</li>
          <li> Description : ${user.des}</li>
          <li> Price : ${user.pri}</li>
          <li> Quantity : ${user.qnty}</li>
          <li>Total : ${user.totl}</li> </ul>
          <button class="edit-btn" data-id="${user._id}"> Edit </button>
          <button class="delete-btn" data-id="${user._id}"> Delete </button>
          <hr>`;

          //for local storage button in data += is data-id="${user.id}"
    });
    plist.innerHTML = data;
    addDeleteEventListeners();
    addEditEventListeners();

    })
    .catch((error) => {
        console.log(error);
    });
    //const storedData = JSON.parse(localStorage.getItem("userData")) || [];
    // let data = "";
    // storedData.forEach((user) => {
    //   data += `<ul> <li> Item : ${user.item}</li>
    //       <li> Description : ${user.des}</li>
    //       <li> Price : ${user.pri}</li>
    //       <li> Quantity : ${user.qnty}</li>
    //       <li>Total : ${user.totl}</li> </ul>
    //       <button class="edit-btn" data-id="${user.id}"> Edit </button>
    //       <button class="delete-btn" data-id="${user.id}"> Delete </button>
    //       <hr>`;
    // });
    // plist.innerHTML = data;
    // addDeleteEventListeners();
    // addEditEventListeners();
  }
  

//deletebutton function
  function addDeleteEventListeners() {
    const deleteBtns = document.querySelectorAll('.delete-btn');
    deleteBtns.forEach((btn) => {
          btn.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id')
            axios.delete(`${BASE_URL}/${id}`)
            .then(() => {
                displayData();
             })
           .catch((error) => {
            console.log(error);
           });
          });
        });

    //for local storage
    // deleteBtns.forEach((btn, index) => {
    //   btn.addEventListener("click", () => {
    //     const storedData = JSON.parse(localStorage.getItem("userData")) || [];
    //     storedData.splice(index, 1);
    //     localStorage.setItem("userData", JSON.stringify(storedData));
    //     displayData();
    //   });
    // });
  }
  
  //edit or update for axios
  function addEditEventListeners(){
    const editBtns = document.querySelectorAll(".edit-btn");
    editBtns.forEach((btn) => {
            btn.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            axios.get(`${BASE_URL}/${id}`)
            .then((response) => {
                const user= response.data;
                axios.delete(`${BASE_URL}/${id}`)
                .then(() => {
            itemInput.value = user.item;
            desInput.value = user.des;
            priInput.value = user.pri;
            qntyInput.value = user.qnty;
            totlInput.value = user.totl;
            displayData();

                })
                .catch((error) => {
                    console.log(error);
                });
            
            })
            .catch((error) => {
                console.log(error);
            });
        });
    });
  }


//edit for local storage
// function addEditEventListeners(){
//     const editBtns = document.querySelectorAll(".edit-btn");
//     editBtns.forEach((btn) => {
//             btn.addEventListener('click', (e) => {
//             const id = e.target.getAttribute('data-id');
//             const storedData = JSON.parse(localStorage.getItem('userData')) || [];
//             const user= storedData.find((user) =>user.id == id);
//             const updatedData= storedData.filter((user) => user.id != id);
//             localStorage.setItem('userData', JSON.stringify(updatedData));

//             itemInput.value = user.item;
//             desInput.value = user.des;
//             priInput.value = user.pri;
//             qntyInput.value = user.qnty;
//             totlInput.value = user.totl;
//             displayData();
//         });
//     });
// }

  

function clearInputs(){
    itemInput.value = '';
    desInput.value = '';
    priInput.value = '';
    qntyInput.value = '';
    totlInput.value = '';

}

//call displayData function on page load
displayData();

