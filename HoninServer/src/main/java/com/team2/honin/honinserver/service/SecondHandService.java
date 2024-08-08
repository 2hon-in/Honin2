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

    public SecondHand insertSecondHand(SecondHand sh, List<String> savefilename) {
        // 게시물 저장
        SecondHand savedSecondHand = shr.save(sh);

        // 이미지 정보 저장
        for (String filename : savefilename) {
            SImages sImages = new SImages();
            sImages.setSnum(savedSecondHand.getSnum());  // 게시물 번호 설정
            sImages.setSavefilename(filename);
            sis.insertSecondHandImages(sImages);
        }
        return savedSecondHand;

    }

}
