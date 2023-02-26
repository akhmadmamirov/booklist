class Book {
    constructor(title, author, isbn){
        this.title = title, 
        this.author = author,
        this.isbn = isbn
    }
}

class UI {
    addBookToList(book){
        console.log(book);
        // Get Book list from HTML
        const list = document.getElementById("book-list")
        // Create Row
        const row = document.createElement("tr")
        // Insert Cols
        row.innerHTML = ` 
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td ><a href="#" class="delete">x<a></td>
        `
        list.appendChild(row);
    }
    showAlert(message, className){
        //  Create Div
        const div = document.createElement('div')
        // Add Classes
        div.className = `alert ${className}`;
        // Add Text
        div.appendChild(document.createTextNode(message))
        // Get Parent
        const container = document.querySelector(".container");
        // Get Form
        const form = document.querySelector("#book-form");
        // Insert Alert
        container.insertBefore(div, form);
        // Disapper after 3 seconds
        setTimeout(function(){
            document.querySelector('.alert').remove()
        }, 3000)
    }
    deleteBook(target){
        if (target.className === 'delete'){
            target.parentElement.parentElement.remove();
        }
    }
    clearFields(){
        document.getElementById("title").value = "";
        document.getElementById("author").value = "";
        document.getElementById("isbn").value = "";
    }
}


// Local Storage Class
class Store {
    static getBooks(){
        let books;
        if (localStorage.getItem("books") === null){
            books = []
        }
        else{
            books = JSON.parse(localStorage.getItem("books"));
        }
        return books;
    }

    static displayBooks(){
        const books = Store.getBooks();
        books.forEach(function(book){
            const ui = new UI();
            // Add book to UI
            ui.addBookToList(book);
        })
    }


    static addBook(book){
        const books = Store.getBooks();
        books.push(book)
        localStorage.setItem("books", JSON.stringify(books))
    }
    static removeBook(isbn){
        const books = Store.getBooks();
        books.forEach(function(book, index){
            if (book.isbn === isbn){
                 books.splice(index, 1);
            }
        })
        localStorage.setItem("books", JSON.stringify(books))
    } 
}

// Dom Loader Event
document.addEventListener("DOMContentLoaded", Store.displayBooks());







// Event Listeners for ADD Book
document.getElementById("book-form").addEventListener("submit", function(e){
    // Get form Values
    const title = document.getElementById("title").value
    const author = document.getElementById("author").value
    const isbn = document.getElementById("isbn").value

    // Instantiate Book
    const book = new Book(title, author, isbn);

    // Instantiate UI
    const ui = new UI();

    // Validation
    if (title == "" || author == "" || isbn==""){
        ui.showAlert("Please fill in all fields", "error")
    }
    else{
        // Add Book to list
        ui.addBookToList(book);

        // Add Book to LS
        Store.addBook(book);

        // Show Success
        ui.showAlert("Book Added!", "success")
        // Clear Fields
        ui.clearFields();  
    }
    e.preventDefault();
})

// Event Listener for delete
document.getElementById("book-list").addEventListener("click", function(e){
    console.log(123)
    // Instantiate UI
    const ui  = new UI();
    // Delete Book
    ui.deleteBook(e.target)

    // Remove from LS
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    // Show Message
    ui.showAlert("Book Removed!", "success");
    e.preventDefault();
})