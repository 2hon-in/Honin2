package com.team2.honin.honinserver.entity;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
public class Member {
    @Id
    @Column(name = "nickname", length = 50)
    private String nickname;

    @Column(name = "password", length = 1000)
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
    @Column(name = "indate", columnDefinition = "timestamp default now()")
    private Date indate;

    @Column(name = "address1", length = 100)
    private String address1;

    @Column(name = "address2", length = 100)
    private String address2;

    @Column(name = "address3", length = 100)
    private String address3;

    @NotNull
    @Column(name = "userstate", columnDefinition = "char(1) NOT NULL default 'Y'")
    private String userstate = "Y";

    @Column(name = "zipnum", length = 15)
    private String zipnum;


    @Enumerated(EnumType.STRING)
    @ElementCollection(fetch = FetchType.LAZY)
    @Builder.Default // Default:new ArrayList<>() 비어있는 리스트로 객체 저장
    private List<MemberRole> memberRoleList = new ArrayList<MemberRole>();

}
