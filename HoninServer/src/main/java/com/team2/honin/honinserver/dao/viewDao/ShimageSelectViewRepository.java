package com.team2.honin.honinserver.dao.viewDao;

import com.team2.honin.honinserver.entity.view.ShimageSelectView;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShimageSelectViewRepository extends JpaRepository<ShimageSelectView, Integer> {
    List<ShimageSelectView> findAllByOrderBySnumDesc();

    @Modifying
    @Transactional
    @Query("UPDATE ShimageSelectView s SET s.readcount = s.readcount + 1 WHERE s.snum = :num")
    void updateReadCount(int num);

    ShimageSelectView findBySnum(int num);
}
