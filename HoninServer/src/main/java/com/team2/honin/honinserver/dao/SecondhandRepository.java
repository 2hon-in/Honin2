package com.team2.honin.honinserver.dao;

import com.team2.honin.honinserver.entity.SecondHand;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface SecondhandRepository extends JpaRepository<SecondHand, Long> {

    List<SecondHand> findAllByOrderBySnumDesc();;

    @Modifying
    @Transactional
    @Query("UPDATE SecondHand s SET s.readcount = s.readcount + 1 WHERE s.snum = :num")
    void updateReadCount(int num);

    SecondHand findBySnum(int num);
}
