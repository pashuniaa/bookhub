package com.main.BookHub.Book;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/books")
@AllArgsConstructor
public class BookController {

    private final BookService bookService;

    @GetMapping
    public List<Book> getBooks(){
        System.out.println("GOT A REQUEST FOR BOOK LIST.");
       return  bookService.getBooks();
    }

    @GetMapping("/{id}")
    public Book getBookById(@PathVariable Long id){
        return bookService.getBookById(id);
    }

    @PostMapping
    public Book addBook(@RequestBody Book book) {
        System.out.println("REQUEST TO ADD NEW BOOK "+book.getName()+" by "+book.getAuthor());
        return bookService.addBook(book);
    }

    @PutMapping
    public Book updateBook(@RequestBody Book book){
        System.out.println("REQUEST TO UPDATE BOOK "+book.getName());
        return bookService.updateBook(book);
    }

    @DeleteMapping("/{id}")
    public void deleteBook(@PathVariable Long id){
        System.out.println("REQUEST TO DELETE BOOK");
        bookService.deleteBook(id);
    }
}