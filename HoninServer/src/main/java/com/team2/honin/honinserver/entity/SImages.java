package com.team2.honin.honinserver.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class SImages {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer sinum;

    private Integer snum;

    @Column(length = 1000)
    private String savefilename;

    public void setSecondhand(SecondHand savedSecondHand) {
        setSecondhand(savedSecondHand);
    }
}
