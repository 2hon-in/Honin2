package com.team2.honin.honinserver.entity.view;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Immutable;
import org.hibernate.annotations.View;

import java.sql.Date;

@Getter
@Immutable
@View(query = "create view secondhandimagesselectview as" +
        " select s.snum, s.content, s.price, s.readcount, s.seller, s.state, s.title," +
        " s.writedate, i.sinum, i.savefilename from secondhand s join simages i on i.snum=s.snum;")
@Table(name = "secondhandimagesselectview")
@Entity
public class SecondhandImagesSelectView {

    @Id
    @Column(name = "snum")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer snum;

    @Column(name = "content", columnDefinition = "text")
    private String content;

    @Column(name = "price")
    private Integer price;

    @Column(name = "readcount", columnDefinition = "Integer default 0")
    private Integer readcount;

    @Column(name = "seller", length = 50)
    private String seller;

    @NotNull
    @Column(name = "state", columnDefinition = "char(1) NOT NULL default 'Y'")
    private String state = "Y";

    @Column(name = "title", length = 50, columnDefinition = "varchar(50)")
    private String title;

    @Column(name = "writedate", columnDefinition = "timestamp default now()")
    @CreationTimestamp
    private Date writedate;

    @Column(name = "sinum")
    private Integer sinum;

    @Column(length = 1000)
    private String savefilename;

}

