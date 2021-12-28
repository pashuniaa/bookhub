package com.main.BookHub.User;

import com.main.BookHub.Book.Book;
import com.main.BookHub.Book.BookRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final BookRepository bookRepository;

    public User getUserById(Long id) throws Exception {
        if (userRepository.findById(id).equals(null)) {
            throw new Exception("User not found.\n");
        }
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

    public Book addToBookshelf(Long user_id, Long book_id) throws Exception {
        User user=userRepository.findById(user_id).get();
        Book book= bookRepository.findById(book_id).get();
        user.getBookshelf().add(book);
        userRepository.save(user);
        System.out.println("ADDED BOOK TO THE BOOKSHELF");
        return book;
    }

    public void deleteFromBookshelfById(Long user_id, Long book_id) throws Exception {
        User user=userRepository.findById(user_id).get();

        if(user.getBookshelf().contains(bookRepository.getById(book_id))){
            System.out.println("Bookshelf size before deleting "+user.getBookshelf().size()+"\n");
            user.getBookshelf().remove(bookRepository.getById(book_id));
            userRepository.save(user);
            System.out.println("Bookshelf size after deleting "+user.getBookshelf().size()+"\n");
        }
        else throw new Error("Book does not exist in a bookshelf.\n");
    }

    public void deleteBookshelf(Long user_id){
        User user=userRepository.findById(user_id).get();
        user.getBookshelf().clear();
        userRepository.save(user);
        System.out.println("User's "+user.getEmail()+" Bookshelf was deleted.");
    }
}
