package com.team2.honin.honinserver.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Date;

@Data
@Entity
public class Notice {

    @Id
    @Column(name = "nnum")
    private Integer nNum;

    @Column(name = "writer", length = 50)
    private String writer;

    @Column(name = "title", length = 50)
    private String title;

    @Column(name = "content", columnDefinition = "text")
    private String content;

    @Column(name = "writedate")
    @CreationTimestamp
    private Date writeDate;

    @Column(name = "readcount")
    private Integer readCount;

    @Column(name = "image", length = 1000)
    private String image;

    @Column(name = "savefilename", length = 1000)
    private String saveFileName;
}

