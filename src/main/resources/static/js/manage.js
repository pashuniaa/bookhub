//TODO BASED ON CURRENT USER ROLE, JS SHOULD HIDE MANAGE ITEM FROM MENU BAR

var bookList;
var currentUser;

$(document).ready(function (){

    $.ajax({
        method: 'GET',
        url: 'http://localhost:8010/api/v1/users/current',
        success: function(response){
            console.log("1. GOT CURRENT USER: "+response.email);
            currentUser=response;
            getBookshelf(currentUser);
        },
        error: function(){
            console.log("ERROR. CAN'T GET CURRENT USER.");
        }
    })

    //CALLS API TO GET BOOK LIST
    $.ajax({
        method: 'GET',
        url: 'http://localhost:8010/api/v1/books',
        success: function(response){
            console.log("2. GOT BOOK LIST")
            bookList=response;
            addCards(bookList);
        },
        error: function(){
            console.log("ERROR. CAN'T GET BOOK LIST.");
        }
    })
})

function fillBooksTable(bookList){

}

function setRoleContent(currentUser){
    if(currentUser.role==='USER'){
        //TODO DISABLE MANAGE MENU
    }
    //TODO ELSE
}