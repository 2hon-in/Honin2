package com.team2.honin.honinserver.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Date;


@Data
@Entity
@Table(name = "secondhand")
public class SecondHand {

    @Id
    @Column(name = "snum")
    private Integer sNum;

    @Column(name = "seller", length = 50)
    private String seller;

    @Column(name = "title", length = 50, columnDefinition = "varchar(50)")
    private String title;

    @Column(name = "content", columnDefinition = "text")
    private String content;

    @Column(name = "writedate", columnDefinition = "timestamp default now()")
    @CreationTimestamp
    private Date writeDate;

    @Column(name = "readcount")
    private Integer readCount;

    @Column(name = "state", columnDefinition = "char(1) default 'Y'")
    private String state;

    @Column(name = "price")
    private Integer price;

    @Column(name = "savefilename", length = 1000)
    private String saveFileName;

    @Column(name = "image", length = 1000)
    private String image;
}
