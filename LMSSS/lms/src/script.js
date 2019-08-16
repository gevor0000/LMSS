//let u = new User("Admin", "Admin", new Roll("Admin"));
function login() {
    let Username=document.getElementById('Username').value;
    let Password=document.getElementById('Password').value;
    Usernames=JSON.parse(localStorage.getItem("Usernames"));
    Passwords=JSON.parse(localStorage.getItem("Passwords"));
    Rolless=JSON.parse(localStorage.getItem("Rolls"));
    if(Usernames.includes(Username)){
        if (Passwords[Usernames.indexOf(Username)]===Password){

            sessionStorage.setItem("Username", Username.toString());
            sessionStorage.setItem("Roll", Rolless[Usernames.indexOf(Username)]);
            location.replace("Home.html");
            location.reload();
        }
        else{
            alert("Incorrect Username or Password");
        }
    }
    else{
        alert("Incorrect Username or Password");
    }
}
function Register() {
    let Username=document.getElementById('Username').value;
    let Password=document.getElementById('Password').value;
    let Rolll=document.getElementById('Roll').value;

    let user = new User(Username, Password, new Roll(Rolll.toString()));
    login();
}
function logout() {
    sessionStorage.clear();
    location.reload();
}
let Permissions=["addBook", "removeBook", "addUser", "deleteUser", "takeBook"];
let BookNames = [];
let BookAuthors=[];
// BookNames.push("Samvel");
// BookAuthors.push("Raffi");
//
// localStorage.setItem("BookNames", JSON.stringify(BookNames));
// localStorage.setItem("BookAuthors", JSON.stringify(BookAuthors));

BookNames=JSON.parse(localStorage.getItem("BookNames"));
BookAuthors=JSON.parse(localStorage.getItem("BookAuthors"));
function addBook() {
    let name=document.getElementById("bookName").value;
    let author=document.getElementById("bookAuthor").value;
    BookNames.push(name);
    BookAuthors.push(author);
    localStorage.setItem("BookNames", JSON.stringify(BookNames));
    localStorage.setItem("BookAuthors", JSON.stringify(BookAuthors));
    alert("The book has successfully been added");
    location.reload();
}

function removeBook(name, author) {
    for(let i in BookNames){
        if (i===name && BookAuthors[BookNames.indexOf(i)]===author){
            BookNames.removeItem(BookNames.indexOf(i));
            BookAuthors.removeItem(BookNames.indexOf(i));
        }
    }
}

function permission(role) {
    let permissions=[];
    if(role==="User"){
        permissions.push("takeBook");
    }
    if(role==="Librarian"){
        permissions.push("addBook");
        permissions.push("removeBook");
        permissions.push("takeBook");
    }
    if (role==="Admin"){
        permissions.push("addBook");
        permissions.push("removeBook");
        permissions.push("takeBook");
        permissions.push("addUser");
        permissions.push("deleteUser");
    }
    return permissions;
}

function display() {
    let permissions=permission(sessionStorage.getItem("Roll"));
    if(!permissions.includes("addBook")){
        document.getElementById("addBook").style.display="none";
    }
    if(!permissions.includes("removeBook")){
        document.getElementById("removeBook").style.display="none";
    }
    if(!permissions.includes("takeBook")){
        document.getElementById("takeBook").style.display="none";
    }
    if(!permissions.includes("addUser")){
        document.getElementById("addUser").style.display="none";
    }
    if(!permissions.includes("deleteUser")){
        document.getElementById("deleteUser").style.display="none";
    }

}

function removeUser() {

    let username = document.getElementById("User").value;
    Usernames=JSON.parse(localStorage.getItem("Usernames"));
    Passwords=JSON.parse(localStorage.getItem("Passwords"));
    Rolless=JSON.parse(localStorage.getItem("Rolls"));
    // Usernames.delete(Usernames.indexOf(username));
    let a=Usernames.indexOf(username);
    delete Usernames[a];
    delete Passwords[a];
    delete Rolless[a];
    //.removeItem(Usernames.indexOf(username));
    localStorage.setItem("Usernames", JSON.stringify(Usernames));
    localStorage.setItem("Passwords", JSON.stringify(Passwords));
    localStorage.setItem("Rolls", JSON.stringify(Rolless));
}

function viewBooks() {
    let t = document.getElementById("bookTable");
    let BookNames=JSON.parse(localStorage.getItem("BookNames"));
    let BookAuthors=JSON.parse(localStorage.getItem("BookAuthors"));
    for(let l=0; l<BookNames.length; l++){
        let row = t.insertRow(l);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        cell1.innerHTML = BookNames[l];
        cell2.innerHTML = BookAuthors[l];
        cell3.innerHTML = '<button onclick=requestBook('+l+')>Request';
    }
}
let requestedBookNames=[];
let requestedBookAuthors=[];
let takenBookNames=[];
let takenBookAuthors=[];
function requestBook(i) {
    let BookNames=JSON.parse(localStorage.getItem("BookNames"));
    let BookAuthors=JSON.parse(localStorage.getItem("BookAuthors"));
    requestedBookNames.push(BookNames[i]);
    requestedBookAuthors.push(BookAuthors[i]);
}

function acceptBook(i) {
    takenBookNames.push(requestedBookNames[i]);
    takenBookAuthors.push(requestedBookAuthors[i]);
    delete requestedBookAuthors[i];
    delete requestedBookNames[i];
}

function declineBook(i) {
    delete requestedBookAuthors[i];
    delete requestedBookNames[i];
}