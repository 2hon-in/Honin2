package com.team2.honin.honinserver.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.hibernate.annotations.ColumnDefault;
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

    @Column(name = "readcount", columnDefinition = "Integer default 0")
    private Integer readcount;

    @NotNull
    @Column(name = "state", columnDefinition = "char(1) NOT NULL default 'Y'")
    private String state = "Y";

    @Column(name = "price")
    private Integer price;
}
