
class Book{
  constructor(title, author, pages, status){
      this.title = title;
      this.author = author;
      this.pages = pages;
      this.status = status;
  }
}

//store book objects
let library = [];

const modal = document.getElementById("myModal");

// When the user clicks on <span> (x), close the modal
const span = document.querySelector(".close");
span.onclick = function() {
  modal.style.display = "none";
}

//Submit button create book or edits depending on id
const submit = document.querySelector("input[type=submit]");
submit.addEventListener("click", (e)=> {
  e.preventDefault();
  if(submit.id === "add")
    createBook(e);
  else
    updateBook(e);
});

// When the user clicks on the button, open the modal
const btn = document.querySelector(".btn-book");
btn.onclick = function() {
  modal.style.display = "block";
  submit.id = "add";
}

//modal fields
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const radioBtns = document.querySelectorAll("input[type=radio]");

//clear fields in the modal
function clearFields(){
  title.value = "";
  author.value = "";
  pages.value = "";
  radioBtns[0].checked = false;
  radioBtns[1].checked = false;
}

function createBook(e){
  let radioStr = "";

  for(let i = 0; i < radioBtns.length; ++i){
    if (radioBtns[i].checked === true){
      radioStr = radioBtns[i].value ; 
      break;
    }
  }

  library.push(new Book(title.value, author.value, pages.value, radioStr));
  modal.style.display = "none";
  displayBooks();
  clearFields();
}

function deleteBook(e){
  const row = e.target.parentElement.parentElement.parentElement;
  let idNum = parseInt(row.id);
  library.splice(idNum, 1);
  displayBooks();
}

function updateBook(e){
  let idNum = parseInt(submit.id);
  library[idNum].title = title.value;
  library[idNum].author = author.value;
  library[idNum].pages = pages.value;
  if(radioBtns[0].checked === true)
    library[idNum].status = radioBtns[0].value;
  else
  library[idNum].status = radioBtns[1].value;
  modal.style.display = "none";
  displayBooks();
  clearFields();
}

function displayBooks(){
  const tableBody = document.querySelector("tbody");
  tableBody.innerHTML = "";
  for(let i = 0; i < library.length; ++i){
    tableBody.innerHTML += `<tr id="${i}">
    <td>${library[i].title}</td>
    <td>${library[i].author}</td>
    <td>${library[i].pages}</td>
    <td>${library[i].status}</td>
    <td><button class="btn-style edit"><i class="fa fa-pencil" style="font-size:1.4rem"></i></button><button class="btn-style delete"><i class="fa fa-close" style="font-size:1.4rem"></i></button></td>
  </tr>`
  }
  
  //delete row when user clicks delete
  const deleteButtons = document.querySelectorAll(".delete");
  deleteButtons.forEach(btn =>{ 
    btn.addEventListener("click", deleteBook)
  });

  //pull up modal for user to edit row
  const updateButtons = document.querySelectorAll(".edit");
  updateButtons.forEach(btn =>{ 
    btn.addEventListener("click", (e)=>{
      const row = e.target.parentElement.parentElement.parentElement;
      submit.id = row.id;
      let idNum = parseInt(row.id);
      title.value = library[idNum].title;
      author.value = library[idNum].author;
      pages.value = library[idNum].pages;
      if(library[idNum].status === "Read")
        radioBtns[0].checked = true;
      else
        radioBtns[1].checked = true;
      modal.style.display = "block";
    })
  });
}

