package com.main.BookHub.User;

import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Set;
import java.util.stream.Collectors;

public enum ROLE {
    ADMIN(Set.of(PERMISSION.USERS_READ, PERMISSION.USERS_WRITE)),
    USER(Set.of(PERMISSION.USERS_READ)),
    EMPLOYEE(Set.of(PERMISSION.USERS_READ, PERMISSION.USERS_WRITE));

    private final Set<PERMISSION> permissions;

    ROLE(Set<PERMISSION> permissions) {
        this.permissions = permissions;
    }

    public Set<PERMISSION> getPermissions() {
        return permissions;
    }

    public Set<SimpleGrantedAuthority> getAuthorities(){
        return getPermissions().stream()
                .map(permission -> new SimpleGrantedAuthority(permission.getPermission()))
                .collect(Collectors.toSet());
    }
}
