const SEARCH_API = "https://openlibrary.org/search.json";
const COVERS_API = "https://covers.openlibrary.org/b";
const DB_NAME = "library_db";
const DB_VERSION = 1;
const STORE_NAME = "books" ;
const MAX_RESULTS = 10;

const searchInput = document.getElementById("searchl-input") ;
const searchBtn = document.getElementById("search-btn");
const resultsBody = document.getElementById("results-body");
const libraryBody = document.getElementById("library-body");
const loadingEl =  document.getElementById("loading");
const errorEl = document.getElementById("error-message");
const searchViewBtn = document.getElementById("search-view-btn");
const libraryViewBtn = document.getElementById("library-view-btn");
const searchSection = document.getElementById("search-section");
const librarySection = document.getElementById("library-section");
const bookRowTemplate = document.getElementById("bool-row-template");

const authorInput = document.getElementById("author");
const languageSelect = document.getElementById("language");
const subjectInput = document.getElementById("subject")
const publisherInput = document.getElementById("publisher")


window.addEventListener("DOMContentLoaded",() =>{
    languageSelect.value = "eng";
})
let db;
const initDB = () => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    
    request.onerror =(event) => {
        const db = event.target.result;
        if(!db.objectStoreNames.container(STORE_NAMES)) {
            db.createObjectStore(STORE_NAME, { keyPath: "key"});
        }
    };

    request.onsuccess = (event) => {
        db = event.target.result;
        console.info("Success!");
    };
};
const searchBooks = async () => {
    const searchTerm = searchInput.value.trim();
    if(!searchTerm) return;
    const params = new URLSearchParams();params.append("q", searchTerm);
    params.append("limit",MAX_RESULTS.toString());
    params.append("language", "eng");

    params.append("author", authorInput.value.trim());

    const additionalParams = {
        author: authorInput.value.trim(),
        subject: subjectInput.value.trim(),
        publisher: publisherInput.value.trim(),

    };
    Object.entries(additionalParams).forEach(([key,value]) => {
        if(value) {
            params.append(key,value);
        }
    });
    try {
        console.log("Library search for:", `${SEARCH_API}?${params}`);
        const response = await fetch(`${SEARCH_API}?${params}`);
        if(!response.ok){
            console.error(`HTTP error! status: ${response.status}`);
            throw new Error(`HTTP error! status: $(response.status)`);
        }
        const data = await response.json();
        const limitDocs = data.docs.slice(0, MAX_RESULTS);
    }catch (error){
    } finally {
    } 
};
const displaySearchResults = (books) => {
    if(!books || books.length == 0){
        return;
    }
    resultsBody.innerHTML = "";
    books.forEach((books,index) => {
        const row = createBooksRow(bookRowTemplate,index+1,false);
        resultsBody.appendChild(row);
    });
};
const createBooksRow = (book, id, isLibraryView=false){
    const row = bookRowTemplate.content.cloneNode(true);

    row.querySelector(".book-id").textContent = id;
    row.querySelector(".book-title").textContent = book.title;
    row.querySelector(".book-author").textContent = `Author: ${
        book.author_name?.[0] || "Unknown"
    }`;
    row.querySelector(".book-year").textContent = `Year: ${
        book.first_publish_year || "Unknown"
    }`;
    row.querySelector(".book-pages").textContent = `Pages: ${
        book.number_of_pages_median || "Unknown"
    }`;
    row.querySelector(".book-description").textContent = 
        book.description || "No description available";
        
};

initDB();
