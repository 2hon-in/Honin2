package com.team2.honin.honinserver.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Date;

@Data
@Entity
@Table(name = "cfreereply")
public class CfreeReply {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cfrnum")
    private Integer cfrnum;

    @Column(name = "cfnum")
    private Integer cfnum;

    @Column(name = "writer", length = 50)
    private String writer;

    @Column(name = "content", length = 500)
    private String content;

    @CreationTimestamp
    @Column(name = "writedate", columnDefinition = "timestamp default now()")
    private Date writedate;

//    @ManyToOne
//    @JoinColumn(name = "fnum", insertable = false, updatable = false)
//    private FBoard fboard;
//
//    @ManyToOne
//    @JoinColumn(name = "writer", insertable = false, updatable = false)
//    private FBoard fboardWriter;

}
