// This is Es5 version

// Book Constructor
function Book(title, author, isbn){
    this.title = title, 
    this.author = author,
    this.isbn = isbn
}

// UI Constructor
function UI() {}

// Add Book to List
UI.prototype.addBookToList = function(book){
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

// Show Alert
UI.prototype.showAlert = function(message, className){
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

// Delete Book
UI.prototype.deleteBook = function(target){
    if (target.className === 'delete'){
        target.parentElement.parentElement.remove();
    }
}

// Clear Fields
UI.prototype.clearFields = function(){
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
}


 
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
        ui.addBookToList(book);
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
    // Show Message
    ui.showAlert("Book Removed!", "success");
    e.preventDefault();
})