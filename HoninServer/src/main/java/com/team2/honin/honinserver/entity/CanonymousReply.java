package com.team2.honin.honinserver.entity;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Date;

public class CanonymousReply {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer carnum;

    @Column(name = "canum")
    private Integer canum;

    @Column(name = "writer", length = 50)
    private String writer;

    @Column(name = "content", length = 500)
    private String content;

    @CreationTimestamp
    @Column(name = "writedate", columnDefinition = "timestamp default now()")
    private Date writedate;
}
