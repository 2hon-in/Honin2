package com.team2.honin.honinserver.dto;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;
import java.util.stream.Collectors;

public class MemberDTO extends User {


    
    public MemberDTO(String username, String password, Collection<? extends GrantedAuthority> authorities) {
        super(username, password, roleNames.stream()
                .map(str-> new SimpleGrantedAuthority("ROLE_"+str)).collect(Collectors.toList()));
    }
}
