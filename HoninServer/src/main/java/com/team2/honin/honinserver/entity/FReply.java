package com.team2.honin.honinserver.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Date;

@Data
@Entity
@Table
public class FReply {

    @Id
    @Column(name = "frnum")
    private Integer frnum;

    @Id
    @Column(name = "fnum")
    private Integer fnum;

    @Id
    @Column(name = "writer", length = 50)
    private String writer;

    @Column(name = "content", length = 500)
    private String content;

    @CreationTimestamp
    @Column(name = "writedate", columnDefinition = "datetime default now()")
    private Date writedate;

    @Column(name = "nickname", length = 50)
    private String nickname;

    @ManyToOne
    @JoinColumn(name = "fnum", insertable = false, updatable = false)
    private FBoard fboard;

    @ManyToOne
    @JoinColumn(name = "writer", insertable = false, updatable = false)
    private FBoard fboardWriter;

}
