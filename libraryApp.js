setName();
let bookList = [];
let lendBookList = [];
if (JSON.parse(localStorage.getItem("Book list")) != null) {
  bookList = JSON.parse(localStorage.getItem("Book list"));
}
if (JSON.parse(localStorage.getItem("Lend Book list")) != null) {
  lendBookList = JSON.parse(localStorage.getItem("Lend Book list"));
}


if (localStorage.getItem("library Name") == null) {
  document.getElementById('libNameSetButt').addEventListener("click", function () {
    let LibraryNameInput = document.getElementById('libNameInput');
    localStorage.setItem("library Name", LibraryNameInput.value);
    setName();
  })
}
else {
  showBook();
}

function setName() {
  let libraryName = localStorage.getItem("library Name");
  if (libraryName != null) {
    let libraryNameElement = document.getElementById('LibraryName');
    libraryNameElement.innerText = libraryName;
    let UpdateBodyContent = document.getElementById('bodycontent');
    UpdateBodyContent.innerHTML = `<h1 style="text-align: center; margin: 30px;">Welcome to ${libraryName}</h1>
      <div class="container">
        <div class="row">
          <div class="col-4">
            <div class="list-group" id="list-tab" role="tablist">
              <a class="list-group-item list-group-item-action active" id="list-home-list" data-bs-toggle="list" href="#list-home" role="tab" aria-controls="list-home">Add Book</a>
              <a class="list-group-item list-group-item-action" id="list-profile-list" data-bs-toggle="list" href="#list-profile" role="tab" aria-controls="list-profile">Lend Book</a>
              <a class="list-group-item list-group-item-action" id="list-messages-list" data-bs-toggle="list" href="#list-messages" role="tab" aria-controls="list-messages">Return Book</a>
            </div>
          </div>
          <div class="col-8">
            <div class="tab-content" id="nav-tabContent">
              <div class="tab-pane fade show active" id="list-home" role="tabpanel" aria-labelledby="list-home-list">
                <form>
                <div class="row mb-3">
                  <label for="BookNameInput" class="col-sm-2 col-form-label">Book Name</label>
                  <div class="col-sm-10">
                    <input type="text" class="form-control" id="BookNameInput">
                  </div>
                </div>
                <div class="row mb-3">
                  <label for="authorNameInput" class="col-sm-2 col-form-label">Author Name</label>
                  <div class="col-sm-10">
                    <input type="text" class="form-control" id="authorNameInput">
                  </div>
                </div>
                <button type="submit" id="AddBookButt" onclick="addBook()" class="btn btn-primary">Add</button>
              </form>
            </div>
              <div class="tab-pane fade" id="list-profile" role="tabpanel" aria-labelledby="list-profile-list">
                <form>
                <div class="row mb-3">
                  <label for="studentBookInput" class="col-sm-2 col-form-label">Book Name</label>
                  <div class="col-sm-10">
                    <input type="text" class="form-control" id="studentBookInput">
                  </div>
                </div>
                <div class="row mb-3">
                  <label for="studentNameInput" class="col-sm-2 col-form-label">student Name</label>
                  <div class="col-sm-10">
                    <input type="text" class="form-control" id="studentNameInput">
                  </div>
                </div>
                <button type="submit" id="lendBookButt" onclick="lendBook()" class="btn btn-primary">Done</button>
              </form>
            </div>
              <div class="tab-pane fade" id="list-messages" role="tabpanel" aria-labelledby="list-messages-list">
                <form>
                <div class="row mb-3">
                  <label for="returnBookInput" class="col-sm-2 col-form-label">Book Name</label>
                  <div class="col-sm-10">
                    <input type="text" class="form-control" id="returnBookInput">
                  </div>
                </div>
                <div class="row mb-3">
                  <label for="returnStudentInput" class="col-sm-2 col-form-label">Student Name</label>
                  <div class="col-sm-10">
                    <input type="text" class="form-control" id="returnStudentInput">
                  </div>
                </div>
                <button type="submit" id="returnBookButt" onclick="returnBook()"  class="btn btn-primary">Done</button>
              </form>
            </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container my-3">
        <div class="card text-center ">
          <div class="card-header">
            <ul class="nav nav-tabs card-header-tabs">
              <li class="nav-item">
                <a class="nav-link " onclick="showBook()"  id="viewBookButt" aria-current="true" href="#">View Books</a>
              </li>
              <li class="nav-item">
                <a class="nav-link " onclick="showLendBook()" id="lendStudentButt" href="#">View Lend Students</a>
              </li>
              <li id="searchBar">
              <form class="d-flex">
              <input class="form-control me-2" type="search" placeholder="Search" id="searchBarInput" aria-label="Search">
              <button class="btn btn-outline-success" type="submit">Search</button>
              </form>
              </li>
            </ul>
          </div>
          <div class="card-body">
            <h5 class="card-title">List Of All Books</h5>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">SN.</th>
                  <th scope="col">Book</th>
                  <th scope="col"></th>
                  <th scope="col">Author</th>
                </tr>
              </thead>
              <tbody id="TableBody">
              </tbody>
            </table>
          </div>
        </div>
      </div>`;
  }
}

function addBook() {
  let bookName = document.getElementById('BookNameInput').value;
  let AuthorName = document.getElementById('authorNameInput').value;
  let book = [bookName, AuthorName];
  bookList.push(book);
  localStorage.setItem("Book list", JSON.stringify(bookList));
  document.getElementById('alert').innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
    <strong>Successfully </strong>you have Added the book!Thank you.
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`;
  showBook();
}


function showBook() {
  document.getElementById('viewBookButt').className = "nav-link active";
  document.getElementById('lendStudentButt').className = "nav-link";
  let tablebody = document.getElementById('TableBody');
  let tableBodyhtml = "";
  if (bookList.length <= 0) {
    tablebody.innerHTML = tableBodyhtml;
  }
  for (let i = 0; i < bookList.length; i++) {
    tableBodyhtml += ` <tr class="book">
           <th scope="row">${i}</th>
           <td >${bookList[i][0]}</td>
           <td></td>
           <td>${bookList[i][1]}</td>
           </tr>`;
    tablebody.innerHTML = tableBodyhtml;
  }
}


function lendBook() {
  let bookName = document.getElementById('studentBookInput').value;
  let studentName = document.getElementById('studentNameInput').value;
  let presence = false;
  for (let i = 0; i < bookList.length; i++) {
    if (bookList[i][0] === bookName) {
      lendBookList.push([bookName, studentName, bookList[i][1]]);
      bookList.splice(i, 1);
      localStorage.setItem("Book list", JSON.stringify(bookList));
      localStorage.setItem("Lend Book list", JSON.stringify(lendBookList));
      showBook();
      document.getElementById('alert').innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
    <strong>Successfully </strong>you have purchase this book!Thank you.
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`;
      presence = true;
      break;
    }
  }
  if (presence === false) {
    document.getElementById('alert').innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
    <strong>I Am Sorry !</strong>Either it was already given to any student or book not present in your library.
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`;
  }
}

function showLendBook() {
  document.getElementById('lendStudentButt').className = "nav-link active";
  document.getElementById('viewBookButt').className = "nav-link";
  let tablebody = document.getElementById('TableBody');
  let tableBodyhtml = "";
  if (lendBookList.length <= 0) {
    tablebody.innerHTML = tableBodyhtml;
  }
  for (let i = 0; i < lendBookList.length; i++) {
    tableBodyhtml += ` <tr class="book">
      <th scope="row">${i}</th>
      <td >${lendBookList[i][0]}</td>
      <td></td>
      <td>${lendBookList[i][1]}</td>
       </tr>`;
    tablebody.innerHTML = tableBodyhtml;
  }
}


function returnBook() {
  let bookName = document.getElementById('returnBookInput').value;
  let studentName = document.getElementById('returnStudentInput').value;
  let presence = false;
  for (let i = 0; i < lendBookList.length; i++) {
    if (lendBookList[i][0] === bookName && lendBookList[i][1] === studentName) {
      bookList.push([bookName, lendBookList[i][2]]);
      lendBookList.splice(i, 1);
      localStorage.setItem("Book list", JSON.stringify(bookList));
      localStorage.setItem("Lend Book list", JSON.stringify(lendBookList));
      showBook();
      document.getElementById('alert').innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
       <strong>Successfully </strong>you have returned this book ! Thank you.
       <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
       </div>`;
      presence = true;
      break;
    }
  }
  if (presence === false) {
    document.getElementById('alert').innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
      <strong>I Am Sorry!</strong>Either it was already return or you give something wrong info.
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`;
  }
}

function Destroy() {
  let a = confirm("This will delete your all Data of Current Library");
  if (a) {
    localStorage.clear();
    document.location.reload();
  }
}

// search bar code
let searchText = document.getElementById('searchBarInput')
searchText.addEventListener("input", function () {
  let Allbook = document.getElementsByClassName('book');
  Array.from(Allbook).forEach(function (element) {
    let bookname = element.getElementsByTagName('td')[0].innerText;
    if (bookname.includes(searchText.value)) {
      element.style.opacity = "1";
    }
    else {
      element.style.opacity = "0";
    }
  })
})

