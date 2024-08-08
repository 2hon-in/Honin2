package com.team2.honin.honinserver.service;

import com.team2.honin.honinserver.dao.SImagesRepository;
import com.team2.honin.honinserver.entity.SImages;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class SImagesService {

    @Autowired
    SImagesRepository sir;

    public void insertImages(SImages simages) {
        sir.save(simages);
    }

    public SImages updateSecondhand(SImages si, int num) {
        Optional<SImages> sImages = sir.findBySnum(num);

        if(sImages.isPresent()) {
            SImages newsi = sImages.get();
            newsi.setSavefilename(newsi.getSavefilename());

            sir.save(newsi);
        }
        return si;
    }


    public void insertSecondHandImages(SImages sImages) {
        sir.save(sImages);
    }
}
