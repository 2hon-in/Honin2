package com.team2.honin.honinserver.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class SImages {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer sinum;

    @Column(length = 1000)
    private String savefilename;

    @ManyToOne
    @JoinColumn(name = "secondhand_isnum") // 외래 키 열 이름 설정
    private SecondHand secondHand;

    public void setSecondhand(SecondHand secondHand) {
        this.secondHand = secondHand;
    }
}
