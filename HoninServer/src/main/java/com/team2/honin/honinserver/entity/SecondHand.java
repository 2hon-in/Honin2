package com.team2.honin.honinserver.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Date;


@Data
@Entity
@Table(name = "secondhand")
public class SecondHand {

    @Id
    @Column(name = "snum")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer snum;

    @Column(name = "seller", length = 50)
    private String seller;

    @Column(name = "title", length = 50, columnDefinition = "varchar(50)")
    private String title;

    @Column(name = "content", columnDefinition = "text")
    private String content;

    @Column(name = "writedate", columnDefinition = "timestamp default now()")
    @CreationTimestamp
    private Date writedate;

    @Column(name = "readcount")
    private Integer readcount;

    @Column(name = "state", columnDefinition = "char(1) default 'Y'")
    private String state;

    @Column(name = "price")
    private Integer price;
}
