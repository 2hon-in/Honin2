package com.team2.honin.honinserver.dao;

import com.team2.honin.honinserver.entity.SecondHand;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SecondhandRepository extends JpaRepository<SecondHand, Long> {
    List<SecondHand> findBySnumOrderBySnumDesc(Integer snum);
}
