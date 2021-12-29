//TODO ADD USERS LIST, ON CLICK OPENS UP MODAL TO UPDATE OR DELETE USER.
//TODO ADD BOOKS LIST, ON CLICK OPENS UP MODAL TO UPDATE OR DELETE BOOK. + ADD BOOK BUTTON, ON CLICK OPENS UP MODAL FOR ADDING BOOKS
var bookList;
var bookshelf;
var currentUser;

$(document).ready(function(){

    //CALLS API TO GET CURRENTLY LOGGED IN USER
    $.ajax({
        method: 'GET',
        url: 'http://localhost:8010/api/v1/users/current',
        success: function(response){
            currentUser=response;
            console.log("1. GOT CURRENT USER-> "+currentUser.email);
            setRoleContent(currentUser);

            if($("#add-row").length){
                getBookList();
            }

            if($("#addTableRow").length){
                console.log("2. CALLING GET BOOK LIST AND GET BOOKSHELF");
                getBookList();
                getBookshelf(currentUser);
            }

            if($("#manageBooks").length){
                //TODO FILL IN MANAGE BOOKS TABLE WITH BOOK LIST
                getBookList();
                fillManageBooks();
            }
        },
        error: function(){
            console.log("ERROR. CAN'T GET CURRENT USER.");
        }
    })
})

function test(){
    alert("This is called OUTSIDE OF document ready! + "+currentUser.email);
}

function saveGlobalBooks(books){
    bookList=books;
}

//CALLS API TO GET BOOK LIST
function getBookList(){
    $.ajax({
        method: 'GET',
        url: 'http://localhost:8010/api/v1/books',
        success: function(response){
            bookList=response;
            if($("#add-row").length){
                addCards(bookList);
            }
        },
        error: function(){
            console.log("ERROR. CAN'T GET BOOK LIST.");
        }
    })
}

//BASED ON USERS ROLE HIDE MENU ELEMENT
function setRoleContent(currentUser){
    let htmlElement=document.getElementById("manage-menu");
    if(currentUser.role==='USER'){
        htmlElement.style.display='none';
    }
    else{
        htmlElement.style.display='block';
    }
}

//CALL API TO GET USERS BOOKSHELF
function getBookshelf(currentUser){
    $.ajax({
        method: 'GET',
        url: 'http://localhost:8010/api/v1/users/bookshelf/'+currentUser.id,
        success: function(response){
            bookshelf=response;

            console.log("3. GOT CURRENT USER-> "+currentUser.email + " AND ITS BOOKSHELF OF "+bookshelf.length+" BOOKS.");

            fillBookshelf(bookshelf);
        },
        error: function(){
            console.log("ERROR. CAN'T ADD BOOK TO BOOKSHELF.");
        }
    })
}

//CREATES A BOOK CARD FROM BOOK LIST AND ADDS TO HTML ROW
function addCards(books){

    let colCount = 5;
    let book_counter=0;

    for (let i = 0; i < books.length; i++) {
        // Create a row
        const row = document.createElement('div');
        row.className = "row hidden-md-up";

        if((books.length-book_counter)>5){
            //Jeigu knygu yra daugiau nei 5, mes prasukam visa cikla 5 kartus
            for (let col = 0; col < colCount; col++) {
                //let book=books[book_counter];

                // Create a column
                const html_col = `
                <div class="card m-1">
                    <a href="#" data-bs-toggle="modal" data-bs-target="#myModal" id="${books[book_counter].id}" onclick="fillModal(this)">
                        <div class="card-block">
                            <img src="{${books[book_counter].imageUrl}}">
                            <h4 class="card-title">${books[book_counter].name}</h4>
                            <h6 class="card-subtitle text-muted">${books[book_counter].author}</h6>
                        </div>
                    </a>
                </div>
                `;

                const cellId = book.id;
                const cell = document.createElement('div');
                cell.className = "col";
                cell.innerHTML = html_col;
                cell.id = cellId;
                row.appendChild(cell);
                book_counter++;
            }

            document.getElementById('add-row').appendChild(row);
        }

        if((books.length-book_counter)<5){
            //jei knygu yra maziau nei 5, mes turime prasukti cikla tik tiek kartu kiek yra knygu
            for (let col = 0; col < (books.length-book_counter+1); col++) {

                //let book=books[book_counter];

                // Create a column
                const html_col = `
                <div class="card m-2">
                    <a href="#" data-bs-toggle="modal" data-bs-target="#myModal" id="${books[book_counter].id}" onclick="fillModal(this)">
                        <div class="card-block">
                            <img src="${books[book_counter].imageUrl}">
                            <h4 class="card-title">${books[book_counter].name}</h4>
                            <h6 class="card-subtitle text-muted">${books[book_counter].author}</h6>
                        </div>
                    </a>
                </div>
                `;

                const cell = document.createElement('div');
                cell.className = "col";
                cell.innerHTML = html_col;
                row.appendChild(cell);
                book_counter++;
            }

            document.getElementById('add-row').appendChild(row);
        }
    }
}

$("#user-modal").click(function() {
    document.getElementById("user-name").innerHTML=currentUser.firstName+ " "+currentUser.lastName;
    document.getElementById("user-email").innerHTML=currentUser.email;
});

//FILLS IN BOOK MODAL WITH BOOK DETAILS
function fillModal(btn){
    let book=bookList[btn.id-1];
    //ACTION BUTTON
    $('.action').attr('id', book.id);

    //BOOK COVER
    document.getElementById("book-cover").src=book.imageUrl;
    //BOOK TITLE
    document.getElementById("book-title").innerHTML=book.name;
    //BOOK AUTHOR
    document.getElementById("book-author").innerHTML=book.author;
    //PUBLICATION DATE
    document.getElementById("publication-date").innerHTML=book.publicationDate;
    //GENRE
    document.getElementById("genre").innerHTML=book.genre;
    //LANGUAGE
    document.getElementById("language").innerHTML=book.language;
    //ISBN
    document.getElementById("isbn").innerHTML=book.isbn;
    //ID
    document.getElementById("id").innerHTML=book.id;

    //READ BUTTON
    console.log("READ BUTTON URL: "+book.readUrl);
    document.getElementById("button-read").href=book.readUrl;
}

//GOOGLE BOOKS API
function getBookCover(bookIsbn){
    let apiUrl = "https://www.googleapis.com/books/v1/volumes?q=isbn:";

    $.ajax({
        url: apiUrl + bookIsbn,
        type: "GET",
        dataType: "json",
        success: function(response) {
            console.log(response)
            if (response.totalItems === 0) {
                console.log("can not get book cover.. try again")
            }
            else {
                let item = response.items[0];
                let bookImgUrl=item.volumeInfo.imageLinks.thumbnail;

                return bookImgUrl;
            }
        },
        error: function () {
            alert("Something went wrong.. <br>"+"Try again!");
        }
    });
}

//CALLS API TO ADD NEW BOOK TO USERS BOOKSHELF
function addToBookShelf(btn){
    $.ajax({
        method: 'POST',
        url: 'http://localhost:8010/api/v1/users/'+currentUser.id+'/book/'+btn.id,
        success: function(response){
            alert("Book Added.");
        },
        error: function(){
            console.log("ERROR. CAN'T ADD BOOK TO BOOKSHELF.");
        }
    })
}

//FILLS IN BOOKSHELF TABLE
function fillBookshelf(bookshelf){
    console.log("4. FILL BOOKSHELF. GOT A BOOKSHELF OF "+bookshelf.length+" BOOKS.");
    for (let i = 0; i < bookshelf.length+1; i++) {

        const row = document.createElement('tr');
        row.className = "clickable-ro";
        row.setAttribute("data-bs-toggle", "modal");
        row.setAttribute("data-bs-target", "#myModal");
        row.setAttribute("id", bookshelf[i].id);
        row.setAttribute("onClick", "fillModal(this)");

        const data=`
            <th scope="row">${i+1}</th>
            <td>${bookshelf[i].name}</td>
            <td>${bookshelf[i].author}</td>
            <td>${bookshelf[i].id}</td>
        `;

        row.innerHTML = data;
        document.getElementById('addTableRow').appendChild(row);
    }
}

function removeFromBookshelf(btn){
    console.log("REMOVE FROM BOOKSHELF is being called with ID: "+btn.id);

    $.ajax({
        method: 'DELETE',
        url: 'http://localhost:8010/api/v1/users/bookshelf/'+currentUser.id+'/delete/'+btn.id,
        success: function(response){
            window.location.reload();
            alert("Book Deleted.");
        },
        error: function(){
            console.log("ERROR. CAN'T DELETE BOOK.");
        }
    })
}

//MANAGE BOOKS

//FILLS IN BOOKSHELF TABLE
function fillManageBooks(){
    $.ajax({
        method: 'GET',
        url: 'http://localhost:8010/api/v1/books',
        success: function(response){
            for (let i = 0; i < response.length+1; i++) {

                const row = document.createElement('tr');
                row.className = "clickable-ro";
                row.setAttribute("data-bs-toggle", "modal");
                row.setAttribute("data-bs-target", "#myModal");
                row.setAttribute("id", response[i].id);
                row.setAttribute("onClick", "fillUpdateBooksModal(this)");

                const data=`
            <th scope="row">${i+1}</th>
            <td>${response[i].name}</td>
            <td>${response[i].author}</td>
            <td>${response[i].id}</td>
            `;

                row.innerHTML = data;
                document.getElementById('manageBooks').appendChild(row);
            }
        },
        error: function(){
            console.log("ERROR. CAN'T GET BOOK LIST.");
        }
    })
}

//FILLS IN BOOK MODAL WITH BOOK DETAILS
function fillUpdateBooksModal(btn){
    let book=bookList[btn.id-1];

    // //ACTION BUTTON
    // $('.action').attr('id', book.id);
    //
    //BOOK COVER
    document.getElementById("updateCoverUrl").value=book.imageUrl;
    //READ LINK
    document.getElementById("updateReadUrl").value=book.readUrl;
    //BOOK TITLE
    document.getElementById("updateTitle").value=book.name;
    //BOOK AUTHOR
    document.getElementById("updateAuthor").value=book.author;
    //PUBLICATION DATE
    document.getElementById("updatePublicationDate").value=book.publicationDate;
    //GENRE
    document.getElementById("updateGenre").value=book.genre;
    //LANGUAGE
    document.getElementById("updateLanguage").value=book.language;
    //ISBN
    document.getElementById("updateIsbn").value=book.isbn;

    //SAVE BUTTON
    $('.action').attr('id', book.id);
    $('.remove').attr('id', book.id);

    let title=document.getElementById("updateTitle").value;
}

function updateBook(btn){

    $.ajax({
        method: 'GET',
        url: 'http://localhost:8010/api/v1/books',
        success: function(response){
            let book=response[btn.id-1];
            let sendUpdateRequest=false;

            //alert("Book from server Title is: "+book.name);

            //GET ALL VALUES FROM INPUT FIELDS
            let id=book.id;
            let imageUrl=document.getElementById("updateCoverUrl").value;
            let readUrl=document.getElementById("updateReadUrl").value;
            let title=document.getElementById("updateTitle").value;
            let author=document.getElementById("updateAuthor").value;
            let publicationDate=document.getElementById("updatePublicationDate").value;
            let genre=document.getElementById("updateGenre").value;
            let language=document.getElementById("updateLanguage").value;
            let isbn=document.getElementById("updateIsbn").value;

            let bookObject={
                "id": id,
                "name": title,
                "author": author,
                "publicationDate": publicationDate,
                "isbn": isbn,
                "imageUrl": imageUrl,
                "readUrl": readUrl,
                "genre": genre,
                "language": language
            };

            //alert("UPDATE BOOK INFO: "+title+" "+author+" "+publicationDate+" "+genre+" "+language+" "+isbn);

            if(book.imageUrl!== imageUrl) sendUpdateRequest=true;
            else if(book.readUrl!==readUrl) sendUpdateRequest=true;
            else if(book.name!==title) sendUpdateRequest=true;
            else if(book.author!==author) sendUpdateRequest=true;
            else if(book.publicationDate!==publicationDate) sendUpdateRequest=true;
            else if(book.genre!==genre) sendUpdateRequest=true;
            else if(book.language!==language) sendUpdateRequest=true;
            else sendUpdateRequest = book.isbn !== isbn;

            if(sendUpdateRequest){
                alert("CHANGES TO THE BOOK WERE MADE!");

                $.ajax({
                    type: "PUT",
                    url: 'http://localhost:8010/api/v1/books',
                    data: JSON.stringify(bookObject),
                    contentType: "application/json; charset=utf-8",
                    success:function(response){
                        window.location.reload();
                        alert("BOOK HAS BEEN UPDATED.");
                    },
                    error: function(){
                        console.log("ERROR. COULD NOT SEND UPDATE BOOK REQUEST.");
                    }
                })
            }
        },
        error: function(){
            console.log("ERROR UPDATING BOOK.");
        }
    })

}

function removeBook(btn){
    alert("REMOVE BOOK WITH ID: "+btn.id);
}



