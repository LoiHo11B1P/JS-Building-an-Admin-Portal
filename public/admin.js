
// Your Code Here
async function getBookList() {
    let response = await fetch('http://localhost:3001/listBooks');
    let bookList = await response.json();

    bookList.forEach(displayBookList);
}

function displayBookList(book) {
    let bookAdminContainer = document.querySelector('#admin-list')
    bookAdminContainer.innerHTML += `
        <li>
            <label for="${'bookId'+book.id}">${book.title}</label>
            <input id="${'bookId'+book.id}" value="${book.quantity}"/>
            <button onClick="saveToInventory(${book.id})">Save</button>
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
    console.log(result)
}