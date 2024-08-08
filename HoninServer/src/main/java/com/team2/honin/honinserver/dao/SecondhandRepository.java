package com.team2.honin.honinserver.dao;

import com.team2.honin.honinserver.entity.SecondHand;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface SecondhandRepository extends JpaRepository<SecondHand, Long> {

    Optional<SecondHand> findBySnum(int num);
}
