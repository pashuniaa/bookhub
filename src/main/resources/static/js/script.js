//LIST OF BOOKS
var bookList;
var bookshelf;

$(document).ready(function(){
    //CALLS API TO GET BOOK LIST
    $.ajax({
        method: 'GET',
        url: 'http://localhost:8010/api/v1/books',
        success: function(response){
            bookList=response;
            addCards(bookList);
        },
        error: function(){
            console.log("ERROR. CAN'T GET BOOK LIST.");
        }
    })

    //CALLS API TO GET USERS BOOKSHELF
    $.ajax({
        method: 'GET',
        url: 'http://localhost:8010/api/v1/users/bookshelf',
        success: function(response){
            bookshelf=response;
            addBookShelf(bookshelf);
        },
        error: function(){
            console.log("ERROR. CAN'T GET BOOKSHELF.");
        }
    })

    //CREATES A BOOK CARD FROM BOOK LIST AND ADDS TO HTML ROW
    function addCards(books){

        var colCount = 5;
        var book_counter=0;

        for (let i = 0; i < books.length; i++) {
            // Create a row
            const row = document.createElement('div');
            row.className = "row hidden-md-up";

            if((books.length-book_counter)>5){
                //Jeigu knygu yra daugiau nei 5, mes prasukam visa cikla 5 kartus
                for (let col = 0; col < colCount; col++) {
                    var bookURL=getBookCover(1781100225);
                    var book=books[book_counter];
                    console.log("Got book URL "+bookURL);

                    // Create a column
                    const html_col = `
                <div class="card m-2">
                    <a href="#" data-bs-toggle="modal" data-bs-target="#myModal" id="${book.id}" onclick="fillModal(this)">
                        <div class="card-block">
                            <img src="{${book.imageUrl}}" style="width: 210px; height: 320px; margin-bottom: 1vh;">
                            <h4 class="card-title">${book.name}</h4>
                            <h6 class="card-subtitle text-muted">${book.author}</h6>
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
                    var bookURL=getBookCover(1781100225);
                    var book=books[book_counter];

                    console.log("Got book URL "+bookURL);
                    // Create a column
                    const html_col = `
                <div class="card m-2">
                    <a href="#" data-bs-toggle="modal" data-bs-target="#myModal" id="${book.id}" onclick="fillModal(this)">
                        <div class="card-block">
                            <img src="${book.imageUrl}">
                            <h4 class="card-title">${book.name}</h4>
                            <h6 class="card-subtitle text-muted">${book.author}</h6>
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

            console.log("added " + (i+1) + " row");
        }
    }
})

//GET LOGGED IN USER'S DETAILS
$("#user-modal").click(function() {
    $.ajax({
        method: 'GET',
        url: 'http://localhost:8010/api/v1/users/current',
        success: function(response){
            document.getElementById("user-name").innerHTML=response.firstName+ " "+response.lastName;
            document.getElementById("user-email").innerHTML=response.email;
        },
        error: function(){
            console.log("ERROR. CAN'T GET USER INFO.");
        }
    })
});

//FILLS IN BOOK MODAL WITH BOOK DETAILS
function fillModal(btn){
    console.log("FILL MODAL IS BEING CALLED!!!!!!")
    var book=bookList[btn.id-1];

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
    //READ BUTTON
    console.log("READ BUTTON URL: "+book.readUrl);
    document.getElementById("button-read").href="http://books.google.lt/books?id=NEU-1RfOMEwC&printsec=frontcover&dq=isbn:1932073205&hl=&cd=1&source=gbs_api";
    //ADD BUTTON

}

//GOOGLE BOOKS API
function getBookCover(bookIsbn){
    console.log("GET BOOK COVER IS BEING CALLED!!!!!!")
    var apiUrl = "https://www.googleapis.com/books/v1/volumes?q=isbn:";

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
                var item = response.items[0];
                var bookImgUrl=item.volumeInfo.imageLinks.thumbnail;

                return bookImgUrl;
            }
        },
        error: function () {
            alert("Something went wrong.. <br>"+"Try again!");
        }
    });
}

//CALLS API FOR USERS BOOKSHELF
function addBookShelf(books){
    for (let i = 0; i < books.length+1; i++) {

        const row = document.createElement('tr');
        row.className = "clickable-ro";
        row.setAttribute("data-bs-toggle", "modal");
        row.setAttribute("data-bs-target", "#myModal");

        const data=`
            <th scope="row">${i+1}</th>
            <td>${books[i].name}</td>
            <td>${books[i].author}</td>
            <td>2021-11-17</td>
            <td>2021-12-17</td>
        `;

        row.innerHTML = data;
        document.getElementById('addTableRow').appendChild(row);
    }
}

