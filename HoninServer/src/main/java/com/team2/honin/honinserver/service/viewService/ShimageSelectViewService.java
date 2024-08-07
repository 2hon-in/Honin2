package com.team2.honin.honinserver.service.viewService;

import com.team2.honin.honinserver.dao.viewDao.ShimageSelectViewRepository;
import com.team2.honin.honinserver.entity.view.ShimageSelectView;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ShimageSelectViewService {

    @Autowired
    ShimageSelectViewRepository shivr;

    public List<ShimageSelectView> getSecondhandList() {
        return shivr.findAllByOrderBySnumDesc();
    }

    public void updateReadCount(int num) {
        shivr.updateReadCount(num);
    }

    public ShimageSelectView getSecondhand(int num) {
        return shivr.findBySnum(num);
    }
}
