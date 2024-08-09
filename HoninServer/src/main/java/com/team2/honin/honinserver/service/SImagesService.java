package com.team2.honin.honinserver.service;

import com.team2.honin.honinserver.dao.SImagesRepository;
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


    public void insertSecondHandImages(SImages sImages) {
        sir.save(sImages);
    }

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
}
