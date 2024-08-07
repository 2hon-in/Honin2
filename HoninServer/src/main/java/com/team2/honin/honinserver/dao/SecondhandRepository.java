package com.team2.honin.honinserver.dao;

import com.team2.honin.honinserver.entity.SecondHand;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface SecondhandRepository extends JpaRepository<SecondHand, Long> {



}
