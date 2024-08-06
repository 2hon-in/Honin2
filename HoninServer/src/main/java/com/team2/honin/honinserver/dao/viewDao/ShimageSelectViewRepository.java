package com.team2.honin.honinserver.dao.viewDao;

import com.team2.honin.honinserver.entity.view.ShimageSelectView;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ShimageSelectViewRepository extends JpaRepository<ShimageSelectView, Integer> {
    List<ShimageSelectView> findAllByOrderBySnumDesc();
}
