package com.team2.honin.honinserver.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Date;

@Data
@Entity
@Table
public class MyFood {
    @Id
    @Column(name = "mfnum")
    private Integer mfnum;

    @Column(name = "owner", length = 50)
    private String owner;

    @Column(name = "fname", length = 50)
    private String fname;

    @Column(name = "exdate")
    @CreationTimestamp
    private Date exdate;

    @CreationTimestamp
    @Column(name = "indate", columnDefinition = "datetime default now()")
    private Date indate;

    @Column(name = "image", length = 1000)
    private String image;

    @Column(name = "savefilename", length = 1000)
    private String savefilename;

    @Column(name = "memo", length = 500)
    private String memo;

    @Column(name = "fstate", columnDefinition = "char(1) default 'Y'")
    private String fstate;

//    @ManyToOne
//    @JoinColumn(name = "owner", insertable = false, updatable = false)
//    private Member member;
}
