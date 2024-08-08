package com.team2.honin.honinserver.dao;

import com.team2.honin.honinserver.entity.SImages;
import com.team2.honin.honinserver.entity.SecondHand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SImagesRepository extends JpaRepository<SImages, Integer> {

    Optional<SImages> findBySnum(int num);
}


