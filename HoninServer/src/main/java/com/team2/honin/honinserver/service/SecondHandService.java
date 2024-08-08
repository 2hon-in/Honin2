package com.team2.honin.honinserver.service;

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
    SImagesService sis;


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

    public SecondHand insertSecondHand(SecondHand secondHand, List<String> savefilename) {
        // 게시물 저장
        SecondHand savedSecondHand = shr.save(secondHand);

        // 이미지 정보 저장
        if (savefilename != null && !savefilename.isEmpty()) {
            savefilename.forEach(filename -> {
                SImages sImages = new SImages();
                sImages.setSecondhand(savedSecondHand); // 게시물과의 연관 관계 설정
                sImages.setSavefilename(filename);
                sis.insertSecondHandImages(sImages);
            });
        }

        return savedSecondHand;
    }


}
