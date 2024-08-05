package com.team2.honin.honinserver.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Date;

@Data
@Entity
public class CrecommendedReply {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer crrnum;

    @Column(name = "crnum")
    private Integer crnum;

    @Column(name = "writer", length = 50)
    private String writer;

    @Column(name = "content", length = 500)
    private String content;

    @CreationTimestamp
    @Column(name = "writedate", columnDefinition = "timestamp default now()")
    private Date writedate;
}
