package com.team2.honin.honinserver.service;

import com.team2.honin.honinserver.dao.SImagesRepository;
import com.team2.honin.honinserver.dao.SecondhandRepository;
import com.team2.honin.honinserver.entity.SImages;
import com.team2.honin.honinserver.entity.SecondHand;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class SImagesService {

    @Autowired
    SImagesRepository sir;

    @Autowired
    SecondhandRepository shr;

    public Optional<SImages> findById(int num) {
        return sir.findById(num);
    }

    public void deleteImage(int num) {
        sir.deleteById(num);
    }

    public SImages updateSecondhand(SImages sImages) {
        return sir.save(sImages);
    }

    public List<SImages> findBySecondhand(SecondHand secondHand) {
        return sir.findBySecondHand(secondHand);
    }

    public void insertSecondHandImages(Integer snum, List<String> savefilename) {
        // secondHand 객체를 가져오기
        SecondHand secondHand = shr.findBySnum(snum).orElseThrow(() -> new RuntimeException("SecondHand not found"));

        for (String filename : savefilename) {
            SImages image = new SImages();
            image.setSavefilename(filename);
            image.setSecondhand(secondHand); // 올바른 SecondHand 객체 설정

            // 이미지 저장
            sir.save(image);
        }
    }

}

