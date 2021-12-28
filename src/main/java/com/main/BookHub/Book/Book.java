package com.main.BookHub.Book;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.main.BookHub.User.User;
import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private String author;
    private String publicationDate;
    private String isbn;
    private String imageUrl;
    private String readUrl;
    @Enumerated(EnumType.STRING)
    private GENRE genre;
    @Enumerated(EnumType.STRING)
    private LANGUAGE language;

    @JsonIgnore
    @ManyToMany(mappedBy = "bookshelf")
    Set<User> readers=new HashSet<>();

    public Book() {
    }

    public Book(String name, String author, String publicationDate, String isbn, String imageUrl, String readUrl, GENRE genre, LANGUAGE language, Set<User> readers) {
        this.name = name;
        this.author = author;
        this.publicationDate = publicationDate;
        this.isbn = isbn;
        this.imageUrl = imageUrl;
        this.readUrl = readUrl;
        this.genre = genre;
        this.language = language;
        this.readers = readers;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getPublicationDate() {
        return publicationDate;
    }

    public void setPublicationDate(String publicationDate) {
        this.publicationDate = publicationDate;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getReadUrl() {
        return readUrl;
    }

    public void setReadUrl(String readUrl) {
        this.readUrl = readUrl;
    }

    public GENRE getGenre() {
        return genre;
    }

    public void setGenre(GENRE genre) {
        this.genre = genre;
    }

    public LANGUAGE getLanguage() {
        return language;
    }

    public void setLanguage(LANGUAGE language) {
        this.language = language;
    }

    public Set<User> getReaders() {
        return readers;
    }

    public void setReaders(Set<User> readers) {
        this.readers = readers;
    }
}