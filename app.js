// Book Class: Represents a Book
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// UI Class: Handle UI Tasks
class UI {
  static displayBooks() {
    const storedBooks = [
      {
        title: "Book One",
        author: "John Doe",
        isbn: "123",
      },
      {
        title: "Book Two",
        author: "Jane Doe",
        isbn: "456",
      },
      {
        title: "Book Three",
        author: "Joe Doe",
        isbn: "789",
      },
    ];

    const books = storedBooks;
    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector("#book-list");
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;
    list.appendChild(row);
  }

  static deleteBook(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.remove();
    }
  }

  static clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
  }

  static showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");
    container.insertBefore(div, form);
    setTimeout(() => document.querySelector(".alert").remove(), 3000);
  }

  static storeBook(book) {
    const books = UI.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }

  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }
}

// Store Class: Handles Storage

class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();
    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem("books", JSON.stringify(books));
  }
}

// Event: Display Books
document.addEventListener("DOMContentLoaded", UI.displayBooks);

// Event: Add a Book to the List
document.querySelector("#book-form").addEventListener("submit", (e) => {
  // Prevent actual submit
  e.preventDefault();
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const isbn = document.querySelector("#isbn").value;

  // Validate
  if (title === "" || author === "" || isbn === "") {
    UI.showAlert("Please fill in all fields", "danger");
  } else {
    // Instantiate book
    const book = new Book(title, author, isbn);
    // Add book to UI
    UI.addBookToList(book);

    // Add book to store
    Store.addBook(book);

    // remove book from UI

    // Show success message
    UI.showAlert("Book Added!", "success");
    // Clear fields
    UI.clearFields();
  }

  //   console.log(book);
  localStorage.setItem("books", JSON.stringify(Book));
});

// Event: Remove a Book from the List
document.querySelector("#book-list").addEventListener("click", (e) => {
  UI.deleteBook(e.target);
});
