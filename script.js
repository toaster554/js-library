function Library() {
    this.books = [];

    this.addBook = function(book) {
        book.id = this.books.length;
        this.books.push(book);
    }
}

let myLibrary = new Library();

function Book(title, author, pages, read=false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function() {
        return `${title} by ${author}, ${pages} pages, ${read ? "have read" : "have not read"}.`;
    };
}

function toggleReadStatus(bookID) {
    let bookCard = document.querySelector(`#book-${bookID}`);
    let hasRead = myLibrary.books[bookID].read;

    if (hasRead) {
        bookCard.classList.remove("bg-success");
        bookCard.classList.add("bg-light");
        bookCard.children[0].children[3].classList.remove("btn-outline-danger");
        bookCard.children[0].children[3].classList.add("btn-outline-success");
        bookCard.children[0].children[3].innerHTML = "Read";
    } else {
        bookCard.classList.remove("bg-light");
        bookCard.classList.add("bg-success");
        bookCard.children[0].children[3].classList.remove("btn-outline-success");
        bookCard.children[0].children[3].classList.add("btn-outline-danger");
        bookCard.children[0].children[3].innerHTML = "Unread";
    }

    myLibrary.books[bookID].read = !hasRead;
}

function createBookCard(book) {
    let card = document.createElement('div');
    card.setAttribute('id', `book-${book.id}`);
    card.setAttribute('class', `card ${book.read ? "bg-success" : "bg-light"}`);

    let cardBody = document.createElement('div');
    cardBody.setAttribute('class', 'card-body');

    let cardTitle = document.createElement('h4');
    cardTitle.setAttribute('class', 'card-title');
    cardTitle.innerHTML = `<b>${book.title}<b>`;
    cardBody.appendChild(cardTitle);

    let cardAuthor = document.createElement('p');
    cardAuthor.setAttribute('class', 'card-text');
    cardAuthor.innerHTML = `by ${book.author}`;
    cardBody.appendChild(cardAuthor);

    let cardNumPages = document.createElement('div');
    cardNumPages.setAttribute('class', 'btn btn-outline-primary active');
    cardNumPages.setAttribute('style', 'cursor: default');
    cardNumPages.innerHTML = `Pages: <span class="badge badge-light"> ${book.pages}</span>`;
    cardBody.appendChild(cardNumPages);

    let readBtn = document.createElement('button');
    readBtn.setAttribute('class', `read-btn btn btn-sm ${book.read ? 'btn-outline-danger' : 'btn-outline-success'}`);
    readBtn.setAttribute('style', 'position: absolute; right: 0; bottom: 0; margin: 10px');
    readBtn.innerHTML = book.read ? "Unread" : "Read";
    cardBody.appendChild(readBtn);

    card.appendChild(cardBody);
    return card;
}

function handleAddBook(event) {
    event.preventDefault();

    let title = document.forms["addBookForm"]["title"].value;
    let author = document.forms["addBookForm"]["author"].value;
    let pages = parseInt(document.forms["addBookForm"]["pages"].value);

    if (title === "" || author === "" || isNaN(pages)) return;
    
    let newBook = new Book(title, author, pages);
    myLibrary.addBook(newBook);

    let cardDeck = document.querySelector('.card-deck');
    let bookCard = createBookCard(newBook);
    bookCard.children[0].children[3].addEventListener('click', () => toggleReadStatus(newBook.id));
    cardDeck.appendChild(bookCard);

    document.forms["addBookForm"]["title"].value = "";
    document.forms["addBookForm"]["author"].value = "";
    document.forms["addBookForm"]["pages"].value = "";
}

let book1 = new Book('A book', 'John', 20, true);
let book2 = new Book('A second book', 'Jim', 100, false);
let book3 = new Book('A third book?', 'Joe', 75, false);
let book4 = new Book('A fourth book!', 'Jack', 999, true);

myLibrary.addBook(book1);
myLibrary.addBook(book2);
myLibrary.addBook(book3);
myLibrary.addBook(book4);

let cardDeck = document.querySelector('.card-deck');

myLibrary.books.forEach(book => {
    let bookCard = createBookCard(book);
    bookCard.children[0].children[3].addEventListener('click', () => toggleReadStatus(book.id));
    cardDeck.appendChild(bookCard);
});

let addBookForm = document.querySelector('#add-book-form');
addBookForm.addEventListener('submit', (e) => handleAddBook(e));

console.log("new page");
