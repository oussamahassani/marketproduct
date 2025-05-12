package com.pfe.users;

public class utils {

    public static RoleEnum roleFromStr(String role) {
        if (role == null) {
            throw new IllegalArgumentException("Role cannot be null");
        }
        switch (role.toLowerCase()) {
            case "admin":
                return RoleEnum.ADMIN;
            case "acheteur":
                return RoleEnum.ACHETEUR;
            case "vedeur":
                return RoleEnum.VEDEUR;
            default:
                throw new IllegalArgumentException("Invalid role: " + role);
        }
    }
}
