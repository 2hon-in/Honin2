package com.team2.honin.honinserver.dao.viewDao;

import com.team2.honin.honinserver.entity.view.SecondhandImagesSelectView;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SecondhandImagesSelectViewRepository extends JpaRepository<SecondhandImagesSelectView, Integer> {
    List<SecondhandImagesSelectView> findAllByOrderBySnumDesc();

    @Modifying
    @Transactional
    @Query("UPDATE SecondhandImagesSelectView s SET s.readcount = s.readcount + 1 WHERE s.snum = :num")
    void updateReadCount(int num);

    SecondhandImagesSelectView findBySnum(int num);



}
