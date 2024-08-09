package com.team2.honin.honinserver.dto;

import com.team2.honin.honinserver.entity.SecondHand;

import lombok.Data;

import java.sql.Date;
import java.util.List;

@Data
public class SecondhandRequestDTO {

    private String title;
    private String content;
    private Date writedate;
    private Integer readcount = 0;
    private String state = "Y";
    private int price;
    private String seller;
    private List<String> savefilename;

    public SecondHand toEntity() {
        SecondHand secondHand = new SecondHand();
        secondHand.setTitle(this.title);
        secondHand.setContent(this.content);
        secondHand.setWritedate(this.writedate);
        secondHand.setReadcount(this.readcount);
        secondHand.setState(this.state);
        secondHand.setPrice(this.price);
        secondHand.setSeller(this.seller);
        return secondHand;
    }
}

