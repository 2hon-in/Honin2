package com.team2.honin.honinserver.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Date;

@Data
@Entity
public class SReply {
    @Id
    @Column(name = "srnum")
    private Integer srNum;

    @Column(name = "snum")
    private Integer sNum;

    @Column(name = "content", length = 500)
    private String content;

    @Column(name = "writedate", columnDefinition = "timestamp default now()")
    @CreationTimestamp
    private Date writeDate;

    @Column(name = "nickname", length = 50)
    private String nickname;
}

