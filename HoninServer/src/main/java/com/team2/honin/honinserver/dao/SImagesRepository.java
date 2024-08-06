package com.team2.honin.honinserver.dao;

import com.team2.honin.honinserver.entity.SImages;
import com.team2.honin.honinserver.entity.SecondHand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SImagesRepository extends JpaRepository<SImages, Integer> {

    @Query("SELECT i.savefilename FROM SImages i JOIN SecondHand s ON i.snum = s.snum")
    List<SImages> selectImage();
}


