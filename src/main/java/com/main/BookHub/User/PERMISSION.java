package com.main.BookHub.User;

public enum PERMISSION {
    USERS_READ("users:read"),
    USERS_WRITE("users:write");

    private final String permission;

    PERMISSION(String permission) {
        this.permission = permission;
    }

    public String getPermission() {
        return permission;
    }
}
