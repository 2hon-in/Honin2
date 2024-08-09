package com.team2.honin.honinserver.service;

import com.team2.honin.honinserver.dao.SImagesRepository;
import com.team2.honin.honinserver.dao.SecondhandRepository;
import com.team2.honin.honinserver.dao.viewDao.SecondhandImagesSelectViewRepository;
import com.team2.honin.honinserver.entity.SImages;
import com.team2.honin.honinserver.entity.SecondHand;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class SecondHandService {

    @Autowired
    SecondhandRepository shr;

    @Autowired
    SecondhandImagesSelectViewRepository shir;

    @Autowired
    SImagesRepository sir;


    public SecondHand updateSecondhand(SecondHand sh, int num) {
        Optional<SecondHand> secondHand = shr.findBySnum(num);

        if(secondHand.isPresent()) {
            SecondHand newsh = secondHand.get();
            newsh.setTitle(newsh.getTitle());
            newsh.setContent(newsh.getContent());
            newsh.setPrice(newsh.getPrice());
            newsh.setState(newsh.getState());
            shr.save(newsh);
        }
        return sh;
    }

    public Integer insertSecondHand(SecondHand secondHand) {
        // 게시물 저장
        SecondHand savedSecondHand = shr.save(secondHand);
        return savedSecondHand.getSnum(); // 저장된 게시물의 ID 반환
    }


}
