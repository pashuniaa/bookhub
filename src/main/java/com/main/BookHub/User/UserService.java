package com.main.BookHub.User;

import com.main.BookHub.Book.Book;
import com.main.BookHub.Book.BookRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final BookRepository bookRepository;

    public User getUserById(Long id){
        return userRepository.getById(id);
    }

    public User getSessionUser(){
        String email= SecurityContextHolder.getContext().getAuthentication().getName();

        return userRepository.findByEmail(email).get();
    }

    public List<User> getUsers(){
        return userRepository.findAll();
    }

    public User addUser(User user){
        return userRepository.save(user);
    }

    public void deleteUserById(Long id){
        userRepository.deleteById(id);
    }

    //BOOKSHELF
    public List<Book> getBookshelf(Long user_id){
        List<Book> bookshelf = new ArrayList<>(userRepository.findById(user_id).get().getBookshelf());
        return bookshelf;
    }

    public Book addToBookshelf(Long user_id, Long book_id){
        Book book= bookRepository.findById(book_id).get();
        User user=userRepository.findById(user_id).get();
        user.getBookshelf().add(book);
        userRepository.save(user);
        return book;
    }
}
