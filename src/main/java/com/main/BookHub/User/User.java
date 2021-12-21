package com.main.BookHub.User;

import com.main.BookHub.Book.Book;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    @Enumerated(value = EnumType.STRING)
    private ROLE role;
    @Enumerated(value = EnumType.STRING)
    private STATUS status;

    @ManyToMany
    @JoinTable(
            name = "bookshelf",
            joinColumns = @JoinColumn(name = "user"),
            inverseJoinColumns = @JoinColumn(name = "book"))
    Set<Book> bookshelf=new HashSet<>();
}



























