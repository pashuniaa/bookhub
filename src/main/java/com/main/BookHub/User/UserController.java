package com.main.BookHub.User;

import com.main.BookHub.Book.Book;
import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserService userSevice;

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('users:read')")
    public User getUserById(@PathVariable Long id) throws Exception {
        return userSevice.getUserById(id);
    }

    @GetMapping("/current")
    public User getSessionUser(){
        System.out.println("CALLING CURRENT USER\n");
        return userSevice.getSessionUser();
    }

    @GetMapping
    @PreAuthorize("hasAuthority('users:read')")
    public List<User> getUsers(){
        return userSevice.getUsers();
    }

    @PostMapping
    @PreAuthorize("hasAuthority('users:write')")
    public User createUser(@RequestBody User user){
        return userSevice.addUser(user);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('users:write')")
    public void deleteById(Long id){
        userSevice.deleteUserById(id);
    }

    //BOOKSHELF
    @GetMapping("/bookshelf/{user_id}")
    public List<Book> getBookshelf(@PathVariable Long user_id){
        System.out.println("CALLING USERS BOOKSHELF\n");
        return userSevice.getBookshelf(user_id);
    }

    @PostMapping("/{user_id}/book/{book_id}")
    public Book addToBookshelf(@PathVariable Long user_id, @PathVariable Long book_id) throws Exception {
        System.out.println("TRYING TO ADD BOOK TO BOOKSHELF");
        return userSevice.addToBookshelf(user_id, book_id);
    }

    @DeleteMapping("/bookshelf/{user_id}/delete/{book_id}")
    public void deleteFromBookshelfById(@PathVariable Long user_id, @PathVariable Long book_id) throws Exception {
        userSevice.deleteFromBookshelfById(user_id, book_id);
    }

    @DeleteMapping("/bookshelf/{user_id}/delete/all")
    @PreAuthorize("hasAuthority('users:write')")
    public void deleteBookshelf(@PathVariable Long user_id){
        userSevice.deleteBookshelf(user_id);
    }
}


