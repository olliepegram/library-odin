const booksEl = document.querySelector('.books');
const newBookButton = document.querySelector('.new-book-button');
const bookForm = document.querySelector('.book-form');

let myLibrary = [];

function displayBooks() {
	const bookEl = document.createElement('ul');
	bookEl.classList.add('book-item');
	bookEl.innerHTML = myLibrary
		.map((book, index) => {
			return `<li class='book' data-book-id="${book.id}">
						
                      <h2>${book.title}</h2> <p>Author: ${
				book.author
			}</p> <span>Pages: ${book.pages}</span>
					
                  <div class='buttons'>  <button class='read' data-index=${index}>${
				book.read ? 'Read already' : 'Not read yet'
			}</button> <button class='delete'>Delete</button></div>
                   </li>`;
		})
		.join('');
	booksEl.innerHTML = '';
	booksEl.appendChild(bookEl);

	handleBookRead();

	const deleteButton = document.querySelectorAll('.delete');
	deleteButton.forEach((button) => {
		button.addEventListener('click', removeBook);
	});
}

function removeBook(event) {
	const bookItem = event.target.closest('.book');
	const bookId = Number(bookItem.dataset.bookId);

	myLibrary = myLibrary.filter((book) => {
		return book.id !== bookId;
	});

	displayBooks();
}

function handleBookRead() {
	const readButton = document.querySelectorAll('.read');
	readButton.forEach((button) => {
		button.addEventListener('click', (e) => {
			const index = e.target.dataset.index;
			myLibrary[Number(index)].toggleRead();
			console.log(myLibrary);
			displayBooks();
		});
	});
}

displayBooks();

function Book(title, author, pages, read, id) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
	this.id = id;
}

Book.prototype.toggleRead = function () {
	this.read = !this.read;
};

function addBookToLibrary(title, author, pages, read, id) {
	const newBook = new Book(title, author, pages, read, id);
	myLibrary.push(newBook);

	displayBooks();
}

addBookToLibrary(
	'Why Machines Learn',
	'Anil Anathaswamy',
	500,
	false,
	Math.random()
);
addBookToLibrary(
	'The 48 Laws of Power',
	'Robert Greene',
	713,
	true,
	Math.random()
);
addBookToLibrary('Red Rising', 'Pierce Brown', 416, false, Math.random());
addBookToLibrary('Solo Leveling', 'Chugong', 322, true, Math.random());

newBookButton.addEventListener('click', () => {
	bookForm.style.display = 'block';
});

bookForm.addEventListener('submit', (e) => {
	e.preventDefault();
	addBookToLibrary(
		e.target[0].value,
		e.target[1].value,
		e.target[2].value,
		e.target[3].value,
		Math.random()
	);
});
