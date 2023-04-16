const PurchaseList = document.getElementById('Purchaselist');

function addItems(event){
    event.preventDefault();
    const item = document.getElementById('item').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const quantity = document.getElementById('quantity').value;
    const total = document.getElementById('total').value;

    const obj ={
        item,
        description,
        price,
        quantity,
        total
    }

    const items = item +" "+ description +" "+price+ " " +quantity+ " "+total;
    
    // // store values in local storage
    localStorage.setItem("item", item);
    localStorage.setItem("description", description);
    localStorage.setItem("price", price);
    localStorage.setItem("quantity", quantity);
    localStorage.setItem("total", total);


    // creating list
        const li = document.createElement("li");
        li.innerText= items;
    
    
        // create edit and delete buttons
    const editButton = document.createElement("button");
    editButton.innerText = " Edit ";
    editButton.setAttribute("id","edit");
    editButton.addEventListener("click", () => editItem(li));
    
    const deleteButton = document.createElement("button");
    deleteButton.innerText = " Delete ";
    deleteButton.setAttribute("id", "delete");
    deleteButton.addEventListener("click", () => deleteItem(li));

// append buttons on list
    li.appendChild(editButton);
    li.appendChild(deleteButton);

        // append list on ul
        PurchaseList.appendChild(li);    

        axios.post("https://crudcrud.com/api/77a5a29044df4f0784d009d647804f41/storeData", obj)
                    .then((respone) => {
                        //showNewUserOnScreen(respone.data)
                        console.log(respone)
                    })
                    .catch((err)=> {
                        document.body.innerHTML = document.body.innerHTML  + "<h4> Something went wrong </h4>"
                        console.log(err)
                    })

    // clear the input field
        document.getElementById("item").value="";
        document.getElementById("description").value="";
        document.getElementById("price").value="";
        document.getElementById("quantity").value="";
        document.getElementById("total").value="";
}

function saveToLocalStorage(event){
    event.preventDefault();
    

    addItems(event)
}

window.addEventListener("DOMContentLoaded", () => {
    const localStorageObj = localStorage;
    const localstoragekeys = Object.keys(localStorage)

    for(var i=0; i<localstoragekeys.length; i++)
    {
        const key = localstoragekeys[i]
        const userDetailsString = localStorageObj[key];
        const userDetailsObj = JSON.stringify(userDetailsString);
        addItems(userDetailsObj)
    }
})
