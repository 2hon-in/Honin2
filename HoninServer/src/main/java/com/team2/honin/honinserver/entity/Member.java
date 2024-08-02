package com.team2.honin.honinserver.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;

@Data
@Entity
@Table
public class Member {
    @Id
    @Column(name = "nickname", length = 50)
    private String nickname;

    @Column(name = "username", length = 50)
    private String username;

    @Column(name = "password", length = 50)
    private String password;

    @Column(name = "email", length = 100)
    private String email;

    @Column(name = "phone", length = 30)
    private String phone;

    @Column(name = "profileimg", length = 1000)
    private String profileimg;

    @Column(name = "profilemsg", length = 1000)
    private String profilemsg;

    @Column(name = "provider", length = 20)
    private String provider;

    @Column(name = "snsid", length = 50)
    private String snsid;

    @CreationTimestamp
    @Column(name = "indate", columnDefinition = "datetime default now()")
    private Date indate;

    @Column(name = "address1", length = 100)
    private String address1;

    @Column(name = "address2", length = 100)
    private String address2;

    @Column(name = "address3", length = 100)
    private String address3;

    @Column(name = "userstate", columnDefinition = "char(1) default 'Y'")
    private String userstate;

    @Column(name = "zipnum", length = 15)
    private String zipnum;

}
