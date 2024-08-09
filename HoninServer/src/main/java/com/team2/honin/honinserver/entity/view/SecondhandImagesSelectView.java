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
@View(query = "CREATE VIEW secondhandimagesselectview AS " +
        "SELECT s.snum, s.content, s.price, s.readcount, s.seller, s.state, s.title, s.writedate, " +
        "    JSON_ARRAYAGG(i.savefilename) AS images " +
        "FROM secondhand s LEFT JOIN simages i ON i.snum = s.snum " +
        "GROUP BY s.snum, s.content, s.price, s.readcount, s.seller, s.state, s.title, s.writedate")
@Entity
@Table(name = "secondhandimagesselectview") // 뷰의 이름을 명시합니다.
public class SecondhandImagesSelectView {

    @Id
    @Column(name = "snum")
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

    @Column(name = "images", columnDefinition = "json")
    private String images; // JSON 배열을 문자열로 저장합니다.

}
