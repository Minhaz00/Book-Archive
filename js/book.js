const resultContainer = document.getElementById('result-div');
const inputField = document.getElementById('search-book');

//function to find data
const searchData = () => {
    const searchText = inputField.value;
    inputField.value = '';
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => showResult(data));
}

//function to show results
const showResult = (books) => {
    //cleaning previous results
    resultContainer.innerText = '';
    // console.log(books);
    books.docs.forEach(book => {
        //1. cover image
        let coverImg;
        if (!book.cover_i) {
            coverImg = '/image/blank-book.jpg';
        }
        else {
            coverImg = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
        }
        // Book Author
        let bookAuthor;
        if (!book.author_name) {
            bookAuthor = ' ';
        } else {
            bookAuthor = `By <span class="text-danger fw-bold">${book.author_name[0]}</span>`;
        }
        // First pushlish year
        let publishYear = `First published in: ${book.first_publish_year}`;
        if (!book.first_publish_year) {
            publishYear = ' ';
        }
        // Publisher
        let publisher;
        if (!book.publisher) {
            publisher = ' ';
        }
        else {
            publisher = `Publisher: ${book.publisher[0]}`;
        }
        
        //Result card
        const card = document.createElement('div');
        card.classList.add('col');
        card.innerHTML = `
            <div class="card h-100">
                <img src="${coverImg}" class="card-img-top book-img" alt="..." />
                <div class="card-body">
                    <h5 class="card-title">${book.title}</h5>
                    <p class="mb-1">${bookAuthor}</p>
                    <p class="text-">${publisher}</p>
                    <small class="text-secondary">${publishYear}</small>
                    
                </div>
            </div>
        `;

        //appending child to parents
        resultContainer.appendChild(card);
    });

    //show result status
    const status = document.getElementById('result-status');
    if (books.numFound === 0) {
        status.innerText = 'No result Found!';
    }
    else {
        status.innerText = `Showing ${books.docs.length} results out of ${books.numFound}`;
    }
};



