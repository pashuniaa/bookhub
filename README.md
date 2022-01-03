This is an Online Library project- BOOK HUB.

Back-end: Spring boot, Spring Security.
Front-end: vanilla JS, HTML, CSS and Bootstrap 5.
Database: MySQL.

#GETTING STARTED

When entering the site, you will be greeted by the login page.
System has 2 User Roles: Admin and User. 

*NOTE. Right now every user is added manualy through an API, calling this endpoint "/api/v1/users" using Postman. 
The registration system is currently in progress*

After successfully logging in, you will be redirected to the home page.

#MENU

#USER ROLE

  If logged in with the Role of USER, client only has permission to read data, 
  so the MANAGE menu is not available.

  #MENU->BOOKLIST
  
  User can see the list of book cards. When being clicked on, pops up book's modal with it's information.

  Also modal has 2 buttons: 
  
  READ- redirects user to the google books page with that books PDF to read. 
  ADD TO BOOKSHELF- adds book to user's bookshelf.

  #MENU->BOOKSHELF
  
  Bookshelf is simply a table of user's selected books. On click, they also pop up the modal with books info and a read button, but additionally
  the modal has a REMOVE button, which deletes selected book from the bookshelf.

#ADMIN ROLE

  If logged in with the role of ADMIN, client has permissions to read, write, update and delete data.
  Now the MANAGE menu is available.

  #MANAGE->BOOKS
  
  Here client can see the list of all library's books. When clicked on, a modal pops up. This modal contains the pre-filled fields of book info, SAVE and REMOVE         butons.
  If client changes values, he can click save to UPDATE the book's info. Remove button simply removes the book from the database.

  Alse this page has ADD NEW BOOK button. It also uses the same modal form as the update book modal, but now it only has one ADD BOOK button, and you have guessed
  what it does.
  
  #Further Improvements
  
  As mentioned before, registration page will be added soon. Also, right now I use google books api to get book card covers and 
  read book URL's, but those url's are entered to the fields by hand, just like other info. So soon instead of specifying every field, you will only need to type   in   book's ISBN,
  which will automatically call an API and fill in the fields. 







