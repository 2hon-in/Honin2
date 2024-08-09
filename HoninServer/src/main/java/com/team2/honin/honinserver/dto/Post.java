package com.team2.honin.honinserver.dto;

import jakarta.persistence.Column;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Date;

@Data
public class Post {
    private String seqname;

    private int seqnum;

    private String writer;

    private String title;

    private String content;

    private Date writedate;

    private Integer readcount;

    private String image;

    private String savefilename;
}
