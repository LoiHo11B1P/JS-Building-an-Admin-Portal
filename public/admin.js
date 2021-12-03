
// Your Code Here
async function getBookList() {
    let response = await fetch('http://localhost:3001/listBooks');
    let bookList = await response.json();

    bookList.forEach(displayBookList);
}

function displayBookList(book) {
    let bookAdminContainer = document.querySelector('#admin-list')
    bookAdminContainer.innerHTML += `
        <li class="row py-1" id="${'bookContainer'+book.id}">
            <label class="col-2" for="${'bookId'+book.id}">${book.title}</label>
            <input class="col-2" id="${'bookId'+book.id}" value="${book.quantity}"/>
            <button class="col-1 mx-1 btn btn-primary" type="button" onClick="saveToInventory(${book.id})">Save</button>
            <button  type="button" class="btn btn-danger col-2" onClick="removeBook(${book.id})">Remove</button>
        </li>
    `
}

getBookList();

async function saveToInventory(bookId) {
    let idSelector = '#bookId'+bookId;
    let quantity = document.querySelector(idSelector).value
    //console.log(idSelector)
    //console.log(quantity)

    const response = await fetch('http://localhost:3001/updateBook', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "id": bookId,
            "quantity": quantity 
        })
    })

    const result = await response.json();
    //console.log(result)
    if(result.error) {
        alert(result.message)
    } else {
        alert("Successfully save!")
    }
}

async function removeBook(bookId) {
    //
    console.log(bookId)
    const response = await fetch(`http://localhost:3001/removeBook/${bookId}`,{
        method: 'DELETE',
    })

    const result = await response.json();
    console.log(result)
    if(result.error) {
        alert(result.message);
    } else {
        let idSelector = '#bookContainer'+bookId;
        let itemToRemove = document.querySelector(idSelector);
        itemToRemove.remove();
        alert('Book removed successfully!');
    }
}

async function addNewBook() {
    event.preventDefault()
    console.log("adding book")

    let bookTitle = document.querySelector("#new-book-title").value;
    let bookDescription = document.querySelector("#book-discription").value;
    let bookImgUrl = document.querySelector("#book-img-url").value;
    let quantity =  document.querySelector("#book-quantity").value;

    const response = await fetch("http://localhost:3001/addBook", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "title": bookTitle,
            "description": bookDescription,
            "imageURL": bookImgUrl,
            "quantity": quantity
        })
    })
     const result = await response.json()

     if(result.error) {
         alert(result.message)
     } else {
         console.log(result)
         displayBookList(result)
     }
}