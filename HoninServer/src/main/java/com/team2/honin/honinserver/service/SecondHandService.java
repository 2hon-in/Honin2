package com.team2.honin.honinserver.service;

import com.team2.honin.honinserver.dao.SecondhandRepository;
import com.team2.honin.honinserver.entity.SImages;
import com.team2.honin.honinserver.entity.SecondHand;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class SecondHandService {

    @Autowired
    SecondhandRepository shr;


    public List<SecondHand> getSecondhandList() {
        return shr.findAllByOrderBySnumDesc();
    }

    public void updateReadCount(int num) {
        shr.updateReadCount(num);
    }

    public SecondHand getSecondhand(int num) {
        SecondHand secondHand = shr.findBySnum(num);
        return secondHand;
    }


}
