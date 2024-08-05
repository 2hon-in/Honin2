package com.team2.honin.honinserver.service;

import com.team2.honin.honinserver.dao.SecondhandRepository;
import com.team2.honin.honinserver.entity.SecondHand;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class CommunityService {

    @Autowired
    SecondhandRepository shr;


    public List<SecondHand> getSecondhandList(Integer snum) {
        return shr.findBySnumOrderBySnumDesc(snum);
    }
}
