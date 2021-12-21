package com.main.BookHub.Utils;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/content")
public class AuthController {

    @GetMapping("/login")
    public String getLoginPage(){
        return "login";
    }

    @GetMapping("/index")
    public String getIndexPage(){
        return "index";
    }

    @GetMapping("/bookList")
    public String getBookList(){
        return "bookList";
    }

    @GetMapping("/bookshelf")
    public String getBookShelf(){
        return "bookshelf";
    }
}
