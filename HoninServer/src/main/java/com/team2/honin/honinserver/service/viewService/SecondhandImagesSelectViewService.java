package com.team2.honin.honinserver.service.viewService;

import com.team2.honin.honinserver.dao.viewDao.SecondhandImagesSelectViewRepository;
import com.team2.honin.honinserver.entity.view.SecondhandImagesSelectView;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class SecondhandImagesSelectViewService {

    @Autowired
    SecondhandImagesSelectViewRepository shivr;

    public List<SecondhandImagesSelectView> getSecondhandList() {
        return shivr.findAllByOrderBySnumDesc();
    }

    public void updateReadCount(int num) {
        shivr.updateReadCount(num);
    }

    public SecondhandImagesSelectView getSecondhand(int num) {
        return shivr.findBySnum(num);
    }
}
